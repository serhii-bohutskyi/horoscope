import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' }  // Redirect any unknown paths to the main route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
