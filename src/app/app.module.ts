import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { 
	IgxCalendarModule,
	IgxDialogModule
 } from "igniteui-angular";
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { HammerModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
		IgxCalendarModule,
        IgxDialogModule,
        HammerModule,
        HttpClientModule
         
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
    ]
})
export class AppModule { }
