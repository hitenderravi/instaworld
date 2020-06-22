import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  user=null
  id=null;
  posts=[]
  mainid=null
  picture:string=null;

  constructor(private auth:AuthService,private db: AngularFireDatabase,private toastr:ToastrService,
    private route:ActivatedRoute,) {

    this.route.params.subscribe(params => {
      console.log() //log the entire params object
      console.log() //log the value of id
    this.mainid=params['id']
    console.log()
    })


    auth.getUser().subscribe((user)=>{
      this.db.object(`/users/${user.uid}`)
      .valueChanges()
      .subscribe((user)=>{
        
        this.user=user;
        
      })
})




auth.getUser().subscribe((user)=>{
  db.object(`/posts/${user.uid}/posts`)
  .valueChanges()
  .subscribe((obj) => {
    console.log("obj",obj)
    console.log("user id",user.uid)

    if (obj) {
     console.log("obj hai ",obj)
      this.posts = Object.values(obj).sort((a, b) => b.date - a.date);
      
      console.log("lenguser",this.posts?.length)
     
    }
 
})
})
   
   }

  ngOnInit(): void {
  }

}
