import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    // ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    // NgbModule
    HttpClientModule,
    // MilestoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
