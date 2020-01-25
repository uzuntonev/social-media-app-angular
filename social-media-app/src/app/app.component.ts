import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "social-media-app";


  items: Observable<any[]>;
  constructor(public authService: AuthService) {
   
  }

  ngOnInit() {

    
  }
}
