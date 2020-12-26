import { Injectable } from '@angular/core';
import {AuthFirebaseService} from "../../../services/auth-firebase.service";
import {Observable, of} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authFBService: AuthFirebaseService) { }

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
}
