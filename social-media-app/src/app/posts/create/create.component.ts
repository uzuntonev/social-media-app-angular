import { Component, OnInit } from "@angular/core";
import { UploadService } from "../services/upload.service";
import { Upload } from "../../shared/models/file";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/models/post";
import { MatSnackBar } from "@angular/material";
import { AuthService } from "../../auth/services/auth.service";
import { IUser } from "../../shared/models/user";

@Component({
  selector: "app-create-post",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  isUpload: boolean = false;
  private userData: IUser;
  private afUserData: any;
  constructor(
    private uploadService: UploadService,
    private postService: PostService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
    this.userData = this.authService.userData;
    this.afUserData = this.authService.afUserData;
  }

  ngOnInit() {}

  // Create stream of data for current post and pass them to the postService

  createPost(title, description) {
    if (!this.isUpload) {
      this.snackbar.open("Please upload file", "Undo", {
        duration: 3000
      });
      return;
    }
    const post: IPost = {
      id: Math.random().toString(),
      title: title,
      description: description,
      imgName: this.selectedFiles.item(0).name,
      createdOn: new Date(),
      likes: 0,
      dislikes: 0,
      createdByName: this.afUserData.displayName || this.userData.name,
      createdById: this.afUserData.uid,
      avatar: this.afUserData.photoURL || this.userData.avatar
    };

    this.postService.createPost(post);
  }

  // Detect file when is selected

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  // Upload file to Firebase Storage

  uploadSingle() {
    if (!this.selectedFiles) {
      this.snackbar.open("Please select file", "Undo", {
        duration: 3000
      });
      return;
    }
    this.isUpload = true;
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.publishUpload(this.currentUpload);
  }
}
