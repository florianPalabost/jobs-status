import { createFeatureSelector, createSelector } from '@ngrx/store';
import {getLoginUser, selectAll, UserState} from '../reducer/user.reducer';

export const userFeatureSelector = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  userFeatureSelector,
  selectAll
);

export const getLoggedInUser = createSelector(
  userFeatureSelector,
  getLoginUser
);

export const isUserLoaded = createSelector(
  userFeatureSelector,
  state => state.isLogged
);
