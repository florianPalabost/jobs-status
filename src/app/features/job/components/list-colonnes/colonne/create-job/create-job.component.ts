import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store";
import {addJob} from "../../../../store/action/job.actions";
import {Job} from "../../../../models/job";
import * as uuid from 'uuid';
import {getUser, isUserLoaded} from "../../../../../user/store/selector/user.selectors";

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.createJobForm = this.fb.group({
      title: [''],
      entreprise: [''],
      offer_link: [''],
      salary: [''],
      type: [''],
    })
  }

  onSubmit() {
    const user = this.store.select(getUser);
    const job: Job ={
      id: uuid.v4(),
      user_id: '',
      ...this.createJobForm.value};
    // this.store.dispatch(addJob({job}));
  }
}
