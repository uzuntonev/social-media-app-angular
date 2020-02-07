import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-home',
  templateUrl: './anonymous-home.component.html',
  styleUrls: ['./anonymous-home.component.scss']
})
export class AnonymousHomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    if(this.authService.isLoggedIn){
      this.router.navigate(['post', 'list'])
    }
  }

  ngOnInit() {
  }

}
