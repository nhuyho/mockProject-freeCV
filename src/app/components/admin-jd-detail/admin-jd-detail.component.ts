import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/shared/models/job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { REGEX_ONLY_NUMBER } from 'src/app/app.constants';

@Component({
    selector: 'app-admin-jd-detail',
    templateUrl: './admin-jd-detail.component.html',
    styleUrls: ['./admin-jd-detail.component.scss'],
})
export class AdminJdDetailComponent implements OnInit {
    /*
        @param htmlContent: Get data from editor
        @param contentDecoded: Decode content of data get from editor
        @param detailForm: Save data of form fields
        @param jdDetailData: Save data admin entry or edit job details
        @param deadline: Initialize initial value for deadline
        @param jobDetail: Save job detail data from firebase
        @param isEdit: Check when click edit button
        @param jobId: Get job ID in url
    */
    htmlContent = '';
    contentDecoded = this.decodeHtml(this.htmlContent);
    detailForm!: FormGroup;
    jdDetailData: { [key: string]: any } = {};
    fileImage!: File | null;
    deadline = new Date(Date.now());
    jobDetail!: Job;
    jobRef!: any;
    isEdit = false;
    technologys = [
        { name: 'Java', value: 'java' },
        { name: 'Angular', value: 'angular' },
        { name: 'Python', value: 'python' },
        { name: 'Android', value: 'android' },
        { name: '.NET', value: '.net' },
        { name: 'Front End', value: 'front end' },
        { name: 'Node JS', value: 'node js' },
        { name: 'C/C++', value: 'c/c++' },
        { name: 'Testing', value: 'testing' },
        { name: 'IOS', value: 'ios' },
        { name: 'C/Embedded', value: 'c/embedded' },
        { name: 'Khác', value: 'khác' },
        { name: 'BA', value: 'ba' },
        { name: 'Golang', value: 'golang' }
    ];
    jobId!: string | null;

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'comic-sans-ms', name: 'Comic Sans MS' },
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText',
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            }
        ]
    };

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private jobService: JobService,
        private route: ActivatedRoute,
        private routeNavigate: Router
    ) {}

    ngOnInit(): void {
        this.jobId = this.route.snapshot.paramMap.get('id');

        if (this.jobId) {
            this.getInfoJob();
            this.isEdit = false;
        } else {
            this.isEdit = true;
        }

        this.detailForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200), this.jobService.validateSpaceInput]],
            thumbnail: [null, Validators.required],
            location: ['hà nội'],
            quantity: [1, [Validators.required, Validators.pattern(REGEX_ONLY_NUMBER)]],
            deadline: [
                formatDate(this.deadline, 'yyyy-MM-dd', 'en'),
                Validators.required,
            ],
            technology: ['java']
        });
    }

    //Get Jd detail data from firebase
    getInfoJob() {
        this.jobService.getJobDetails(this.jobId!).subscribe((res) => {
            //add res from firebase
            this.jobRef = res;
            this.jobDetail = {
                ...this.jobRef,
                deadline: new Date(this.jobRef.deadline).toDateString(),
                createAt: new Date(this.jobRef.createAt).toDateString()
            };

            //add init data for form
            this.detailForm.patchValue({
                title: this.jobDetail.title,
                thumbnail: this.jobDetail.thumbnail,
                location: this.jobDetail.location,
                quantity: this.jobDetail.quantity,
                deadline: formatDate(
                    this.jobDetail.deadline,
                    'yyyy-MM-dd',
                    'en'
                ),
                technology: this.jobDetail.technology
            });

            this.htmlContent = this.jobDetail.content;
        });
    }

    //Save JD detail data after edit or after fields
    onSaveJobDetail() {
        if (this.detailForm.valid && this.jobService.decodeHTMLEntities(this.htmlContent) !== '') {
            if(this.jobId) {
                this.onUpdateJob();
            } else {
                this.onCreateJob();
            }

            this.toastr.success('Save successfully');
        } else {
            this.toastr.warning('Input fields cannot be left blank');
        }
    }

    // In case of updating job details
    onUpdateJob() {
        //add data into object
            this.jdDetailData.title = this.detailForm.value.title.trim();
            this.detailForm.value.thumbnail !== this.jobDetail.thumbnail ? this.jdDetailData.thumbnail = this.jobService.urlImageFire : this.jdDetailData.thumbnail = this.jobDetail.thumbnail;
            this.jdDetailData.workingForm = 'full-time';
            this.jdDetailData.salaryMin = 5500000;
            this.jdDetailData.salaryMax = 6500000;
            this.jdDetailData.exp = 'Không yêu cầu';
            this.jdDetailData.location = this.detailForm.value.location;
            this.jdDetailData.content = this.decodeHtml(this.htmlContent);
            this.jdDetailData.createAt = new Date().getTime();
            this.jdDetailData.quantity = this.detailForm.value.quantity;
            this.jdDetailData.technology = this.detailForm.value.technology;
            this.jdDetailData.deadline = new Date(
                this.detailForm.value.deadline
            ).getTime();

            this.jobService.updateJobDetail(this.jobId!, this.jdDetailData);
    }

    // In case of create new job
    onCreateJob() {
        //add data into object
        this.jdDetailData.title = this.detailForm.value.title.trim();
        this.jdDetailData.thumbnail = this.jobService.urlImageFire;
        this.jdDetailData.workingForm = 'full-time';
        this.jdDetailData.salaryMin = 5500000;
        this.jdDetailData.salaryMax = 6500000;
        this.jdDetailData.exp = 'Không yêu cầu';
        this.jdDetailData.location = this.detailForm.value.location;
        this.jdDetailData.content = this.decodeHtml(this.htmlContent);
        this.jdDetailData.createAt = new Date().getTime();
        this.jdDetailData.quantity = this.detailForm.value.quantity;
        this.jdDetailData.technology = this.detailForm.value.technology;
        this.jdDetailData.deadline = new Date(
            this.detailForm.value.deadline
        ).getTime();

        this.jobService.createJob(this.jdDetailData);
    }

    //Decode for htmlContent
    decodeHtml(dataHtml: string) {
        let txt = document.createElement('textarea');
        txt.innerHTML = dataHtml;
        return txt.value;
    }

    //handle upload thumbnail
    onFileThumbnailChange(event: any) {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [filethumbnail] = event.target.files;

            this.fileImage = filethumbnail;

            reader.readAsDataURL(filethumbnail);
            reader.onload = (e: any) => {
                this.detailForm.patchValue({
                    thumbnail: e.target.result
                });
            };

            // Save the image to storage and get the image link
            this.jobService.saveImageToStorage(this.fileImage);
        }
    }

    clickEdit() {
        this.isEdit = true;
    }

    clickCancel() {
        this.isEdit = false;
    }

    // Handle save when click go back button
    onSaveChange() {
        if (this.detailForm.value.title && this.detailForm.value.quantity && this.jobService.decodeHTMLEntities(this.htmlContent) !== '') {
            if(this.jobId) {
                this.onUpdateJob();
                this.routeNavigate.navigate(['/admin/jobs']);

            } else {
                this.onCreateJob();
                this.routeNavigate.navigate(['/admin/jobs']);
            }
        } else {
            this.toastr.warning('Input fields cannot be left blank');
        }
    }
}
