import { Action, createReducer, on } from '@ngrx/store';
import {Colonne} from "../../models/colonne";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {ColonneActionTypes} from "../action/colonne.actions";

export const colonneFeatureKey = 'colonnes';

export interface ColonneState extends EntityState<Colonne> {
  colonnesLoaded: boolean;
}

export const adapter: EntityAdapter<Colonne> = createEntityAdapter<Colonne>({
  selectId: (colonne: Colonne) => colonne.id
});

export const initialState = adapter.getInitialState({
  colonnesLoaded: false
});


export const colonneReducer = createReducer(
  initialState,
  on(ColonneActionTypes.colonnesLoaded, (state, action) => {
    return adapter.addMany(
      action.colonnes,
      {...state, colonnesLoaded: true}
    );
  }),
  on(ColonneActionTypes.addColonne, (state, action) => {
    return adapter.addOne(action.colonne, state);
  }),
  on(ColonneActionTypes.deleteColonne, (state, action) => {
    return adapter.removeOne(action.colonneId, state);
  }),
  on(ColonneActionTypes.updateColonne, (state, action) => {
    return adapter.updateOne(action.colonne, state);
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();



