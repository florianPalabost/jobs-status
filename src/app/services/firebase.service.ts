import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from "rxjs";
import {Job} from "../features/job/models/job";
import {map} from "rxjs/operators";
import {Update} from "@ngrx/entity";
import {Colonne} from "../features/job/models/colonne";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fbStore: AngularFirestore) { }
  //
  // /*********************** JOB CRUD *************************************/
  //
  // retrieveCards =  () : Observable<any[]> => {
  //   console.log('wip fb retrieve cards');
  //   return this.fbStore.collection<Job>('jobs').valueChanges({idField: 'id'});
  // };
  //
  // /**
  //  * jobs = cards
  //  * @param columnTitle
  //  */
  // retrieveCardsWithColumnTitle = (columnTitle: string, userId: string): Observable<Job[]> => {
  //   console.log('WIP fb retrieve cards with title', columnTitle);
  //   return this.fbStore.collection<Job>('jobs', ref => ref.where('column', '==', columnTitle)
  //     .where('user_id', '==', userId)).snapshotChanges().pipe(
  //     map( action => action.map(a => {
  //       const  data = a.payload.doc.data();
  //       const id = a.payload.doc.id;
  //       return {...data, id};
  //       })
  //
  //     )
  //   );
  // };
  //
  // createJob = (card) => {
  //   console.log('WIP create card:', card);
  //   return this.fbStore.collection('jobs').add(card);
  // }
  //
  // updateJob = (job :Update<Job>) => {
  //   console.log('WIP update card:', job);
  //   return this.fbStore.doc('jobs/'+ job.id).update(job.changes);
  // }
  //
  // retrieveJobWithId= (jobId: string|number) => {
  //   // quick trick to get the id of the document
  //   return this.fbStore.collection<Job>('jobs', ref => ref.where('id', '==', jobId)).valueChanges({idField: 'id'});
  // }
  //
  // deleteJob = (jobId: string)  => {
  //   console.log('WIP delete card:', jobId);
  //   return this.fbStore.doc('jobs/'+ jobId).delete();
  // }
  //
  //
  // /******************* COLONNE CRUD ********************/
  // retrieveColonnes(userId: string) {
  //   return this.fbStore.collection<Colonne>('colonnes',
  //     ref => ref.where('user_id', '==', userId)).snapshotChanges().pipe(
  //     map( action => action.map(a => {
  //         const  data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return {...data, id};
  //       })
  //     )
  //   );
  // }
  // createColonne(colonne: any) {
  //   return this.fbStore.collection('colonnes').add(colonne);
  // }
  //
  // deleteColonne(colonneId: any) {
  //   return this.fbStore.doc('colonnes/'+ colonneId).delete();
  // }
  //
  // updateColonne(colonne: Update<Colonne>) {
  //   return this.fbStore.doc('colonnes/'+ colonne.id).update(colonne.changes);
  // }
}
