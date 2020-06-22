import { Injectable } from '@angular/core';

import {AngularFireAuth} from "@angular/fire/auth"
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth,
    private db:AngularFireDatabase) { }

  signUp(email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  signIn(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }


  getUser(){
    return this.auth.authState;
  }


  signOut(){
    this.auth.signOut();
  }
  // getUserSearch(start,end):AngularFireList<any>{
  //   return this.db.list('/users')

  // }



}
