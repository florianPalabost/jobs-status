import {Injectable} from '@angular/core';
import {AngularFirestore, Query} from '@angular/fire/firestore';
import {map} from "rxjs/operators";
import {Update} from "@ngrx/entity";
import firebase from "firebase";

import {WhereClause} from "../models/where-clause.model";

@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService<T> {

  constructor(protected fbStore: AngularFirestore) { }

  public retrieveItems = (collection: string, whereClause: WhereClause[] = []) => {
    return this.fbStore.collection<T>(collection, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      // prepare the different where clauses
      whereClause.forEach(
          (x) => {
            query = query.where(x.columnn, x.op, x.val);
          }
      );
      return query;
      }
    ).snapshotChanges().pipe(
      map( action => action.map(a => {
          const  data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {...data, id};
        })

      )
    );
  };
  // todo handle error
  public create = (collection: string, item: T) => this.fbStore.collection(collection).add(item);
  public update = (collection: string, item: Update<T>) => this.fbStore.doc(collection + '/' + item.id).update(item.changes);
  public delete = (collection: string, itemId: string, hasChildren= false) => {
    if (hasChildren) {
      const childsToDelete =this.retrieveItems('jobs', [new WhereClause('column', '==', itemId)]);
      childsToDelete.subscribe(data => {
          data.forEach(doc => this.fbStore.doc('jobs/' + doc.id).delete())
      });

    }
    return this.fbStore.doc(collection + '/' + itemId).delete();
  };

/** sample of where clause array object for request **/
// whereClause: WhereClause = [
//   {
//   column:'column',
//   op: '==',
//   val: ''
//   },
//   {
//     column:'user_id',
//     op: '==',
//     val: ''
//   },
// ]

}
