import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../../../models/job";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-tiny-card',
  templateUrl: './tiny-card.component.html',
  styleUrls: ['./tiny-card.component.scss']
})
export class TinyCardComponent {
  @Input() job: Job;

  constructor(private modalService: NgbModal) { }

  show(job: Job) {
    const modalRef = this.modalService.open(CardComponent);
    modalRef.componentInstance.job = job;
  }
}
