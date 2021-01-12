import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { JobEffects } from './store/effect/job.effects';
import {StoreModule} from "@ngrx/store";
import {jobFeatureKey, jobReducer} from "./store/reducer/job.reducer";
import { CreateJobComponent } from './components/list-colonnes/colonne/create-job/create-job.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListColonnesComponent} from "./components/list-colonnes/list-colonnes.component";
import {ColonneComponent} from "./components/list-colonnes/colonne/colonne.component";
import {CardComponent} from "./components/list-colonnes/colonne/card/card.component";
import {JobService} from "./services/job.service";
import {RouterModule} from "@angular/router";
import { EditComponent } from './components/list-colonnes/colonne/edit/edit.component';
import { TinyCardComponent } from './components/list-colonnes/colonne/tiny-card/tiny-card.component';
import {NgxSmoothDnDModule} from "ngx-smooth-dnd";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {colonneFeatureKey, colonneReducer} from "./store/reducer/colonne.reducer";
import {ColonneEffects} from "./store/effect/colonne.effects";
import { CreateColonneComponent } from './components/list-colonnes/create-colonne/create-colonne.component';
import {ColorPickerModule} from "ngx-color-picker";
import { EditColonneComponent } from './components/list-colonnes/edit-colonne/edit-colonne.component';

@NgModule({
  declarations: [CreateJobComponent, ListColonnesComponent, ColonneComponent, CardComponent, EditComponent, TinyCardComponent, CreateColonneComponent, EditColonneComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(jobFeatureKey, jobReducer),
    StoreModule.forFeature(colonneFeatureKey, colonneReducer),
    EffectsModule.forFeature([JobEffects, ColonneEffects]),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSmoothDnDModule,
    NgbModule,
    ColorPickerModule
  ],
  providers: [JobService],
  bootstrap: [],
  exports: [ListColonnesComponent, CreateJobComponent, ColonneComponent, CardComponent]
})
export class JobModule { }
