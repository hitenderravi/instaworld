import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

import {v4 as uuidv4} from "uuid"
import { by } from 'protractor';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users=[];
  posts=[];

  isLoading=false;

  constructor(
    private db:AngularFireDatabase,
    private toastr:ToastrService,
    private auth:AuthService
  ) {
    this.isLoading=true;
    //get all  user
    db.object('/users')
    .valueChanges().subscribe((obj)=>{
      if(obj){
        this.users = Object.values(obj);
        this.isLoading=false
      }else{
        toastr.error("NO User foundd")
        this.users=[];
        this.isLoading=false;
      }
    })
    //grab all post from firebase
    const uid = uuidv4();
   auth.getUser().subscribe((user)=>{
   
   console.log("uid",uid)
    db.object(`/posts/${user.uid}/posts`)
      .valueChanges()
      .subscribe((obj) => {
        console.log("obj",obj)
        console.log("user id",user.uid)

        if (obj) {
         console.log("obj hai ",obj)
          this.posts = Object.values(obj).sort((a, b) => b.date - a.date);
          console.log("leng",this.posts.length)
          console.log("posts",this.posts)
          this.isLoading = false;
        } else {
          toastr.error("NO post to display");
          this.posts = [];
          this.isLoading = false;
        }
      });
    })
  }

  ngOnInit(): void {
  } 
}
