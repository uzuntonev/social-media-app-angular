import { Component, OnInit } from "@angular/core";
import { UploadService } from "src/app/posts/upload.service";
import { Upload } from "src/app/core/models/file";
import { PostService } from "src/app/posts/post.service";
import { IPost } from "src/app/core/models/post";
import { Observable } from "rxjs";
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  basePath: string = "/uploads";
  isUpload: boolean = false;
  constructor(
    private uploadService: UploadService,
    private postService: PostService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    // this.afs.ref("/uploads/Screenshot (1).png").getDownloadURL().subscribe(x =>{
    //   console.log(x)
    // })
  }

  // Create stream of data for current post and pass them to the postService

  createPost(title, description) {
    if(!this.isUpload){
      this.snackbar.open('Please upload file', "Undo", {
        duration: 3000
      })
      return;
    }
    const post: Observable<IPost> = new Observable(subscriber => {
      subscriber.next({
        id: Math.random().toString(),
        title: title,
        description: description,
        imgName: this.selectedFiles.item(0).name,
        createdOn: new Date(),
        likes: 0,
        dislikes: 0,
        comments: [],
        createdByName: JSON.parse(localStorage.getItem("user")).displayName || JSON.parse(localStorage.getItem("userData")).fullName,
        createdById: JSON.parse(localStorage.getItem("user")).uid,
        avatar: JSON.parse(localStorage.getItem("user")).photoURL || JSON.parse(localStorage.getItem("userData")).avatar
      });
    });
    this.postService.createPost(post);
  }

  // Detect file when is selected

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  // Upload file to Firebase Storage

  uploadSingle() {
    if(!this.selectedFiles){
      this.snackbar.open('Please select file', "Undo", {
        duration: 3000
      })
      return;
    }
    this.isUpload = true;
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.publishUpload(this.currentUpload);
  }
}
