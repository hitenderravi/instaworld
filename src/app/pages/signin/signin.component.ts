import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router 
  ) { }

  ngOnInit(): void {
  }
  onSubmit(f:NgForm){
    console.log("signin")
    const {email,password} =f.form.value;
    this.auth.signIn(email,password)
    .then((res)=>{
      this.toastr.success("SigninSuccess");
      this.router.navigateByUrl('/')
    })
    .catch((err)=>[
      this.toastr.error(err.message,'',{
        closeButton:true,
      })
    ])
  }

}
