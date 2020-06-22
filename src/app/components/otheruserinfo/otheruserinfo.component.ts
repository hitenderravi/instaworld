import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otheruserinfo',
  templateUrl: './otheruserinfo.component.html',
  styleUrls: ['./otheruserinfo.component.css']
})
export class OtheruserinfoComponent implements OnInit {
  mainid=null
  user=[]
  isLoading=false
  constructor(
    private route:ActivatedRoute,
   private auth:AuthService,
    private db:AngularFireDatabase,
    private toastr:ToastrService
  ) {
    this.route.params.subscribe(params => {
      console.log("ye params",params) //log the entire params object
      console.log("hoeyhittu",params['id']) //log the value of id
    this.mainid=params['id']
    console.log("userinfo second",this.mainid)
    })

    db.object(`/users/${this.mainid}`)
    .valueChanges()
    .subscribe((obj) => {
      

      if (obj) {
       console.log("obj hai ",obj)
        this.user = Object.values(obj).sort((a, b) => b.date - a.date);
        
        this.isLoading = false;
      } else {
        toastr.error("NO post to display");
        this.user = [];
        this.isLoading = false;
      }
    });
  }
   
  
   
  ngOnInit(): void {
  }

}
