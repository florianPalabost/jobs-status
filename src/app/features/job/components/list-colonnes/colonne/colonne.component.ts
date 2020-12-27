import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {JobState} from "../../../store/reducer/job.reducer";
import {Store} from "@ngrx/store";
import {loadJobsColumn} from "../../../store/action/job.actions";
import {getAllJobs} from "../../../store/selector/job.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateJobComponent} from "./create-job/create-job.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
      if (data.length > 0) {
        this.jobs = data.filter((job) => job.column === this.title);
        console.log('this jovb', this.jobs)
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


}
