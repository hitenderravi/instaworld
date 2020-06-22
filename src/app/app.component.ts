import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email=null
  constructor(private auth:AuthService){
    auth.getUser().subscribe((user)=>{
      this.email=user?.email
    })
  }
  title = 'travelgram';
}
