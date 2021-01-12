import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store";
import {loadColonnes, updateColonne} from "../../store/action/colonne.actions";
import {getLoginUser} from "../../../user/store/reducer/user.reducer";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {getAllColonnes} from "../../store/selector/colonne.selectors";
import {CreateJobComponent} from "./colonne/create-job/create-job.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateColonneComponent} from "./create-colonne/create-colonne.component";
import {DropResult} from "ngx-smooth-dnd";
import {Colonne} from "../../models/colonne";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-list-colonnes',
  templateUrl: './list-colonnes.component.html',
  styleUrls: ['./list-colonnes.component.scss']
})
export class ListColonnesComponent implements OnInit, OnDestroy {
  colonnes = [];
  userId: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, private modalService: NgbModal) { }

  ngOnInit() {
    this.store.select(getLoginUser).subscribe((data) => {
      if (data !== null && data.user !== null && data.user['user'] !== null) {
        this.userId = data?.user && data?.user['user'].hasOwnProperty('id') ? data?.user['user']['id'] : undefined;
      }

    });
    this.store.dispatch(loadColonnes({userId: this.userId}));
    this.store.select(getAllColonnes).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: any) => {
      if (data && data.length > 0) {
        this.colonnes = data.filter((col) => col.id !== undefined && col.id !== '');
      } else {
        this.colonnes = [];
      }
      this.colonnes.sort((a,b)=> a.order - b.order)
    })
    // this.colonnes = ['TODO', 'WIP', 'Done', 'Bug'];
  }

  open() {
    const modalRef = this.modalService.open(CreateColonneComponent);
    // modalRef.componentInstance.column = this.title;
  }

  onDrop(dropResult: DropResult) {
    if (dropResult.removedIndex === null && dropResult.addedIndex === null) return;
    // just inverse addedIndex & removedIndex for client side ()but not save
    // need to update order Colonne
    const colonne: Update<Colonne> = {
      id: dropResult.payload.id,
      changes: {order: dropResult.addedIndex}
    };
    this.store.dispatch(updateColonne({colonne}));
    // dropResult.payload.order = dropResult.addedIndex;

    // the colonnes have to change their orders number
  }

  /**
   * tips: Idk why but without arrow fct we cant access on angular component state and so this.jobs for example
   * @param index
   */
  getChildPayload = (index: number) => {
    if (this.colonnes && this.colonnes.length > 0) {
      return this.colonnes.find((item, i) => i === index);
    }
    return undefined;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
