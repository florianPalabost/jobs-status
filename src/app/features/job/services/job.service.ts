import { Injectable } from '@angular/core';
import {Job} from "../models/job";
import {FirebaseService} from "../../../services/firebase.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private fbService: FirebaseService) { }

  createJob(job: Job) {
    console.log('createJob()', job);
    return this.fbService.createJob(job);
  }

  retrieveAllJobs() : Observable<any[]> {
    console.log('retrieveAllJobs()');
    const res = this.fbService.retrieveCards();
    return res;
  }

  retrieveJobsOfColumn(columnTitle: string): Observable<any> {
    console.log('retrieveJobsColumn()', columnTitle);
    const toto = this.fbService.retrieveCardsWithColumnTitle(columnTitle).pipe(
      map(result => {
        return result;
      })
    );
    return toto;
  }

  deleteJob(jobId: string) {
    return this.fbService.deleteJob(jobId);
  }

  updateJob(job) {
    return this.fbService.updateJob(job);
  }
}
