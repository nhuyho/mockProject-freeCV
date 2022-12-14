import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CvEditorService } from 'src/app/services/cv-editor.service';
import { CvTemplateService } from 'src/app/services/cv-template.service';
import { CVTemplate, DisplayOption, EditOption } from 'src/app/shared/models/cv-template.model';
import { ClonedTemplateComponent } from '../cloned-template/cloned-template.component';
import { CvTemplate15Component } from '../cv-template15/cv-template15.component';
import { CvTemplate18Component } from '../cv-template18/cv-template18.component';
import { CvTemplate21Component } from '../cv-template21/cv-template21.component';
import { CvTemplate22Component } from '../cv-template22/cv-template22.component';
import { CvTemplate31Component } from '../cv-template31/cv-template31.component';
import { CvTemplate33Component } from '../cv-template33/cv-template33.component';
import { CvTemplate43Component } from '../cv-template43/cv-template43.component';
import { SampleTemplateComponent } from '../sample-template/sample-template.component';
import { CvTemplate20Component } from './../cv-template20/cv-template20.component';

@Component({
    selector: 'app-create-template-holder',
    templateUrl: './create-template-holder.component.html',
    styleUrls: ['./create-template-holder.component.scss']
})
export class CreateTemplateHolderComponent implements OnInit, OnDestroy {

  templateComponent!: any;

  formSubmitted: boolean = false;

  toggleTemplateModel: boolean = false;

  modelName: string = this.route.snapshot.params.model;

  templateCollection: Array<any> = [];

  submitTemplateSubscription!: Subscription;

  editOptions: EditOption = {
    themeColor: '',
    font: 'Roboto',
    fontSize: 'medium',
    lineHeight: '1.2',
    background: '',
    secondTextColor: ''
  };

  displayOptions: DisplayOption = {
    objective: true,
    skills: true,
    references: true,
    education: true,
    workExperience: true,
    activities: true,
    awards: true,
    certifications: true,
    interests: true,
    additionalInformation: true,
  };

  cvForm = this.fb.group({
    cvTitle: 'Untitled CV',
    title: 'Staff',
    basics: this.fb.group({
      name: ['Chandler Bing', Validators.required],
      gender: 'Nam',
      dob: '01/11/1998',
      email: 'a@gmail.com',
      phone: '0123456',
      link: 'facebook.com',
      address: '12 Chu V??n An',
    }),
    objective: [
      '??p d???ng nh???ng kinh nghi???m v??? k??? n??ng b??n h??ng v?? s??? hi???u bi???t v??? th??? tr?????ng ????? tr??? th??nh m???t nh??n vi??n b??n h??ng chuy??n nghi???p, mang ?????n nhi???u gi?? tr??? cho kh??ch h??ng. T??? ???? gi??p C??ng ty t??ng s??? l?????ng kh??ch h??ng v?? m??? r???ng t???p kh??ch h??ng.',
      [Validators.required, Validators.maxLength(50000)],
    ],
    skills: this.fb.array([
      this.fb.group({
        name: 'Microsoft Office',
        level: 'Th??nh th???o',
      }),
    ]),
    interests: 'Netflix and Chill',
    references: this.fb.array([
      this.fb.group({
        name: 'Mr. Joey - Marketing Manager',
        reference: '??i???n tho???i: 0123456',
      }),
    ]),
    additionalInformation: 'Have a cat',
    education: this.fb.array([
      this.fb.group({
        institution: 'FPT Software',
        major: 'FrontEnd',
        startDate: '09/2021',
        endDate: '10/2021',
        summary: 'T???t nghi???p lo???i Gi???i, ??i???m trung b??nh 8.0',
      }),
    ]),
    workExperience: this.fb.array([
      this.fb.group({
        name: 'C??ng ty TOPCV',
        position: 'CFO',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        summary:
          'H??? tr??? vi???t b??i qu???ng c??o s???n ph???m qua k??nh facebook, c??c forum,...Gi???i thi???u, t?? v???n s???n ph???m, gi???i ????p c??c v???n ????? th???c m???c c???a kh??ch h??ng qua ??i???n tho???i v?? email.',
      }),
      this.fb.group({
        name: 'C??ng ty FPTSoftware',
        position: 'CEO',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        summary:
          'H??? tr??? vi???t b??i qu???ng c??o s???n ph???m qua k??nh facebook, c??c forum,...Gi???i thi???u, t?? v???n s???n ph???m, gi???i ????p c??c v???n ????? th???c m???c c???a kh??ch h??ng qua ??i???n tho???i v?? email.',
      }),
    ]),
    activities: this.fb.array([
      this.fb.group({
        organization: 'Nh??m t??nh nguy???n TOPCV',
        position: 'Volunteer',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        summary:
          'Chia s???, ?????ng vi??n h??? v?????t qua giai ??o???n kh?? kh??n, gi??p h??? c?? nh???ng suy ngh?? l???c quan.',
      }),
    ]),
    awards: this.fb.array([
      this.fb.group({
        date: '2014',
        summary: 'Nh??n vi??n xu???t s???c n??m c??ng ty TOPCV',
      }),
    ]),
    certifications: this.fb.array([
      this.fb.group({
        date: '2014',
        summary: 'Nh??n vi??n xu???t s???c n??m c??ng ty TOPCV',
      }),
    ]),
  });

  // sample template data
  templateObject: CVTemplate = {
    ...this.cvForm.value,
    editOptions: { ...this.editOptions },
    displayOptions: { ...this.displayOptions },
    language: 'vi'
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cvTemplateService: CvTemplateService,
    private cvEditorService: CvEditorService,
    private ngFireStore: AngularFirestore
  ) { }

  @HostListener('window:click', []) onCloseButtonClicked() {
    document.getElementsByClassName('p-dialog-header-close').item(0)?.addEventListener('click', () => {
      this.cvEditorService.toggleTemplateModelSubject.next(false);
    })
}

  ngOnInit(): void {
    // load sample data to template
    this.loadFormValue(this.modelName, this.templateObject);

    // submit form handler
    this.submitTemplateSubscription = this.cvTemplateService.submittedFormSubject.pipe(first()).subscribe((data) => {
      this.cvTemplateService.addNewTemplate(data);
    });

    // change template model handler
    this.cvEditorService.toggleTemplateModelSubject.subscribe((value) => {
      if (value) {
          this.templateCollection.length ||
              this.ngFireStore
                  .collection('template-item')
                  .valueChanges()
                  .subscribe((collection: Array<any>) => {
                      this.templateCollection = Array.from(
                          { length: Number(collection.length / 3 + 1) },
                          () => collection.splice(0, 3)
                      );
                  });
      }
      this.toggleTemplateModel = value;
  });
  }

  ngOnDestroy() {
    this.submitTemplateSubscription.unsubscribe();
    console.log(this.cvTemplateService.formDataSubject.value)
  }

  loadFormValue(model: string, template: CVTemplate): void {
    switch(model) {
      case 'sample-template':
        this.templateComponent = SampleTemplateComponent;
        break;
      case 'cv-template15':
        this.templateComponent = CvTemplate15Component;
        break;
      case 'cv-template18':
          this.templateComponent = CvTemplate18Component;
          break;
      case 'cv-template20':
          this.templateComponent = CvTemplate20Component;
          break;
      case 'cv-template21':
        this.templateComponent = CvTemplate21Component;
        break;
      case 'cv-template22':
        this.templateComponent = CvTemplate22Component;
        break;
      case 'cv-template31':
        this.templateComponent = CvTemplate31Component;
        break;
      case 'cv-template33':
        this.templateComponent = CvTemplate33Component;
        break;
      case 'cv-template43':
          this.templateComponent = CvTemplate43Component;
          break;
      default: this.templateComponent = ClonedTemplateComponent;
    }

    this.cvTemplateService.formDataSubject.next({ ...template, template: model } as CVTemplate);
  }

  onChangeTemplate(model: string): void {
    this.loadFormValue(
        model,
        this.cvTemplateService.changeTemplateFormDataSubject.value
    );
}
}