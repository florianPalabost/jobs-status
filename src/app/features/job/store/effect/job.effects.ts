import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {jobActionTypes} from "../action/job.actions";
import {Router} from "@angular/router";
import { concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Job} from "../../models/job";
import {pipe} from "rxjs";
import {FirebaseCrudService} from "../../../../services/firebase-crud.service";
import {WhereClause} from "../../../../models/where-clause.model";

const collection = 'jobs';

@Injectable()
export class JobEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.loadJobs),
      concatMap( () => {
       return this.fbService.retrieveItems(collection);
      }),
      map((doc: any) => {
        return jobActionTypes.jobsLoaded({jobs: doc});
      })
    )
  );

  loadJobsColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.loadJobsColumn),
      mergeMap((action) => this.fbService.retrieveItems(collection, [
        new WhereClause('column', '==', action.columnId),
        new WhereClause('user_id', '==', action.userId),
      ])),
      pipe(
        map((jobs) => jobActionTypes.jobsLoaded({jobs})),
      ),
    ),
    // {useEffectsErrorHandler: true }

  );

  createJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.addJob),
      concatMap((action) => this.fbService.create(collection, action.job)),
      // tap(() => this.router.navigateByUrl('/jobs'))
    ),
  {dispatch: false}
  );

  deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.deleteJob),
      concatMap((action) => this.fbService.delete(collection, action.jobId)),
      tap(() => this.router.navigateByUrl('/jobs'))
    ),
    {dispatch:false}
  )

  updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobActionTypes.updateJob),
      switchMap((action) => {
        return this.fbService.update(collection, action.job);
      }),
      map((x) => jobActionTypes.updateJobSuccess())
    )
  );

  constructor(private fbService: FirebaseCrudService<Job>, private actions$: Actions, private router: Router) {}

}
