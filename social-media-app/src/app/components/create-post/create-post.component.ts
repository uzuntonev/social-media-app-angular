import { Component, OnInit} from "@angular/core";

import { UploadService } from "src/app/core/services/upload.service";
import { Upload } from "src/app/core/interfaces/File";
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;
  basePath: string = "/uploads";
  constructor(private uploadService: UploadService, public db: AngularFireDatabase) {}

  ngOnInit() {
    const storageRef = firebase.storage().ref()
    storageRef.child('/uploads/Screenshot (1).png').getDownloadURL().then(url => {
      console.log(url);
    })
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.uploadService.publishUpload(this.currentUpload);
  }

  createPost(){

  }

}
