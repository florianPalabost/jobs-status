import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {jobActionTypes} from "../action/job.actions";
import {Router} from "@angular/router";
import {catchError, concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {JobService} from "../../services/job.service";
import {Job} from "../../models/job";
import {Observable, pipe} from "rxjs";

@Injectable()
export class JobEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.loadJobs),
      concatMap( () => {
       return this.jobsService.retrieveAllJobs();
      }),
      map((doc: any) => {
          // const data = doc.payload.doc.data();
          // datas.push({
          //   id: doc.payload.doc.id,
          //   ...data
          // });
        return jobActionTypes.jobsLoaded({jobs: doc});
      })
    )
  );

  loadJobsColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.loadJobsColumn),
      mergeMap((action) => this.jobsService.retrieveJobsOfColumn(action.columnTitle)),
      pipe(
        map((jobs) => jobActionTypes.jobsLoaded({jobs})),
      ),
        // map((jobs, index) => {
        //   console.log('index', index);
        //   console.log('jobs effects', jobs);
        //   if (Object.keys(jobs).length <= 0){
        //     return jobActionTypes.jobsFailedLoad({error: jobs});
        //   }
        //   return jobActionTypes.jobsLoaded({jobs: jobs });
        // }),
    ),
    // {useEffectsErrorHandler: true }

  );

  createJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.addJob),
      concatMap((action) => this.jobsService.createJob(action.job)),
      tap(() => this.router.navigateByUrl('/jobs'))
    ),
  {dispatch: false}
  );


  constructor(private jobsService: JobService, private actions$: Actions, private router: Router) {}

}
