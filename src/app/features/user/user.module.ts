import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {userFeatureKey, userReducer} from "./store/reducer/user.reducer";
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effect/user.effects';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthFirebaseService} from "../../services/auth-firebase.service";
import {UserService} from "./services/user.service";

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [],
  exports: [SigninComponent, SignupComponent]
})
export class UserModule { }
