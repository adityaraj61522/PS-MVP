import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { YourObjectiveComponent } from './your-objective/your-objective.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ObjectiveDetailsComponent } from './objective-details/objective-details.component';
import { GoalListComponent } from './your-objective/goal-list/goal-list.component';
// import { MilestoneModule } from './milestone/milestone.module';
import { CreateGoalComponent } from './your-objective/create-goal/create-goal.component';
import { CreateMilestoneComponent } from './your-objective/create-milestone/create-milestone.component';

import { EditGoalComponent } from './your-objective/edit-goal/edit-goal.component';
import { MilestoneListComponent } from './objective-details/milestone-list/milestone-list.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { TeamListComponent } from './my-team/team-list/team-list.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { UsersComponent } from './admin/users/users.component';
import { UserCardComponent } from './admin/users/user-card/user-card.component';
import { CheckinPopupComponent } from './objective-details/milestone-list/checkin-popup/checkin-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MilestoneReuseComponent } from './milestone/milestone-reuse/milestone-reuse.component';
// import { ApiComponent } from './apiCollection/api/api.component';

// loader
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateMilestoneComponent } from './milestone/update-milestone/update-milestone.component';
import { NgbdToastGlobal } from './milestone/toast/toast-global.component';
import { ToastsContainer } from './milestone/toast/toasts-container.component';
// import { NgbdToastGlobalModule } from './milestone/toast/toast-global.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    YourObjectiveComponent,
    LoginComponent,
    RegisterComponent,
    ObjectiveDetailsComponent,
    GoalListComponent,
    CreateGoalComponent,
    CreateMilestoneComponent,
    EditGoalComponent,
    MilestoneListComponent,
    MyTeamComponent,
    TeamListComponent,
    SettingsComponent,
    UsersComponent,
    UserCardComponent,
    CheckinPopupComponent,
    MilestoneReuseComponent,
    UpdateMilestoneComponent,
    NgbdToastGlobal,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
    timeOut: 5000,
    preventDuplicates: true,
    }),
    AutocompleteLibModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      "titleFontSize": "18",
      "showSubtitle": false,
      "showBackground": false,
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    // NgbdToastGlobalModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
