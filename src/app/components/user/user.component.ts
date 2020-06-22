import { Component, OnInit ,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
@Input() user;
userid=null
  constructor(
    private auth:AuthService,
    private router:Router
  ) {
    
   }

  ngOnInit(): void {
  }
 show(){
   this.auth.getUser().subscribe((user)=>{
     console.log("show",user.uid)
    

   })
   
   this.userid=this.user.id;
   console.log("shhghow",this.userid)
  
   this.router.navigate(['/other', this.userid])
   
 }

}
