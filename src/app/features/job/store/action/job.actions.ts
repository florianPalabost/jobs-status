import { createAction, props } from '@ngrx/store';
import {Job} from "../../models/job";

export const loadJobs = createAction(
  '[Job] Load Jobs',
);

export const loadJobsColumn = createAction(
  '[Job] Load Jobs Column',
  props<{columnTitle: string}>()
);

export const jobsLoaded = createAction(
  '[Jobs Effect] Jobs Loaded Successfully',
  props<{jobs: Job[]}>()
);

export const jobsFailedLoad = createAction(
  '[Jobs Effect] Jobs Failed Loaded',
  props<{error: any}>()
);


export const addJob = createAction(
'[Job] Add Job',
  props<{job: Job}>()
);

export const jobActionTypes = {
  loadJobs,
  loadJobsColumn,
  jobsLoaded,
  jobsFailedLoad,
  addJob
};





