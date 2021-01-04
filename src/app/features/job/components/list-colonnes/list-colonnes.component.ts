import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-colonnes',
  templateUrl: './list-colonnes.component.html',
  styleUrls: ['./list-colonnes.component.scss']
})
export class ListColonnesComponent implements OnInit {
  colonnes;

  constructor() { }

  async ngOnInit() {
    this.colonnes = ['TODO', 'WIP', 'Done', 'Bug'];
  }

}
