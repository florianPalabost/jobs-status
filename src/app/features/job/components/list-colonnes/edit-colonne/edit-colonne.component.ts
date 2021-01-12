import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Colonne} from "../../../models/colonne";
import {Store} from "@ngrx/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Update} from "@ngrx/entity";
import {JobState} from "../../../store/reducer/job.reducer";
import {updateColonne} from "../../../store/action/colonne.actions";

@Component({
  selector: 'app-edit-colonne',
  templateUrl: './edit-colonne.component.html',
  styleUrls: ['./edit-colonne.component.scss']
})
export class EditColonneComponent implements OnInit {
  @Input() colonne: Colonne;
  editColonneForm: FormGroup;
  colorChosen: string;
  constructor(private fb: FormBuilder, private store: Store<JobState>,
              private modalService: NgbModal, private toast: ToastrService) { }

  ngOnInit(): void {
    this.colorChosen = this.colonne.color;

    this.editColonneForm = this.fb.group({
      name: [this.colonne.name, [Validators.required]],
      color: [this.colorChosen, [Validators.required]]
    })
  }

  update() {
    const colonne: Update<Colonne>= {
      id: this.colonne.id,
      changes: {
        user_id: this.colonne.user_id,
        ...this.editColonneForm.value,
        color: this.colorChosen,
      }
    };
    this.store.dispatch(updateColonne({colonne}));
    this.modalService.dismissAll();
    this.toast.success('Successfully update colonne !');
  }

}
