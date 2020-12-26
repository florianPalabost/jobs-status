import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {userActionTypes} from "../action/user.actions";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {catchError, concatMap, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import * as storage from "../../../../root-store/storage";
import {of} from "rxjs";

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.loadUser),
      concatMap((action) => this.userService.signIn(action.user.email, action.user.password)),
      map((action) => {
          return userActionTypes.loadUserSuccess({user: new User(action.user)});
        }
      ),
    ),
  );

  loadUserSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userActionTypes.loadUserSuccess),
        tap( () =>  this.router.navigate(['/jobs']))
      ),
    { dispatch: false }
  );

  createUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActionTypes.addUser),
    concatMap((action) => this.userService.createUser(action.user)),
    tap(() => this.router.navigateByUrl('/jobs'))
  ),
    {dispatch: false}
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.logoutUser),
      concatMap(() => this.userService.logout()),
        catchError(err => of(err)),
      tap(() => {
          storage.clearStorage();
          return this.router.navigate(['/']);
        }
      ),
      catchError(e => of(e)),
    ),

  { dispatch: false, useEffectsErrorHandler: true }
  );


  constructor(private actions$: Actions, private userService: UserService, private router: Router) {}

}
