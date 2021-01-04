import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JobState} from "../../../store/reducer/job.reducer";
import {Store} from "@ngrx/store";
import {loadJobsColumn, updateJob} from "../../../store/action/job.actions";
import {getAllJobs} from "../../../store/selector/job.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateJobComponent} from "./create-job/create-job.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DropResult} from 'ngx-smooth-dnd';
import {Job} from "../../../models/job";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-colonne',
  templateUrl: './colonne.component.html',
  styleUrls: ['./colonne.component.scss']
})
export class ColonneComponent implements OnInit, OnDestroy {
  @Input() title: string;
  jobs: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<JobState>, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.store.dispatch(loadJobsColumn({columnTitle:this.title}));

    this.store.select(getAllJobs).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data && data.length > 0) {
        this.jobs = data.filter((job) => job.column === this.title);
      }
    });
  }

  open() {
    const modalRef = this.modalService.open(CreateJobComponent);
    modalRef.componentInstance.column = this.title;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onDrop = (dropResult: DropResult) =>  {
    // to not trigger container which are useless (early return)
    if (dropResult.removedIndex === null && dropResult.addedIndex === null) return;

    if (dropResult.addedIndex !== null){
      // traitement : update column property of job
      const job: Update<Job> = {
        id:dropResult.payload.id,
        changes: {column: this.title}
      };
      this.store.dispatch(updateJob({job}));

    }

  }

  /**
   * to be able to move card between the differents containers
   * @param srcContainersOpts
   * @param payload
   */
  shouldAcceptDrop(srcContainersOpts, payload) {
    return true
  }

  /**
   * tips: Idk why but without arrow fct we cant access on angular component state and so this.jobs for example
   * @param index
   */
  getChildPayload = (index: number) => {
    if (this.jobs && this.jobs.length > 0) {
      return this.jobs.find((item, i) => i === index);
    }
    return undefined;
  }
}
