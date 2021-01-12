import {createFeatureSelector, createSelector} from '@ngrx/store';
import {jobFeatureKey, JobState, selectAll, selectIds} from '../reducer/job.reducer';

export const jobFeatureSelector = createFeatureSelector<JobState>(jobFeatureKey);

export const getAllJobs = createSelector(
  jobFeatureSelector,
  selectAll
);

export const selectAllJobs = createSelector(
  jobFeatureSelector,
  selectAll
);

export const areJobsLoaded = createSelector(
  jobFeatureSelector,
  state => state.jobsLoaded
);

export const getJobsByColumn = ({columnTitle}) => createSelector(
  selectAllJobs,
  (jobs, props) => {
    // const res = jobs.length > 0 ? jobs.map((job) => job.column === columnTitle) : [];
    return jobs;
  }
);
