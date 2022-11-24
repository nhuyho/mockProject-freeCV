import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import {
    Job,
    Place,
    Status,
    Technology,
    Work,
} from 'src/app/shared/models/job.model';

@Component({
    selector: 'app-admin-job-list',
    templateUrl: './admin-job-list.component.html',
    styleUrls: ['./admin-job-list.component.scss'],
})
export class AdminJobListComponent implements OnInit {
    jobList!: Job[];

    searchList!: Job[];

    cloneJob: { [id: string]: Job } = {};

    technology!: Technology[];

    work!: Work[];

    place!: Place[];

    searchText!: string;

    selectedPlace!: Place;

    selectedWork!: Work;

    selectedTechnology!: Technology;

    updateForm!: FormGroup;

    displayModal!: boolean;

    jobDetail!: Job;

    currentId!: any;

    constructor(
        private jobService: JobService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {

        this.updateForm = this.fb.group({
            title: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(200)]],
            createAt: [''],
            deadline: [''],
        });

        this.place = [
            { name: 'TP HCM', value: 'tphcm' },
            { name: 'Hà Nội', value: 'hà nội' },
            { name: 'Đà Nẵng', value: 'đà nẵng' },
            { name: 'Cần Thơ', value: 'cần thơ' },
            { name: 'Quy Nhơn', value: 'quy nhơn' },
        ];

        this.technology = [
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
            { name: 'Golang', value: 'golang' },
            {name: 'React', value: 'react'}
        ];

        this.jobService.getAllJobs().subscribe((res) => {
            this.jobList = res.map((job) => {
                return {
                    id: job.payload.doc.id,
                    ...(job.payload.doc.data() as {}),
                    createAt: new Date(job.payload.doc.get('createAt')),
                    deadline: new Date(job.payload.doc.get('deadline')),
                } as Job;
            });
            this.searchList = [...this.jobList];
        });
    }

    onSearch() {
        let text = this.searchText.toLocaleLowerCase().trim();
        let newArr = this.searchList.filter((item) => {
            if (text === null || text === '') return this.jobList;
            return item.title.toLocaleLowerCase().includes(text);
        });
        this.jobList = newArr;
    }

    editJob(job: Job) {
        this.displayModal = true;
        this.cloneJob[job.id] = { ...job };
        this.updateForm.controls['title'].setValue(job.title);
        this.updateForm.controls['createAt'].setValue(job.createAt);
        this.updateForm.controls['deadline'].setValue(job.deadline);
        this.currentId = job.id;
    }

    onSave() {
        const indexJob = this.jobList.findIndex(
            (job) => job.id === this.currentId
        );
        let objJob = this.jobList[indexJob];
        objJob.createAt = new Date(objJob.createAt).getTime();
        objJob.deadline = new Date(objJob.createAt).getTime();
        this.jobService.updateJob(this.currentId, objJob);
        this.displayModal = false;
    }

    get form(): any {
        return this.updateForm.controls;
     }
}
