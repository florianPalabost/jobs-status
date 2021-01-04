import { createAction, props } from '@ngrx/store';
import {Job} from "../../models/job";
import {Update} from "@ngrx/entity";

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



export const deleteJob = createAction(
  '[Job] Delete Job',
  props<{jobId: string}>()
);



export const updateJob = createAction(
  '[Job] Update Job',
  props<{job: Update<Job>}>()
);

export const updateJobSuccess = createAction(
  '[Jobs Effect] Updated Job Successfully',
);

export const updateJobFailed = createAction(
  '[Jobs Effect] Job updated Failed',
  props<{error: any}>()
);


export const jobActionTypes = {
  loadJobs,
  loadJobsColumn,
  jobsLoaded,
  jobsFailedLoad,
  addJob,
  deleteJob,
  updateJob,
  updateJobSuccess,
  updateJobFailed
};





