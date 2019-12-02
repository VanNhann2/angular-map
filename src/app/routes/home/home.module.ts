import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        
        CommonModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyAlCWStHl94BNxvuF-6hKNeYtzL3l_XShw",
            libraries: ["places", "geometry"]
        })
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }