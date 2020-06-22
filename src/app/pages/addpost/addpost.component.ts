import { Component, OnInit ,OnDestroy} from '@angular/core';



import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//services
import { AuthService } from 'src/app/services/auth.service';
//angular form
import {NgForm} from "@angular/forms"
 import {finalize} from "rxjs/operators"
 //firebase
  import {AngularFireStorage} from "@angular/fire/storage"
 import  {AngularFireDatabase} from "@angular/fire/database"
//browser image resizer
 import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';

//uuid
import {v4 as uuidv4} from "uuid"
import { error } from 'console';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

z=null;

  postId=null
  locationName:string
  description:string;
  picture:string=null;
  user=null;
  userId=null
  uploadPercent:number=null;
  constructor(
    private db: AngularFireDatabase,
    private storage:AngularFireStorage,
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router,
  ) { 
    auth.getUser().subscribe((user)=>{
      this.db.object(`/users/${user.uid}`)
      .valueChanges()
      .subscribe((user)=>{
        this.user=user;
        console.log("userinfo",user)
        
      })
     
    })
   
    
  }

  ngOnInit(): void {
  }
    
   onSubmit=()=> {
    const uid = uuidv4();
    console.log("wew",this.user)

  this.db.object(`/posts/${this.user.id}/posts/${uid}`)
      .set({
        id: uid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        
        by: this.user.name,
        userId: this.user.id,
        date: Date.now(),
      })
      .then(() => {
        this.toastr.success("Post added successfully");
        this.router.navigateByUrl("/");
       this. z==2;
      })
      .catch((err) => {
        this.toastr.error("Oopsss");
      })
   

   
}




 async uploadFile(event){

  const file=event.target.files [0];
  let resizedImage= await readAndCompressImage(file,imageConfig)
  const filePath=file.name
  const fileRef=this.storage.ref(filePath)

  const task=this.storage.upload(filePath,resizedImage)

  task.percentageChanges().subscribe((percentage)=>{
    this.uploadPercent=percentage
  })
  task.snapshotChanges().pipe(
    finalize(()=>{
      fileRef.getDownloadURL().subscribe((url)=>{
        this.picture=url;
        this.toastr.success("image upload success")
      })
    })
  ).subscribe()
  
  }
}
