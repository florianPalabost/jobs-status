import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
import { AngularFireModule } from '@angular/fire';
import {environment} from "../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from '@ngrx/store';
import { reducers, metaReducers } from './root-store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {JobModule} from "./features/job/job.module";
import {EffectsModule} from "@ngrx/effects";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {UserModule} from "./features/user/user.module";
import { NotFoundComponent } from './layout/not-found/not-found.component';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {UserEffects} from "./features/user/store/effect/user.effects";
import {JobEffects} from "./features/job/store/effect/job.effects";
import { HomeComponent } from './layout/home/home.component';
import {clearState} from "./root-store/clearState";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(reducers, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([UserEffects, JobEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    JobModule,
    UserModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
