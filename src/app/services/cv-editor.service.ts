import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BackgroundOption, EditOption } from '../shared/models/cv-template.model';

@Injectable({
  providedIn: 'root'
})
export class CvEditorService {

  language = 'vi';

  langSubject = new Subject<string>();

  colorCollectionSubject = new Subject<Array<BackgroundOption>>();

  editOptionSubject = new BehaviorSubject<EditOption>({
    themeColor: '',
    font: '',
    fontSize: '',
    lineHeight: '',
    background: '',
    secondTextColor: ''
  });

  displayModeSubject = new BehaviorSubject<boolean>(false);

  toggleTemplateModelSubject = new BehaviorSubject<boolean>(false);

  submitSubject = new Subject<any>();

  constructor() {}

  getDisplayMode() {
    return this.displayModeSubject.value;
  }
  toggleDisplayMode() {
    this.displayModeSubject.next(!this.displayModeSubject.value);
  }
  changeLanguage(lang: string){
    this.language = lang;
    this.langSubject.next(this.language);
  }
}
