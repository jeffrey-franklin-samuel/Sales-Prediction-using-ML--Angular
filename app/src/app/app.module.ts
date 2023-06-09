import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { GraphComponent } from './graph/graph.component';
import { ChartModule } from 'angular-highcharts';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { Home2Component } from './home2/home2.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphComponent,
    SignupComponent,
    LoginComponent,
    Home2Component,
    PowerbiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PowerBIEmbedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
