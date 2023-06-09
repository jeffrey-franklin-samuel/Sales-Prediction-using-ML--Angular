import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import { Home2Component } from './home2/home2.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { PowerbiComponent } from './powerbi/powerbi.component';


const routes: Routes = [
  { path: '',redirectTo:'home2',pathMatch:'full' },
  { path: 'home2', component: Home2Component },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'graph', component: GraphComponent,canActivate:[AuthGuard]  },
  { path: 'powerbi', component: PowerbiComponent ,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
