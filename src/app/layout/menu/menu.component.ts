import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../features/user/services/user.service";
import {ToastrService} from "ngx-toastr";
import {Store} from "@ngrx/store";
import {UserState} from "../../features/user/store/reducer/user.reducer";
import * as fromRoot from "../../features/user/store/reducer/user.reducer";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Logout} from "../../root-store/clearState";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SignupComponent} from "../../features/user/components/signup/signup.component";
import {SigninComponent} from "../../features/user/components/signin/signin.component";
import {logoutUser} from "../../features/user/store/action/user.actions";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLogged :boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
    isNavCollapsed = true;

  constructor(private userService: UserService, private toast: ToastrService,
              private store: Store<UserState>,private modalService: NgbModal) {
    this.store.select(fromRoot.getLoginUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.isLogged = data?.user.hasOwnProperty('isLogged') ? data?.user['isLogged'] : false;
    });
  }

  ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

  ngOnInit(): void {
  }

  logout() {
    // clear state user ->  remove it because the second dispatch clear app state
    this.store.dispatch(logoutUser());
    // clear state for otther feature
    this.store.dispatch(new Logout());
    this.toast.success('Successfully Logout !');
  }

  open(modalToOpen: string) {
    switch (modalToOpen) {
      case 'register':
        this.modalService.open(SignupComponent);
        break;
      default:
        this.modalService.open(SigninComponent);
        break;
    }
  }
}
