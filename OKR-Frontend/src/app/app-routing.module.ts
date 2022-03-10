import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './admin/settings/settings.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './login/login.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { ObjectiveDetailsComponent } from './objective-details/objective-details.component';
import { RegisterComponent } from './register/register.component';
import { YourObjectiveComponent } from './your-objective/your-objective.component';
import { UpdateUserComponent } from './admin/users/update-user/update-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},  
  { path: 'objectives', component: YourObjectiveComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'objective-deatils', component: ObjectiveDetailsComponent},
  { path: 'my-team', component: MyTeamComponent},
  { path: 'admin/settings', component: SettingsComponent},
  { path: 'admin/users', component: UsersComponent},
  { path:  'admin/users/update-user', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
