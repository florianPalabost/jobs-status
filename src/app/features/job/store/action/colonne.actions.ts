import { createAction, props } from '@ngrx/store';
import {Update} from "@ngrx/entity";
import { Colonne } from '../../models/colonne';

export const loadColonnes = createAction(
  '[Colonne] Load Colonnes',
  props<{userId: string}>()
);

export const colonnesLoaded = createAction(
  '[Colonnes Effect] Colonnes Loaded Successfully',
  props<{colonnes: Colonne[]}>()
);

export const colonnesFailedLoad = createAction(
  '[Colonnes Effect] Colonnes Failed Loaded',
  props<{error: any}>()
);



export const addColonne = createAction(
'[Colonne] Add Colonne',
  props<{colonne: Colonne}>()
);



export const deleteColonne = createAction(
  '[Colonne] Delete Colonne',
  props<{colonneId: string}>()
);



export const updateColonne = createAction(
  '[Colonne] Update Colonne',
  props<{colonne: Update<Colonne>}>()
);

export const updateColonneSuccess = createAction(
  '[Colonnes Effect] Updated Colonne Successfully',
);

export const updateColonneFailed = createAction(
  '[Colonnes Effect] Colonne updated Failed',
  props<{error: any}>()
);


export const ColonneActionTypes = {
  loadColonnes,
  colonnesLoaded,
  colonnesFailedLoad,
  addColonne,
  deleteColonne,
  updateColonne,
  updateColonneSuccess,
  updateColonneFailed
};





