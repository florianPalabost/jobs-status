import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {Job} from "../features/job/models/job";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fbStore: AngularFirestore) { }

 // todo CRUD CARDS OPs with userid
  retrieveCards =  () : Observable<any[]> => {
    console.log('wip fb retrieve cards');
    const res = this.fbStore.collection<Job>('jobs').valueChanges();

    return res;
  };

  /**
   * jobs = cards
   * @param columnTitle
   */
  retrieveCardsWithColumnTitle = (columnTitle: string): Observable<Job[]> => {
    console.log('WIP fb retrieve cards with title', columnTitle);
    return this.fbStore.collection<Job>('jobs', ref => ref.where('column', '==', columnTitle)).valueChanges();
  };

  createJob = (card) => {
    console.log('WIP create card:', card);
    return this.fbStore.collection('jobs').add(card);
  }

  updateJob = async (job) => {
    console.log('WIP update card:', job);
    delete job.id;
    await this.fbStore.doc('jobs/'+ job.id).update(job);
  }

  deleteJob = (jobId: string) => {
    console.log('WIP delete card:', jobId);
    return this.fbStore.doc('jobs/'+ jobId).delete();
  }


}
