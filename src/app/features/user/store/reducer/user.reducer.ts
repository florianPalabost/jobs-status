import {Action, createReducer, on, State} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "../../models/user";
import {userActionTypes} from "../action/user.actions";
import * as storage from '../../../../root-store/storage';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<User>{
  user: User;
  isLogged: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id
});

export const initialState = adapter.getInitialState({
  user: storage.getItem('user').user || null,
  isLogged: storage.getItem('user').isLogged || false,
});

export const userReducer = createReducer(
  initialState,
  on(userActionTypes.loadUserSuccess, (state, action) => {
    return adapter.setOne(action.user, {...state, user:action.user, isLogged: true})
  }),
  on(userActionTypes.logoutUser, state => {
        return adapter.removeAll({...state, isLogged: false, user: null});
  }),
);

export const getLoginUser = (state: UserState) => {
  return {
    user: state.user,
    isLogged: state.isLogged
  }
}

export const { selectAll, selectIds } = adapter.getSelectors();
