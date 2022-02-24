import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { YourObjectiveComponent } from './your-objective/your-objective.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ObjectiveDetailsComponent } from './objective-details/objective-details.component';
import { GoalListComponent } from './your-objective/goal-list/goal-list.component';
// import { MilestoneModule } from './milestone/milestone.module';
import { MilestoneComponent } from './milestone/milestone.component';
import { CreateGoalComponent } from './your-objective/create-goal/create-goal.component';
import { CreateMilestoneComponent } from './your-objective/create-milestone/create-milestone.component';

import { EditGoalComponent } from './your-objective/edit-goal/edit-goal.component';
import { MilestoneListComponent } from './objective-details/milestone-list/milestone-list.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { TeamListComponent } from './my-team/team-list/team-list.component';
// import { ApiComponent } from './apiCollection/api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    YourObjectiveComponent,
    LoginComponent,
    RegisterComponent,
    ObjectiveDetailsComponent,
    GoalListComponent,
    MilestoneComponent,
    CreateGoalComponent,
    CreateMilestoneComponent,
    EditGoalComponent,
    MilestoneListComponent,
    MyTeamComponent,
    TeamListComponent,
    // ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgbModule,
    HttpClientModule,
    // MilestoneModule
    AutocompleteLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
