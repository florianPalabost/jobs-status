import { Action, createReducer, on } from '@ngrx/store';
import {Job} from "../../models/job";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {jobActionTypes} from "../action/job.actions";

export const jobFeatureKey = 'jobs';

export interface JobState extends EntityState<Job> {
  jobsLoaded: boolean;
}

export const adapter: EntityAdapter<Job> = createEntityAdapter<Job>({
  selectId: (job: Job) => job.id
});

export const initialState = adapter.getInitialState({
  jobsLoaded: false
});


export const jobReducer = createReducer(
  initialState,
  on(jobActionTypes.jobsLoaded, (state, action) => {
    return adapter.addMany(
      action.jobs,
      {...state, jobsLoaded: true}
    );
  }),
  on(jobActionTypes.addJob, (state, action) => {
    return adapter.addOne(action.job, state);
  }),
  on(jobActionTypes.deleteJob, (state, action) => {
    return adapter.removeOne(action.jobId, state);
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();



