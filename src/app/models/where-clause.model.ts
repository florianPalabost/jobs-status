import firebase from "firebase";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

/**
 * object Where for request firestore
 */
export class WhereClause {

  columnn: string;
  op: WhereFilterOp;
  val: any;

  constructor(col: string, op: WhereFilterOp, val: any) {
    this.columnn = col;
    this.op = op;
    this.val = val;
  }
}
