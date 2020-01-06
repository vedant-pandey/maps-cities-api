import { 
          Component, 
          OnInit 
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

export class AppComponent implements OnInit{

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
  }
}
