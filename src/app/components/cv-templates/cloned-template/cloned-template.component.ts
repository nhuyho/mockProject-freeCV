import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { CvEditorService } from 'src/app/services/cv-editor.service';
@Component({
  selector: 'app-cloned-template',
  templateUrl: './cloned-template.component.html',
  styleUrls: ['./cloned-template.component.scss']
})
export class ClonedTemplateComponent implements OnInit, OnDestroy {

  @ViewChild('CV') cv!: ElementRef;

  @ViewChild('uploadImageInput') uploadImageInput!: ElementRef;

  cvForm!: FormGroup;

  display: any = {
    objective: true,
    skills: true,
    references: true,
    education: true,
    work: true,
    activities: true,
    awards: true,
    certifications: true,
    interests: false,
    additionalInformation: false,
  };

  editOptions = {
    themeColor: '',
    font: '',
    fontSize: '',
    lineHeight: ''
  };

  editSubscription! : Subscription;
  displayModeSubscription! : Subscription;
  submitSubscription! : Subscription;

  profileImage: string = 'https://www.topcv.vn/upload/images/avatars/no_avatar.jpg';

  displayMode: boolean = false;

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
    private cvEditorService: CvEditorService
  ) {}

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
    // Get Edit options from service
    this.editSubscription = this.cvEditorService.editOptionSubject.subscribe((data) => {
      this.editOptions.themeColor = data.themeColor;
      this.editOptions.font = data.font;
      this.editOptions.fontSize = data.fontSize;
      this.editOptions.lineHeight = data.lineHeight;
    });
    
    // Get sort status from service
    this.displayModeSubscription = this.cvEditorService.displayModeSubject.subscribe((data)=>{
      this.displayMode = data;
    });
    this.submitSubscription = this.cvEditorService.submitSubject.subscribe(() => {
      this.onFormSubmit();
    });
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
    this.submitSubscription.unsubscribe();
    this.displayModeSubscription.unsubscribe();
    console.log('cal')
  }

  // Form submit
  onFormSubmit() {
    // Remove control that is hidden
    for(let key in this.display){
      if(!this.display[key]){
        this.cvForm.removeControl(key);
      }
    }
    // Add image to form
    this.cvForm.addControl('image', new FormControl(`${this.profileImage}`));
    console.log(this.cvForm);
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
  toggleDisplayMode(){
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
