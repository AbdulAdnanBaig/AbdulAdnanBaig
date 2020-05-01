import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // in anycase redirect to home
  { path: '**', redirectTo: 'home' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
