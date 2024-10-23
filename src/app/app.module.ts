import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MemberRegistrationComponent} from './member-registration.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    MemberRegistrationComponent,
    MemberRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, AppRoutingModule

  ],
  providers: [],
  bootstrap: [MemberRegistrationComponent]
})
export class AppModule {
}
