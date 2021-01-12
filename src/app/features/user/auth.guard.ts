import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserState} from "./store/reducer/user.reducer";
import {Store} from "@ngrx/store";
import {isUserLoaded} from "./store/selector/user.selectors";
import {map, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<UserState>, private router: Router, private toast: ToastrService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isUserLoaded).pipe(
    map((userIsLogged) => {
      if (!userIsLogged) {
        this.router.navigate(['/login']).then(() => this.toast.info('You should be connected to be here !') );
      }
      return userIsLogged;
    })
    );
  }

}
