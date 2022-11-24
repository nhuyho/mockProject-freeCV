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
      address: '12 Chu Văn An',
    }),
    objective: [
      'Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về thị trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng khách hàng và mở rộng tập khách hàng.',
      [Validators.required, Validators.maxLength(50000)],
    ],
    skills: this.fb.array([
      this.fb.group({
        name: 'Microsoft Office',
        level: 'Thành thạo',
      }),
    ]),
    interests: 'Netflix and Chill',
    references: this.fb.array([
      this.fb.group({
        name: 'Mr. Joey - Marketing Manager',
        reference: 'Điện thoại: 0123456',
      }),
    ]),
    additionalInformation: 'Have a cat',
    education: this.fb.array([
      this.fb.group({
        institution: 'FPT Software',
        major: 'FrontEnd',
        startDate: '09/2021',
        endDate: '10/2021',
        summary: 'Tốt nghiệp loại Giỏi, điểm trung bình 8.0',
      }),
    ]),
    workExperience: this.fb.array([
      this.fb.group({
        name: 'Công ty TOPCV',
        position: 'CFO',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        summary:
          'Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,...Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.',
      }),
      this.fb.group({
        name: 'Công ty FPTSoftware',
        position: 'CEO',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        summary:
          'Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các forum,...Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của khách hàng qua điện thoại và email.',
      }),
    ]),
    activities: this.fb.array([
      this.fb.group({
        organization: 'Nhóm tình nguyện TOPCV',
        position: 'Volunteer',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        summary:
          'Chia sẻ, động viên họ vượt qua giai đoạn khó khăn, giúp họ có những suy nghĩ lạc quan.',
      }),
    ]),
    awards: this.fb.array([
      this.fb.group({
        date: '2014',
        summary: 'Nhân viên xuất sắc năm công ty TOPCV',
      }),
    ]),
    certifications: this.fb.array([
      this.fb.group({
        date: '2014',
        summary: 'Nhân viên xuất sắc năm công ty TOPCV',
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