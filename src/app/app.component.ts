import { 
          Component, 
          OnInit, 
          ViewChild,
          ElementRef
       }              from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DistrictInfo {
  City     : string
  State    : string
  District : string
}

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})

export class AppComponent implements OnInit {

  @ViewChild('mapContainer', {static : false}) gMap : ElementRef

  map        : google.maps.Map
  mapOptions : google.maps.MapOptions = {
    zoom : 10
  }

  selectedState : string  = 'Select a state'
  selectedCity  : string  = 'Select a city'
  dataLoaded    : boolean = false

  districtInfos : DistrictInfo[]
  states        : string[]
  cities        : string[]

  constructor(private http : HttpClient) {}

  async ngOnInit() {
    
    const resp = this.http.get('https://indian-cities-api-nocbegfhqg.now.sh/cities')

    resp.subscribe((districtInfos: DistrictInfo[]) => {
      this.dataLoaded    = true
      this.districtInfos = districtInfos
      this.states        = [
        ...new Set(
          this.districtInfos
            .map(districtInfo => districtInfo.State)
            .sort()
        )
      ]
    })
  }

  ngAfterViewInit() {
    this.mapInitializer(new google.maps.LatLng(10,20))
  }

  mapInitializer(coordiantes : google.maps.LatLng) {
    this.mapOptions.center = coordiantes
    this.map = new google.maps.Map(this.gMap.nativeElement, this.mapOptions)
  }

  changeSelectedState(state : string) {
    this.selectedState = state
    if (this.dataLoaded) {
      this.cities = [
        ...new Set(
          this.districtInfos
            .filter(districtInfo => districtInfo.State === state)
            .map(districtInfo => districtInfo.City)
        )
      ]
    }
  }

  changeSelectedCity(city : string) {
    this.selectedCity = city
    const mapResp = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.selectedCity.split(' ').join('+')},+${this.selectedState.split(' ').join('+')},+india&key=AIzaSyBPY0n8Ucv74WlwSRq2kDC4jvU8qOnExzk`)

    mapResp.subscribe((value : any) => {
      this.mapInitializer(value.results[0].geometry.location)
    })
  }
}
