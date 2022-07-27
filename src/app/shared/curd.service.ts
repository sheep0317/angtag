import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { updateProfile } from '@firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class CurdService {

  constructor(
    private afs: AngularFirestore
  ) { }
  editProfile(profileForm: any, user: any){
    updateProfile(user, {
      displayName: profileForm.name,
      photoURL: profileForm.avatar,
    }).then( () => {
      alert('Profile updated');
    }, (error: any) => {
      alert(error.message);
    });
  }
  createNewRecord(collection: string, document:any, record: any) {
    return this.afs.collection(collection).doc(document).set(record);
  }
  readAllRecords(collection: string) {
    return this.afs.collection(collection).snapshotChanges();
  }
  readOneRecord(collection: string, id: string) {
    return this.afs.doc(`${collection}/${id}`).valueChanges();
  }
  updateRecord(collection: string, id: string, record: any) {
    return this.afs.doc(`${collection}/${id}`).update(record);
  }
  deleteRecord(collection: string, id: string) {
    return this.afs.doc(`${collection}/${id}`).delete();
  }
}
