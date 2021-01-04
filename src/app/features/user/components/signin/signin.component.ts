import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { Store } from '@ngrx/store';
import {UserState} from "../../store/reducer/user.reducer";
import {loadUser} from "../../store/action/user.actions";
import {User} from "../../models/user";
import * as fromRoot from '../../store/reducer/user.reducer';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errMsg: string;
  user: User = new User({email: '', password: ''});
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private router:  Router, private store: Store<UserState>, private modalService: NgbModal) {
    this.store.select(fromRoot.getLoginUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data.isLogged) {
        this.router.navigate(['/jobs']);
      }
    });

  }

  ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit = async () => {
    const {email, password} = this.loginForm.value;
    const user: User = {email, password};
    this.store.dispatch(loadUser({user}));
    this.modalService.dismissAll();
    this.toastr.success('You have been successfully been connected !', 'Hello world!');
  }

}
