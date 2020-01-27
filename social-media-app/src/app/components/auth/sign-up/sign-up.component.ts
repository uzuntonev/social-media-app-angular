import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  avatars: { value: string; link: string }[] = [
    {
      value: "Man",
      link:
        "https://firebasestorage.googleapis.com/v0/b/social-media-app-d9005.appspot.com/o/uploads%2Favatars%2Favatar-man.png?alt=media&token=a7d32970-51c7-4ace-8836-62f16ec0c8e0"
    },
    {
      value: "Women",
      link:
        "https://firebasestorage.googleapis.com/v0/b/social-media-app-d9005.appspot.com/o/uploads%2Favatars%2Favatar-women.png?alt=media&token=c5bde9f2-0379-4737-b784-b9fbbc40e9ce"
    }
  ];
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
