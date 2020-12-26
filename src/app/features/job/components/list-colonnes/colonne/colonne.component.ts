import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JobState} from "../../../store/reducer/job.reducer";
import {Store} from "@ngrx/store";
import {loadJobsColumn} from "../../../store/action/job.actions";
import {getAllJobs, getJobsByColumn} from "../../../store/selector/job.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-colonne',
  templateUrl: './colonne.component.html',
  styleUrls: ['./colonne.component.scss']
})
export class ColonneComponent implements OnInit, OnDestroy {
  @Input() title: string;

  jobs: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private store: Store<JobState>) { }

  ngOnInit(): void {
    console.log("i'm still here");
    // todo load jobs with its column title, ex: todo Column load todo jobs
    this.store.dispatch(loadJobsColumn({columnTitle:this.title}));

    this.store.select(getAllJobs).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log('waiting');
      if (data.length > 0) {
        this.jobs = data.filter((job) => job.column === this.title);
        console.log('this jovb', this.jobs)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
