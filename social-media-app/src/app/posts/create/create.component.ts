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
export class CreateComponent {
  currentUpload: Upload;
  private _selectedFiles: FileList;
  private _isUpload: boolean = false;
  private _userData: IUser;

  constructor(
    private uploadService: UploadService,
    private postService: PostService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
    this._userData = this.authService.userData;
  }

  // Create post
  createPost(title, description) {
    if (!this._isUpload) {
      this.snackbar.open("Please upload file", "Undo", {
        duration: 3000
      });
      return;
    }
    const post: IPost = {
      id: Math.random().toString(),
      avatar: this._userData.avatar,
      createdOn: new Date(),
      createdByName: this._userData.name,
      createdById: this._userData.id,
      title: title,
      description: description,
      imgName: this._selectedFiles.item(0).name,
      imageLink: null,
      likes: 0,
      dislikes: 0
    };

    this.postService.createPost(post);
  }

  // Detect file when is selected

  detectFiles(event) {
    this._selectedFiles = event.target.files;
  }

  // Upload file to Firebase Storage

  uploadSingle() {
    if (!this._selectedFiles) {
      this.snackbar.open("Please select file", "Undo", {
        duration: 3000
      });
      return;
    }
    this._isUpload = true;
    const file = this._selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.publishUpload(this.currentUpload);
  }
}
