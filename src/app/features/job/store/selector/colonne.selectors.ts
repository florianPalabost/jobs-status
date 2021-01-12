import {createFeatureSelector, createSelector} from '@ngrx/store';
import {colonneFeatureKey, ColonneState, selectAll, selectIds} from '../reducer/colonne.reducer';

export const colonneFeatureSelector = createFeatureSelector<ColonneState>(colonneFeatureKey);

export const getAllColonnes = createSelector(
  colonneFeatureSelector,
  selectAll
);


export const areColonnesLoaded = createSelector(
  colonneFeatureSelector,
  state => state.colonnesLoaded
);

export const getColonnesByColumn = ({columnTitle}) => createSelector(
  getAllColonnes,
  (colonnes, props) => {
    // const res = colonnes.length > 0 ? colonnes.map((colonne) => colonne.column === columnTitle) : [];
    return colonnes;
  }
);
