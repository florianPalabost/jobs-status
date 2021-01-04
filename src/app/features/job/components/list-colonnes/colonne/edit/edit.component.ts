import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../../models/job";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobState} from "../../../../store/reducer/job.reducer";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Store} from "@ngrx/store";
import {updateJob} from "../../../../store/action/job.actions";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() job: Job;
  editJobForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<JobState>,
              private modalService: NgbModal, private toast: ToastrService) { }

  ngOnInit(): void {
    const urlRegex  = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

    this.editJobForm = this.fb.group({
      title: [this.job.title, [Validators.required]],
      entreprise: [this.job.entreprise, [Validators.required]],
      offer_link: [this.job.offer_link, [Validators.pattern(urlRegex)]],
      salary: [this.job.salary, [Validators.pattern(/[0-9]{3,}$/)]],
      type: [this.job.type],
      description: [this.job.description],
      column: [this.job.column, []]
    });
  }

  update() {
    const job: Update<Job>= {
      id: this.job.id,
      changes: {
        user_id: this.job.user_id,
        ...this.editJobForm.value
      }
    };
    this.store.dispatch(updateJob({job}));
    this.modalService.dismissAll();
    this.toast.success('Successfully update job !');
  }

}
