import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.css']
})
export class OtheruserComponent implements OnInit {
user=null
posts=[]
isLoading=false;
mainid=null
users=[];

  constructor(
    private db:AngularFireDatabase,
    private auth:AuthService,
    private route:ActivatedRoute,
    private toastr:ToastrService
  ) { 




     this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log("dikh gya",params['id']) //log the value of id
    this.mainid=params['id']
    console.log("fir dikha",this.mainid)

db.object(`/users/${this.mainid}`).valueChanges().subscribe((info)=>{
  
  if (info) {
    console.log("obj hai ",info)
     this.users = Object.values(info)
    
     console.log("postsdjsgdjhsgfjs",this.users)
     this.isLoading = false;
   } 
})




      auth.getUser().subscribe((user)=>{
        this.user=user;
           console.log("uid",user.uid)
            db.object(`/posts/${this.mainid}/posts`)
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




    });

    
  }

  ngOnInit(): void {
  }

}
