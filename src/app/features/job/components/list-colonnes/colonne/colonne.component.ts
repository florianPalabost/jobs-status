import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JobState} from "../../../store/reducer/job.reducer";
import {Store} from "@ngrx/store";
import {deleteJob, loadJobsColumn, updateJob} from "../../../store/action/job.actions";
import {getAllJobs} from "../../../store/selector/job.selectors";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CreateJobComponent} from "./create-job/create-job.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DropResult} from 'ngx-smooth-dnd';
import {Job} from "../../../models/job";
import {Update} from "@ngrx/entity";
import {getLoginUser} from "../../../../user/store/reducer/user.reducer";
import {AppState} from "../../../store";
import {deleteColonne} from "../../../store/action/colonne.actions";
import {ToastrService} from "ngx-toastr";
import {EditComponent} from "./edit/edit.component";
import {EditColonneComponent} from "../edit-colonne/edit-colonne.component";

@Component({
  selector: 'app-colonne',
  templateUrl: './colonne.component.html',
  styleUrls: ['./colonne.component.scss']
})
export class ColonneComponent implements OnInit, OnDestroy {
  @Input() colonne: any;
  jobs: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userId: any;
  title: string;
  colonneId: string;

  constructor(private store: Store<AppState>, private modalService: NgbModal, private toast: ToastrService) {
  }

  ngOnInit(): void {

    this.title = this.colonne && this.colonne.hasOwnProperty('name') ? this.colonne.name : undefined;

    this.colonneId = this.colonne && this.colonne.hasOwnProperty('id') ? this.colonne.id : undefined;

    this.store.select(getLoginUser).subscribe((data) => {
      if (data !== null && data.user !== null && data.user['user'] !== null) {
        this.userId = data?.user && data?.user['user'].hasOwnProperty('id') ? data?.user['user']['id'] : undefined;
      }
    })
    this.store.dispatch(loadJobsColumn({columnId:this.colonneId, userId: this.userId}));

    this.store.select(getAllJobs).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data && data.length > 0) {
        this.jobs = data.filter((job) => job.column === this.colonneId && job.id !== undefined && job.id !== '')
      }
    });
  }

  open() {
    const modalRef = this.modalService.open(CreateJobComponent);
    modalRef.componentInstance.column = this.colonneId;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  onDrop = (dropResult: DropResult) =>  {
    // to not trigger container which are useless (early return)
    if (dropResult.removedIndex === null && dropResult.addedIndex === null) return;

    if (dropResult.addedIndex !== null){
      // traitement : update column property of job
      const job: Update<Job> = {
        id:dropResult.payload.id,
        changes: {column: this.colonneId}
      };
      this.store.dispatch(updateJob({job}));

    }

  }

  /**
   * to be able to move card between the differents containers
   * @param srcContainersOpts
   * @param payload
   */
  shouldAcceptDrop(srcContainersOpts, payload) {
    return true
  }

  /**
   * tips: Idk why but without arrow fct we cant access on angular component state and so this.jobs for example
   * @param index
   */
  getChildPayload = (index: number) => {
    if (this.jobs && this.jobs.length > 0) {
      return this.jobs.find((item, i) => i === index);
    }
    return undefined;
  }

  delete(colonneId: string) {
    this.store.dispatch(deleteColonne({colonneId}));
    this.toast.success('Colonne successfully deleted !');

  }

  edit() {
    const modalRef = this.modalService.open(EditColonneComponent);
    modalRef.componentInstance.colonne = this.colonne;
  }
}
