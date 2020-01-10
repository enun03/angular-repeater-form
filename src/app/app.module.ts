import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../assets/material-ui/material-module';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeoplepickerComponent } from './components/peoplepicker/peoplepicker.component';
import { PeoplePickerService } from './services/people-picker.service';

@NgModule({
  declarations: [
    AppComponent,
    PeoplepickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AutoCompleteModule
  ],
  providers: [PeoplePickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
