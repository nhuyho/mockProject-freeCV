import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CVTemplate } from '../shared/models/cv-template.model';
import { User } from '../shared/models/user-list.model';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class CvTemplateService {

  userData!: User;

  userId!: string;

  userCVList!: Array<string>;

  formDataSubject = new BehaviorSubject<CVTemplate>({} as CVTemplate);

  changeTemplateFormDataSubject = new BehaviorSubject<CVTemplate>({} as CVTemplate);

  submittedFormSubject = new Subject<CVTemplate>();

  constructor(
    private ngFirestore: AngularFirestore,
    private storage: AngularFireStorage,
    private userService: UserService
    ) { }

  getTemplateDoc(id: string) {
    return this.ngFirestore.collection('templates').doc(id).valueChanges({idField: 'id'});
  }

  async addNewTemplate(template: CVTemplate) {
    // get id and cv list of current user
    this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getUserByEmail(this.userData.email)
        .pipe(
          map((users: any) => users[0])
        ).subscribe((user: any) => {
          this.userId = user.id;
          this.userCVList = user.cvList;
        });

    return this.ngFirestore.collection('templates').add(template).then((docRef) => {
      return this.ngFirestore.collection('users').doc(this.userId).update({
        cvList: [ ...this.userCVList, docRef.id ]
      });
    });
  }

  async updateTemplate(templateId: string, updatedTemplate: CVTemplate) {
    return this.ngFirestore.collection('templates').doc(templateId).update(updatedTemplate);
  }
}
