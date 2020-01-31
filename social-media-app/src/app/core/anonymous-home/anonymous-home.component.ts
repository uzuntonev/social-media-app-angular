import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-home',
  templateUrl: './anonymous-home.component.html',
  styleUrls: ['./anonymous-home.component.scss']
})
export class AnonymousHomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    if(authService.isLoggedIn){
      router.navigate(['posts'])
    }
  }

  ngOnInit() {
  }

}
