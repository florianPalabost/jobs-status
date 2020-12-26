import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  user: Observable<firebase.User>;

  constructor(public auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  createNewUser = async (email:string, password:string) => {
    try {
      return await firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    catch (e) {
      console.error(e);
    }
  }

  signInUser = (email:string, password:string) => {
    try {
      const user = firebase.auth().signInWithEmailAndPassword(email, password);
      return user;
    }
    catch (e) {
      console.error(e);
    }
  }

  signOutUser = () => {
    try {
      return firebase.auth().signOut();
    }
    catch (e) {
      console.log(e);
    }

  }
}
