import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CvEditorService } from 'src/app/services/cv-editor.service';
import { BackgroundOption } from 'src/app/shared/models/cv-template.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  isActiveVi: boolean = true;
  isActiveEn: boolean = false;

  editOptions = {
    themeColor: '',
    font: '',
    fontSize: '',
    lineHeight: '',
    background: '',
    secondTextColor: ''
  };

  colorCollection!: Array<BackgroundOption>;

  editOptionsSubscription!: Subscription;
  colorCollectionSubscription!: Subscription;

  constructor(private cvEditorService: CvEditorService) {
  }

  ngOnInit(): void {
    this.editOptionsSubscription = this.cvEditorService.editOptionSubject.subscribe((data) => {
      this.editOptions = { ...data };
    });

    this.colorCollectionSubscription = this.cvEditorService.colorCollectionSubject.subscribe((data) => {
      this.colorCollection = [ ...data ];
    });

    this.cvEditorService.langSubject.subscribe((language: string) => {
      language == 'vi' ? this.isActiveVi = true : this.isActiveVi = false;
      language == 'en' ? this.isActiveEn = true : this.isActiveEn = false;
    });
  }

  ngOnDestroy() {
    this.editOptionsSubscription.unsubscribe();
    this.colorCollectionSubscription.unsubscribe();
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    window.scrollY > 122 ? document.getElementById('cvo-toolbar')?.classList.add('fixed-toolbar') : document.getElementById('cvo-toolbar')?.classList.remove('fixed-toolbar');
  }

  exec(style: string) {
    document.execCommand(style, false);
  }
  changeColor(color: string, background: string, secondTextColor: string) {
    this.cvEditorService.editOptionSubject.next({
      ...this.editOptions,
      themeColor: color,
      background: background,
      secondTextColor: secondTextColor
    });
  }
  changeFontSize(size: string) {
    this.cvEditorService.editOptionSubject.next({ ...this.editOptions, fontSize: size });
  }
  changeLineHeight(height: string) {
    this.cvEditorService.editOptionSubject.next({ ...this.editOptions, lineHeight: height });
  }
  changeFont(e: Event) {
    const font = (e.target as HTMLSelectElement).value;
    this.cvEditorService.editOptionSubject.next({ ...this.editOptions, font: font as string });
  }
  toggleDisplayMode() {
    this.cvEditorService.toggleDisplayMode();
  }
  toggleTemplateModel() {
    this.cvEditorService.toggleTemplateModelSubject.next(!this.cvEditorService.toggleTemplateModelSubject.value);
  }
  submitForm() {
    this.cvEditorService.submitSubject.next(undefined);
  }
  changeLang(lang: string) {
    this.cvEditorService.changeLanguage(lang);
    lang == 'vi' ? this.isActiveVi = true : this.isActiveVi = false;
    lang == 'en' ? this.isActiveEn = true : this.isActiveEn = false;
  }
}
