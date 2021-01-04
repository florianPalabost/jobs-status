import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthFirebaseService} from "../../../../services/auth-firebase.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errMsg: string;

  constructor(private toastr: ToastrService ,private formBuilder: FormBuilder,
              private authFbService: AuthFirebaseService, private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm = () => {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit = async () => {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    await this.authFbService.createNewUser(email, password);
    await this.router.navigate(['/']);
    this.modalService.dismissAll();
    this.toastr.success('You have been successfully been registered !', 'Hello world!');
  }
}
