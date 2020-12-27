import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../../models/job";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() job: Job;
  editJobForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const urlRegex  = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);

    this.editJobForm = this.fb.group({
      title: [this.job.title, [Validators.required]],
      entreprise: [this.job.entreprise, [Validators.required]],
      offer_link: [this.job.offer_link, [Validators.pattern(urlRegex)]],
      salary: [this.job.salary, [Validators.pattern(/[0-9]{3,}$/)]],
      type: [this.job.type],
      column: [this.job.column, []]
    });
  }

  update() {
    console.log('update values')
  }
}
