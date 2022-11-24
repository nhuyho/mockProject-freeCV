import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { User } from '../shared/models/user-list.model';

import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService { 
  downloadURL!: Observable<string>;
  urlImage!: string;

  constructor(
     private ngFirestore: AngularFirestore,
     private storage: AngularFireStorage
  ){}

  getUserDoc(id: string) {
    return this.ngFirestore.collection('users').doc(id).valueChanges();
  }

  getUserList() {
    return this.ngFirestore.collection('users').snapshotChanges();
  }

  getUserByEmail(email: string)  {
    return this.ngFirestore.collection('users', ref => {
      let query: firebase.default.firestore.Query = ref;
      return query.where('email', '==', email);
    }).valueChanges({ idField: 'id' });
  }

  updateImage(fileImage: File) {
    const dateNow = Date.now();
    const filePath = `images/users/avatar/${dateNow}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload( `images/users/avatar/${dateNow}`, fileImage);

    task.snapshotChanges().pipe(
        finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
                this.urlImage = url;
            });
        })
    ).subscribe(url => {
        return url ? url : null;
    });
  }

  updateUser(user: User, id: string) {
    return this.ngFirestore.collection('users').doc(id).update({
      fullName: user.fullName,
      gender: user.gender,
      dayOfBirth: new Date(user.dayOfBirth).getTime() ,
      email: user.email,
      phone: user.phone,
      note: user.note,
      avatar: user.avatar,
      status: user.status,
    });
  };
}