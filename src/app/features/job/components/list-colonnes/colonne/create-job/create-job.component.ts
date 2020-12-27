import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../store";
import {addJob} from "../../../../store/action/job.actions";
import {Job} from "../../../../models/job";
import * as uuid from 'uuid';
import {getUser, isUserLoaded} from "../../../../../user/store/selector/user.selectors";
import {UserService} from "../../../../../user/services/user.service";
import * as fromRoot from "../../../../../user/store/reducer/user.reducer";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  @Input() column: string;
  user: any;

  constructor(private fb: FormBuilder, private store: Store<AppState>,
              private userService: UserService, private toast: ToastrService) { }

  ngOnInit(): void {
    const urlRegex  = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

    this.createJobForm = this.fb.group({
      title: ['', [Validators.required]],
      entreprise: ['', [Validators.required]],
      offer_link: ['', [Validators.pattern(urlRegex)]],
      salary: ['', [Validators.pattern(/[0-9]{3,}$/)]],
      type: [''],
      column: [this.column, []]
    });

    this.store.select(fromRoot.getLoginUser).subscribe(data => {
      if (data.user['isLogged']) {
       this.user = data.user['user'];
      }
    });
  }

  onSubmit() {
    const userId = this.user && this.user.hasOwnProperty('id') ? this.user.id : undefined;
    const job: Job ={
      id: uuid.v4(),
      user_id: userId,
      ...this.createJobForm.value};
    this.store.dispatch(addJob({job}));
    this.toast.success('Successfully Add Job !');
  }
}
