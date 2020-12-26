import {createFeatureSelector, createSelector} from '@ngrx/store';
import {jobFeatureKey, JobState, selectAll, selectIds} from '../reducer/job.reducer';
import {UserState} from "../../../user/store/reducer/user.reducer";

export const jobFeatureSelector = createFeatureSelector<JobState>(jobFeatureKey);

export const getAllJobs = createSelector(
  jobFeatureSelector,
  selectAll
);

export const selectAllJobs = createSelector(
  jobFeatureSelector,
  selectAll
);

// export const selectAllJobs = createSelector(
//   jobFeatureSelector,
//   jobsState => {
//     console.log('entity', jobsState.entities);
//     return Object.values(jobsState.entities);
//   }
// );

export const areJobsLoaded = createSelector(
  jobFeatureSelector,
  state => state.jobsLoaded
);

export const getJobsByColumn = ({columnTitle}) => createSelector(
  selectAllJobs,
  (jobs, props) => {
    console.log('jobs selecters', jobs);
    console.log('column', columnTitle);
    console.log('props', props);
    // const res = jobs.length > 0 ? jobs.map((job) => job.column === columnTitle) : [];
    // console.log('res sel:',res);
    return jobs;
  }
);

// export const getJobsEntities = (state: JobState, column) => {
//   return state.entities.map((item) => item.column === column)
// }
