import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CvEditorService } from 'src/app/services/cv-editor.service';
import { CvTemplateService } from 'src/app/services/cv-template.service';
import { BackgroundOption, CVTemplate, EditOption } from 'src/app/shared/models/cv-template.model';

@Component({
  selector: 'app-cv-template21',
  templateUrl: './cv-template21.component.html',
  styleUrls: ['./cv-template21.component.scss'],
  providers: [MessageService]
})
export class CvTemplate21Component implements OnInit, OnDestroy {

  @ViewChild('CV') cv!: ElementRef;

  @ViewChild('uploadImageInput') uploadImageInput!: ElementRef;

  cvForm!: FormGroup;

  display: any = {
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

  colorCollection: Array<BackgroundOption> = [
    {
      color: '#fcbd88',
      backgroundUrl: '',
      secondTextColor: ''
    },
    {
      color: '#bbdfc8',
      backgroundUrl: '',
      secondTextColor: ''
    },
    {
      color: '#d6dae4',
      backgroundUrl: '',
      secondTextColor: ''
    },
    {
      color: '#f4b0ae',
      backgroundUrl: '',
      secondTextColor: ''
    },
    {
      color: '#a5dfe5',
      backgroundUrl: '',
      secondTextColor: ''
    }
  ];

  editOptions = {
    themeColor: '',
    font: '',
    fontSize: '',
    lineHeight: '',
    background: '',
    secondTextColor: ''
  };

  editSubscription!: Subscription;
  displayModeSubscription!: Subscription;
  patchValueSubscription!: Subscription;
  submitSubscription!: Subscription;
  changeTemplateSubscription!: Subscription;
  languageSubscription!: Subscription;

  profileImage: string = 'https://www.topcv.vn/upload/images/avatars/no_avatar.jpg';

  isLoading: boolean = true;

  displayMode: boolean = false;

  language!: string;

  imageEditorIsOn: boolean = false;

  // Image Cropper
  imageChangedEvent: any = '';
  croppedImage: any = '/assets/images/cv-template/no_avatar.jpg';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  constructor(
    private fb: FormBuilder,
    private cvEditorService: CvEditorService,
    public translate: TranslateService,
    private cvTemplateService: CvTemplateService,
    private messageService: MessageService,
    private ngFireStore: AngularFirestore
  ) { }

  get basics() {
    return this.cvForm.get('basics') as FormGroup;
  }
  get skills() {
    return this.cvForm.get('skills') as FormArray;
  }
  get references() {
    return this.cvForm.get('references') as FormArray;
  }
  get education() {
    return this.cvForm.get('education') as FormArray;
  }
  get work() {
    return this.cvForm.get('workExperience') as FormArray;
  }
  get activities() {
    return this.cvForm.get('activities') as FormArray;
  }
  get awards() {
    return this.cvForm.get('awards') as FormArray;
  }
  get certifications() {
    return this.cvForm.get('certifications') as FormArray;
  }

  ngOnInit(): void {
    // Init form
    this.cvForm = this.fb.group({
      cvTitle: ['', Validators.required],
      title: '',
      basics: this.fb.group({
        name: ['', Validators.required],
        gender: '',
        dob: '',
        email: ['', Validators.required],
        phone: ['', Validators.required],
        link: '',
        address: ['', Validators.required],
      }),
      objective: [
        '',
        [Validators.required, Validators.maxLength(50000)],
      ],
      skills: this.fb.array([]),
      interests: ['', Validators.required],
      references: this.fb.array([]),
      additionalInformation: ['', Validators.required],
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
      activities: this.fb.array([]),
      awards: this.fb.array([]),
      certifications: this.fb.array([]),
    });
    // Get Edit options from service
    this.editSubscription = this.cvEditorService.editOptionSubject.subscribe((data) => {
      this.editOptions = { ...data };
    });
    // Get display status from service
    this.displayModeSubscription = this.cvEditorService.displayModeSubject.subscribe((data) => {
      this.displayMode = data;
    });
    // Call form submit function from service
    this.submitSubscription = this.cvEditorService.submitSubject.subscribe(() => {
      this.onFormSubmit();
    });
    // Get language from service
    this.languageSubscription = this.cvEditorService.langSubject.subscribe((data) => {
      this.language = data;
      this.translate.use(this.language);
    });
    // Pass color collection to editor component
    this.cvEditorService.colorCollectionSubject.next(this.colorCollection);
    // Toggle change template model handler
    this.changeTemplateSubscription = this.cvEditorService.toggleTemplateModelSubject.subscribe((value) => {
      if (value) {
        // Add image to form
        this.cvForm.addControl('image', new FormControl(`${this.profileImage}`));
        const currentTemplateValue = {
          ...this.cvForm.value,
          language: this.language,
          editOptions: this.editOptions,
          displayOptions: this.display,
        };
        this.cvTemplateService.changeTemplateFormDataSubject.next(currentTemplateValue as CVTemplate);
      }
    });
    // Patch value for form and editor
    this.patchValueSubscription = this.cvTemplateService.formDataSubject.subscribe((template) => {
      this.isLoading = false;
      this.onFormPatchValue(template);
      this.cvEditorService.editOptionSubject.next({
        ...template.editOptions,
        themeColor: this.colorCollection.some(data => data.color === template.editOptions.themeColor) ? template.editOptions.themeColor : this.colorCollection[0].color,
        background: this.colorCollection.some(data => data.backgroundUrl === template.editOptions.background) ? template.editOptions.background : this.colorCollection[0].backgroundUrl,
        secondTextColor: this.colorCollection.some(data => data.secondTextColor === template.editOptions.secondTextColor) ? template.editOptions.secondTextColor : this.colorCollection[0].secondTextColor
      } as EditOption);
      this.cvEditorService.changeLanguage(template.language);
      this.display = { ...template.displayOptions };
      this.cvEditorService.toggleTemplateModelSubject.next(false);
      this.cvEditorService.displayModeSubject.next(false);
    });
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.submitSubscription.unsubscribe();
    this.displayModeSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
    this.patchValueSubscription.unsubscribe();
    this.changeTemplateSubscription.unsubscribe();
  }

  //Patch value for form
  onFormPatchValue(data: CVTemplate) {
    this.skills.clear();
    this.awards.clear();
    this.activities.clear();
    this.certifications.clear();
    this.education.clear();
    this.references.clear();
    this.work.clear();
    this.profileImage = data.image || 'https://www.topcv.vn/upload/images/avatars/no_avatar.jpg';
    this.cvForm.patchValue({
      cvTitle: data.cvTitle,
      title: data.title,
      basics: data.basics,
      objective: data.objective,
      skills: data.skills.forEach((skill) => {
        const skillFormGroup = this.fb.group({
          name: [skill.name, Validators.required],
          level: [skill.level, Validators.required],
        });
        this.skills.push(skillFormGroup);
      }),
      interests: data.interests,
      references: data.references.forEach((ref) => {
        const referenceFormGroup = this.fb.group({
          name: [ref.name, Validators.required],
          reference: [ref.reference, Validators.required],
        });
        this.references.push(referenceFormGroup);
      }),
      additionalInformation: data.additionalInformation,
      education: data.education.forEach((edu) => {
        const educationFormGroup = this.fb.group({
          institution: [edu.institution, Validators.required],
          major: edu.major,
          startDate: edu.startDate,
          endDate: edu.endDate,
          summary: edu.summary,
        });
        this.education.push(educationFormGroup);
      }),
      workExperience: data.workExperience.forEach((exp) => {
        const experienceFormGroup = this.fb.group({
          name: [exp.name, Validators.required],
          position: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate,
          summary: exp.summary,
        });
        this.work.push(experienceFormGroup);
      }),
      activities: data.activities.forEach((act) => {
        const activityFormGroup = this.fb.group({
          organization: [act.organization, Validators.required],
          position: act.position,
          startDate: act.startDate,
          endDate: act.endDate,
          summary: act.summary,
        });
        this.activities.push(activityFormGroup);
      }),
      awards: data.awards.forEach((award) => {
        const awardFormGroup = this.fb.group({
          date: award.date,
          summary: [award.summary, Validators.required],
        });
        this.awards.push(awardFormGroup);
      }),
      certifications: data.certifications.forEach((cer) => {
        const certificationFormGroup = this.fb.group({
          date: cer.date,
          summary: [cer.summary, Validators.required],
        });
        this.certifications.push(certificationFormGroup);
      })
    })
  }
  // Form submit
  onFormSubmit() {
    // Remove control that is hidden
    for (let key in this.display) {
      if (!this.display[key]) {
        this.cvForm.get(key)?.disable();
      }
    }
    if (this.cvForm.valid) {
      // Add image to form
      this.cvForm.addControl('image', new FormControl(`${this.profileImage}`));
      const submittedTemplate = {
        ...this.cvForm.getRawValue(),
        editOptions: this.editOptions,
        displayOptions: this.display,
        language: this.language,
        template: 'cv-template21',
        latestUpdate: (new Date()).getTime()
      };
      this.ngFireStore
            .collection('template-item', (ref) => {
                const query: firebase.default.firestore.Query = ref;
                return query.where('template', '==', 'cv-template21');
            })
            .valueChanges()
            .subscribe((response: any) => {
              submittedTemplate.thumbnail = response[0].thumbnail
              this.cvTemplateService.submittedFormSubject.next(submittedTemplate as CVTemplate);
            });
    }
    else {
        this.messageService.add({
          severity: 'error',
          summary: 'Lưu CV không thành công',
          detail: 'Hãy kiểm tra lại các lỗi trong CV'
        });
    }
  }
  // Controller
  onAddField(form: FormArray) {
    let newValue = form.at(0).value;
    form.push(this.fb.group(newValue));
  }
  onRemoveField(form: FormArray, index: number) {
    form.removeAt(index);
  }
  reorder(form: FormArray, shift: number, currentIndex: number) {
    let newIndex: number = currentIndex + shift;
    if (newIndex === -1) {
      newIndex = form.length - 1;
    } else if (newIndex == form.length) {
      newIndex = 0;
    }
    const currentGroup = form.at(currentIndex);
    form.removeAt(currentIndex);
    form.insert(newIndex, currentGroup);
  }
  // Handle hide field
  hideField(field: string) {
    this.display[field] = !this.display[field];
  }
  // Handle toggle display
  toggleDisplayMode() {
    this.cvEditorService.toggleDisplayMode();
  }
  // Image Editor
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  onDoneEditImage() {
    this.profileImage = this.croppedImage;
    this.imageEditorIsOn = false;
  }
  onDeleteProfileImage() {
    this.imageChangedEvent = '';
    this.croppedImage = '/assets/images/cv-template/no_avatar.jpg';
  }
}
