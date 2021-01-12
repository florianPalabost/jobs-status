import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {userFeatureKey, userReducer} from "./store/reducer/user.reducer";
import {SigninComponent} from "./components/signin/signin.component";
import {SignupComponent} from "./components/signup/signup.component";
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effect/user.effects';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./services/user.service";
import {ToggleDirective} from "./directives/toggle.directive";

@NgModule({
  declarations: [SigninComponent, SignupComponent, ToggleDirective],
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
