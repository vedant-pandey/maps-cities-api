import { NgbModule }      from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { AppComponent }   from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
