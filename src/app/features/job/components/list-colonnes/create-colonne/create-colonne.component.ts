import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as fromRoot from "../../../../user/store/reducer/user.reducer";
import {Job} from "../../../models/job";
import {Colonne} from "../../../models/colonne";
import {ToastrService} from "ngx-toastr";
import {addColonne} from "../../../store/action/colonne.actions";
import {getAllColonnes} from "../../../store/selector/colonne.selectors";

@Component({
  selector: 'app-create-colonne',
  templateUrl: './create-colonne.component.html',
  styleUrls: ['./create-colonne.component.scss']
})
export class CreateColonneComponent implements OnInit {
  createColonneForm: FormGroup;
  user: any;
  color = '#3d97b6';
  colonnesLength: number;

  constructor(private fb: FormBuilder, private store: Store<AppState>,
              private modalService: NgbModal, private toast: ToastrService) { }

  ngOnInit(): void {
    this.createColonneForm = this.fb.group({
      name: ['', Validators.required],
      color: ['']
    });

    this.store.select(getAllColonnes).subscribe(data => {
      this.colonnesLength = data ? data.length : 0;
    });

    this.store.select(fromRoot.getLoginUser).subscribe(data => {
      if (data.user['isLogged']) {
        this.user = data.user['user'];
      }
    });

  }

  onSubmit() {
    const userId = this.user && this.user.hasOwnProperty('id') ? this.user.id : undefined;
    const colonne: Colonne = {
      ...this.createColonneForm.value,
      user_id: userId,
      color: this.color,
      order: this.colonnesLength
      };

    this.store.dispatch(addColonne({colonne}));
    this.modalService.dismissAll();
    this.toast.success('Successfully Add Colonne !');
  }

}
