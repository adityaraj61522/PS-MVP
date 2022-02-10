import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateObjectiveComponent } from './create-objective/create-objective.component';
import { YourObjectiveComponent } from './your-objective/your-objective.component';

const routes: Routes = [
  { path: '', component: YourObjectiveComponent},
  { path: 'createObjective', component: CreateObjectiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
