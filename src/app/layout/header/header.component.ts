import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {ToastrService} from "ngx-toastr"
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ThrowStmt } from '@angular/compiler';
import * as firebase from 'firebase';
import { snapshotChanges } from '@angular/fire/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email=null;
  users;
 searchedUsers=[]


 userid=null
 
  constructor(
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private af:AngularFirestore
  ) { 
    auth.getUser().subscribe((user)=>{
      console.log("USER IS",user);
      this.email=user?.email
    })

  }
 
  search($event){
    var key=$event.target.value;
    var lowerCaseKey=key.toLowerCase()
    if(lowerCaseKey.length>0){
      firebase.database().ref("users").orderByChild("name")
      .startAt(lowerCaseKey )
      .endAt(lowerCaseKey + "\uf8ff")
      .once("value",snapshot=>{
        this.searchedUsers=[]
        snapshot.forEach(childSnap=>{
          this.searchedUsers.push(childSnap.val())
        })
      })
    }
    else{
      this.searchedUsers=[]
    }
  }
  show(otherid){
    
    
    this.userid=otherid;
    console.log("shhghffffffffffffow",this.userid)
   
    this.router.navigate(['/other', this.userid])
    
  }

  ngOnInit(): void {
    // this.auth.getUserSearch(this.startAt,this.endAt)
    
    // .valueChanges()
    // .subscribe((users)=>{
    //   this.users=users
    //   console.log("as,",this.startAt)
    // })
  }


  // search($event){
  //   if($event.timeStamp-this.lastKeyPress>200){
  //   let q=$event.target.value
    
  //   this.startAt.next(q)
  //   console.log("q",this.startAt)
    
  //   this.endAt.next(q+"\uf8ff")
  //   console.log("aq",this.endAt)
  //   }
  //   this.lastKeyPress=$event.timeStamp
  // }
  async handleSignout(){
    try{
      await this.auth.signOut()
      this.router.navigateByUrl('/signin')
      this.toastr.info("Logout success")
      this.email=null
    }
    catch(error){
      this.toastr.error("Problem in Signout")
    }
  }

}
