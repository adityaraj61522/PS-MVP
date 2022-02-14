import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { YourObjectiveComponent } from './your-objective/your-objective.component';

const routes: Routes = [
  { path: '', component: LoginComponent},  
  { path: 'objectives', component: YourObjectiveComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
