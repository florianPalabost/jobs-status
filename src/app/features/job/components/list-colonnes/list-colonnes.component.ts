import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../../../services/firebase.service";

@Component({
  selector: 'app-list-colonnes',
  templateUrl: './list-colonnes.component.html',
  styleUrls: ['./list-colonnes.component.scss']
})
export class ListColonnesComponent implements OnInit {
  colonnes;

  constructor(private fbService: FirebaseService) { }

  async ngOnInit() {
    // this.colonnes = await this.fbService.retrieveColumns();
    this.colonnes = ['TODO', 'WIP', 'Done', 'Bug'];
  }

}
