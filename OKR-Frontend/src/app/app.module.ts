import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { YourObjectiveComponent } from './your-objective/your-objective.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ObjectiveDetailsComponent } from './objective-details/objective-details.component';
import { MilestoneModule } from './milestone/milestone.module';
import { MilestoneComponent } from './milestone/milestone.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    YourObjectiveComponent,
    LoginComponent,
    RegisterComponent,
    ObjectiveDetailsComponent,
    MilestoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MilestoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
