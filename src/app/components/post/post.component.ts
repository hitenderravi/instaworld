import { Component, OnInit,Input ,OnChanges} from '@angular/core';
import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
  faCommentDots
} from "@fortawesome/free-regular-svg-icons"
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms"
import {v4 as uuidv4} from "uuid"
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit,OnChanges {
  @Input() post;
  @Input() mainid;
  
  faThumbsUp=faThumbsUp;
  faThumbsDown=faThumbsDown
  faShareSquare=faShareSquare
  faCommentDots=faCommentDots
users=[]
otherusers=[]
isLoading=false
comments=[]
  uid=null
user=null
user1=null
  upvote=0;
  downvote=0;
  
  constructor(private db:AngularFireDatabase,
    private auth:AuthService,
    private route:ActivatedRoute,
    private modalService: NgbModal) {

    
      this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log("dikh gya",params['id']) //log the value of id
      this.mainid=params['id']
      
      console.log("postmainid",this.mainid)
      })

      this.auth.getUser().subscribe((user)=>{
        this.uid=user?.uid;
        this.user=user;
       

     //for  other comment
        
        db.object(`/users/${this.mainid}`)
        .valueChanges().subscribe((obj)=>{
          if(obj){
            this.otherusers = Object.values(obj).sort((a, b) => b.date - a.date);
            this.isLoading=false
            console.log("mmmmmmmmm",this.otherusers)
            console.log("hhhhhhhh",this.uid)
          }else{
            
            this.otherusers=[];
            this.isLoading=false;
          }
        })

//my comment

      db.object(`/users/${this.uid}`)
      .valueChanges().subscribe((obj)=>{
        if(obj){
          this.users = Object.values(obj).sort((a, b) => b.date - a.date);
          this.isLoading=false
          console.log("mmmmmmmmm",this.users)
          console.log("hhhhhhhh",this.uid)
        }else{
          
          this.users=[];
          this.isLoading=false;
        }
      })
    
//######################################################################################################################
     


    console.log("console kra",this.mainid)

     //  other comment
       
         

   
      //my comment
      //my comment
    

     
      // console.log("user ki id",this.uid)
      // console.log("post ki id",this.post.id)
//###########################################
      db.object(`/comments/${this.post.id}/comment`)
      .valueChanges().subscribe((obj)=>{
        if(obj){
          this.comments = Object.values(obj).sort((a, b) => b.date - a.date);
          this.isLoading=false
          console.log("commentlength",this.comments.length)
          console.log("hhhhhhhh",this.uid)
        }else{
          
          this.comments=[];
          this.isLoading=false;
        }
      })

    })


    //get all comment on self page

    // auth.getUser().subscribe((user)=>{
    //   db.object(`/posts/${user.uid}/posts/${this.post.id}/commnet`)
    //   .valueChanges()
    //   .subscribe((obj) => {
    //     if (obj) {
    //      console.log("obj hai ",obj)
    //       this.comments = Object.values(obj).sort((a, b) => b.date - a.date);
          
    //       this.isLoading = false;
    //     } else {
    //       this.comments = [];
    //       this.isLoading = false;
    //     }
    //   });
    // })


     }
     openLg(content) {
      this.modalService.open(content, { size: 'lg', scrollable: true  });


          //##########################3
    if(this.mainid){
      console.log("123344",this.post.id)
    this.db.object(`/comments/${this.post.id}/comment`)
    .valueChanges().subscribe((obj)=>{
      if(obj){
        this.comments = Object.values(obj).sort((a, b) => b.date - a.date);
        this.isLoading=false
        console.log("mmmmmmmmm",this.comments)
        console.log("hhhhhhhh",this.uid)
      }else{
        
        this.comments=[];
        this.isLoading=false;
      }
    })
  }
    }

  ngOnInit(): void {
  }
  
ngOnChanges():void{
  if(this.post.vote){
    Object.values(this.post.vote).map((val:any)=>{
      if(val.upvote){
        this.upvote +=1
      }
      if(val.downvote){
        this.downvote +=1
      }
    })
  }
}


//comment
onSubmit(f:NgForm){
 const username=this.users[5]
 const userpic=this.users[6]
  const uid = uuidv4();
  const {comment}=f.form.value;
  console.log("kkkkkk",username)
  // this.auth.getUser().subscribe((user)=>{

  // })
  //  this.db.object(`/posts/${this.user.uid}/posts/${this.post.id}/comment/${uid}`)
  //   .set({
  //    comment:comment,
     
  //    username:this.users[5],
  //    picture:this.users[6]
     

    
  //   })
    
    if(!this.mainid){

      this.db.object(`/comments/${this.post.id}/comment/${uid}`).set({
        comment:comment,
        username:this.users[5],
        picture:this.users[6]

      })
    }
      else{
        this.db.object(`/comments/${this.post.id}/comment/${uid}`).set({
          comment:comment,
          username:this.users[5],
        picture:this.users[6]

          
      })
      // this.db.object(`/posts/${this.user.uid}/mycommentonother/${this.post.id}/comment/${uid}`).set({
      //   comment:comment,
      //   username:this.users[5],
      //   picture:this.users[6]

      // })
    }




}




  upvotePost(){
console.log("UPVOTING")
console.log("post.id",this.post.id)
console.log("this.user.uid",this.user)
if(!this.mainid){

this.db.object(`/posts/${this.user.uid}/posts/${this.post.id}/vote/${this.uid}`).set({
  upvote:1,
})}
this.db.object(`/posts/${this.mainid}/posts/${this.post.id}/vote/${this.uid}`).set({
  upvote:1
})
  }
  downvotePost(){
    console.log("Downvoting")
    if(!this.mainid){
    this.db.object(`/posts/${this.user.uid}/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote:1,
    })}
    this.db.object(`/posts/${this.mainid}/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote:1
    })
      }

      getInstaUrl(){
        return `https://instagram.com/${this.post.instaId}`
      }

}
