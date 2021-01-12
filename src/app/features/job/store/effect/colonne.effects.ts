import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ColonneActionTypes} from "../action/colonne.actions";
import {Router} from "@angular/router";
import {catchError, concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {FirebaseService} from "../../../../services/firebase.service";
import {FirebaseCrudService} from "../../../../services/firebase-crud.service";
import {Colonne} from "../../models/colonne";
import {WhereClause} from "../../../../models/where-clause.model";

const collection = 'colonnes';

@Injectable()
export class ColonneEffects {


  loadColonnes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColonneActionTypes.loadColonnes),
      concatMap( (action) => {
       return this.fbService.retrieveItems(collection, [new WhereClause('user_id', '==', action.userId)]);
      }),
      map((doc: any) => {
        return ColonneActionTypes.colonnesLoaded({colonnes: doc});
      })
    )
  );

  createColonne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColonneActionTypes.addColonne),
      concatMap((action) => this.fbService.create(collection, action.colonne)),
      // tap(() => this.router.navigateByUrl('/jobs'))
    ),
  {dispatch: false}
  );

  deleteColonne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColonneActionTypes.deleteColonne),
      concatMap((action) => this.fbService.delete(collection, action.colonneId, true)),
      tap(() => this.router.navigateByUrl('/jobs'))
    ),
    {dispatch:false}
  )

  updateColonne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColonneActionTypes.updateColonne),
      switchMap((action) => {
        return this.fbService.update(collection, action.colonne);
      }),
      map((x) => ColonneActionTypes.updateColonneSuccess())
    )
  );

  constructor(private fbService: FirebaseCrudService<Colonne>, private actions$: Actions, private router: Router) {}

}
