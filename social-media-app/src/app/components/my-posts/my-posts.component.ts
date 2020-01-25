import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { tap, map } from "rxjs/operators";
@Component({
  selector: "app-my-posts",
  templateUrl: "./my-posts.component.html",
  styleUrls: ["./my-posts.component.scss"]
})
export class MyPostsComponent implements OnInit {
  constructor(public db: AngularFirestore) {}
  test: any;
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user")).displayName;
    this.test = this.db
      .collection("userss", ref => ref.where("username", "==", "Pesho").limit(1))
      .snapshotChanges()
      .pipe(
        map(arr => {
          return arr.map(doc => doc.payload.doc.data());
        })
      )
      .subscribe(console.log);
    // .pipe(tap(x => console.log(x[0].payload.doc.data())))
    // .subscribe();
    // console.log(a);
  }
}
