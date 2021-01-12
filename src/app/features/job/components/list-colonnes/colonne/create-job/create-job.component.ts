import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store";
import {addJob} from "../../../../store/action/job.actions";
import {Job} from "../../../../models/job";
import * as uuid from 'uuid';
import {UserService} from "../../../../../user/services/user.service";
import * as fromRoot from "../../../../../user/store/reducer/user.reducer";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import firebase from "firebase";
import Firestore = firebase.firestore.Firestore;
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {
  createJobForm: FormGroup;
  @Input() column: string;
  user: any;
  showPostulated = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>,
              private userService: UserService, private toast: ToastrService,
              private modalService: NgbModal, private fs: AngularFirestore) { }

  ngOnInit(): void {
    const urlRegex  = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

    this.createJobForm = this.fb.group({
      title: ['', [Validators.required]],
      entreprise: ['', [Validators.required]],
      offer_link: ['', [Validators.pattern(urlRegex)]],
      salary: ['', [Validators.pattern(/[0-9]{3,}$/)]],
      type: [''],
      description: [''],
      column: [this.column, []],
      has_postulated: [false, []],
      date_postulated: [null, []]
    });

    this.store.select(fromRoot.getLoginUser).subscribe(data => {
      if (data.user['isLogged']) {
       this.user = data.user['user'];
      }
    });
  }

  onSubmit() {
    const userId = this.user && this.user.hasOwnProperty('id') ? this.user.id : undefined;
    const job: Job = {
      user_id: userId,
      ...this.createJobForm.value};


   this.store.dispatch(addJob({job}));
    this.modalService.dismissAll();
    this.toast.success('Successfully Add Job !');
  }

  showDatePostul() {
    // has postulated so, show date postule
    if (this.createJobForm.get('has_postulated').value) {
      this.createJobForm.get('date_postulated').setValue(new Date());
    }
    this.showPostulated = !this.showPostulated;
  }
}
