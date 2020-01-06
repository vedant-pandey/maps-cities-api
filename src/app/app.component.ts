import { Component } from '@angular/core';

enum DEFAULT {
  STATE = 'Select a state',
  CITY  = 'Select a city'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  selectedState: string  = DEFAULT.STATE
  selectedCity:  string  = DEFAULT.CITY
  stateSelected: boolean = false

  states: string[] = [
    'Arunachal Pradesh',
    'Karnataka',
    'Maharashtra',
    'Madhya Pradesh',
    'Uttar Pradesh',
  ]
  cities: string[] = [
    'Delhi',
    'Lucknow',
    'Mumbai',
    'Bangalore',
  ]

  changeSelectedState(state: string) {
    this.stateSelected = true
    this.selectedState = state
  }

  changeSelectedCity(city: string) {
    this.selectedCity = city
  }
}
