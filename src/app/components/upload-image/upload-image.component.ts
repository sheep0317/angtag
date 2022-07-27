import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  selectedImage: any;
  imageSrc: any = '';
  constructor(
    private storage: AngularFireStorage,

  ) { }

  ngOnInit(): void {
  }
  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    }
    reader.readAsDataURL(file);
    this.selectedImage = file;
    console.log(this.selectedImage.name);

  }
  uploadImage() {
    var path = `imageAvatar/avatar_${new Date().getTime()}`;
    var fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, this.selectedImage).snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            alert('Uploaded Successfully');
          })
        })
      )
      .subscribe();
  }
}
