export class Colonne {
  id: string;
  name: string;
  color?: string; // background-color of col
  user_id?: string; // user who own column
  order?: number; // order of the column ; by default it should be col[].length
}
