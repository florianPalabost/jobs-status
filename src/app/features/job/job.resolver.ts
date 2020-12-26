import { AppState } from './store';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {areJobsLoaded} from "./store/selector/job.selectors";
import {loadJobs} from "./store/action/job.actions";
import {isUserLoaded} from "../user/store/selector/user.selectors";

@Injectable()
export class JobResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areJobsLoaded),
        tap(async (jobsLoaded) => {
          if (!jobsLoaded) {
            console.log('resolver: jobs not load!');
            if (isUserLoaded) {
              //this.store.dispatch(loadJobs());
            }
            else {
              await this.router.navigate(['login']);
            }


          }

        }),
        filter(jobsLoaded => jobsLoaded),
        first()
      );
  }
}
