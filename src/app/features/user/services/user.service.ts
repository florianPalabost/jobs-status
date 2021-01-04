import { Injectable } from '@angular/core';
import {AuthFirebaseService} from "../../../services/auth-firebase.service";
import {Observable, of} from "rxjs";
import {User} from "../models/user";
import * as fromRoot from "../store/reducer/user.reducer";
import {takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {UserState} from "../store/reducer/user.reducer";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authFBService: AuthFirebaseService, private store: Store<UserState>) { }

  /**
   * @param email
   * @param password
   */
  signIn = (email:string, password:string) => {
    return this.authFBService.signInUser(email, password);
  }

  createUser = async (user) => {
    await this.authFBService.createNewUser(user.email, user.password)
  }

  logout = async () => {
    //dispatch logout(
    try {
      return await this.authFBService.signOutUser();
    } catch (e) {
      console.log(e);
    }
  }

  getUser = () => {
    return this.store.pipe(select(fromRoot.getLoginUser))
  }
}
