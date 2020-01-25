import { Injectable } from "@angular/core";

import * as firebase from "firebase";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { Upload } from "../interfaces/File";
@Injectable({
  providedIn: "root"
})
export class UploadService {

  basePath: string = "/uploads";
  uploadTask: firebase.storage.UploadTask;
  constructor(private af: AngularFirestore, private db: AngularFireDatabase) {}

  publishUpload(upload: Upload) {

    
    console.log(upload);
    console.log(JSON.parse(localStorage.getItem('user')));


    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef
      .child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);
    this.uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        upload.progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => console.log(error),
      () => {
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
      }
    );
  }

  deleteUpload(upload: Upload){
    this.deleteFileData(upload.key)
    .then(() => this.deleteFileStorage(upload.name))
    .catch(error => console.error(error))
  }
  deleteFileData(key: string){
    return this.db.list(`${this.basePath}/`).remove(key)
  }
  deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }



}
