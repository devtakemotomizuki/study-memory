import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordAndDisplayComponent } from './record-and-display/record-and-display.component';

const routes: Routes = [
  { path: 'home', component: RecordAndDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
