import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from "./features/user/components/signin/signin.component";
import {SignupComponent} from "./features/user/components/signup/signup.component";
import {ListColonnesComponent} from "./features/job/components/list-colonnes/list-colonnes.component";
import {JobResolver} from "./features/job/job.resolver";
import {CreateJobComponent} from "./features/job/components/list-colonnes/colonne/create-job/create-job.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {HomeComponent} from "./layout/home/home.component";
import {AuthGuard} from "./features/user/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'jobs',
    component: ListColonnesComponent,
    canActivate: [AuthGuard],
    // resolve: {
    //   jobs: JobResolver
    // }
  },
  {
    path : 'jobs/create',
    component: CreateJobComponent
  },
  {
    path : 'login',
    component: SigninComponent
  },
  {
    path : 'register',
    component: SignupComponent
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
