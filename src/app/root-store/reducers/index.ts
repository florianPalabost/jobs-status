import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUser from "../../features/user/store/reducer/user.reducer";
import * as fromJob from "../../features/job/store/reducer/job.reducer";
import {localStorageSync} from "ngrx-store-localstorage";
import {userFeatureKey} from "../../features/user/store/reducer/user.reducer";
import {jobFeatureKey} from "../../features/job/store/reducer/job.reducer";
import {clearState} from "../clearState";

export interface State {
  user: fromUser.UserState;
  jobs: fromJob.JobState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.userReducer,
  jobs: fromJob.jobReducer,
};

const reducerKeys = [userFeatureKey, jobFeatureKey];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return  localStorageSync({keys: reducerKeys})(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer, clearState];
