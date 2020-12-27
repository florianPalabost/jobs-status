import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../../models/job";
import {Store} from "@ngrx/store";
import {JobState} from "../../../../store/reducer/job.reducer";
import {ToastrService} from "ngx-toastr";
import {deleteJob} from "../../../../store/action/job.actions";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() job: Job

  constructor(private store: Store<JobState>, private toast: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  delete(jobId: string) {
    this.store.dispatch(deleteJob({jobId}));
    this.toast.success('Job successfully delete !');
  }

  edit() {
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.job = this.job;
  }
}
