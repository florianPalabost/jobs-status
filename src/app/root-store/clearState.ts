import {Action, INIT, Store} from "@ngrx/store";
import {clearStorage, emptyLocalStorage} from "./storage";

export class ActionTypes {
  static logoutUser = "[App] logout";
}

export class Logout implements Action {
  readonly type = ActionTypes.logoutUser;
}

export function clearState(reducer) {
  return function (state, action) {

    if (action.type === ActionTypes.logoutUser) {
      // to reset state
      // state = undefined;

      clearStorage();

      // emptyLocalStorage(['jobs', 'user']);
    }

    return reducer(state, action);
  };
}
