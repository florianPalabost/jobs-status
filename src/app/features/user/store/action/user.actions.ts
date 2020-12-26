import { createAction, props } from '@ngrx/store';
import {User} from "../../models/user";

export const loadUser = createAction(
  '[User] Load User',
  props<{user: any}>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: any }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[User] Add User',
  props<{user: User}>()
);

export const logoutUser = createAction(
  '[User] Logout User'
);


// todo adduser success failure

export const userActionTypes = {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  addUser,
  logoutUser,
};
