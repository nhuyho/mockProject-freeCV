import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/shared/models/job.model';

@Component({
    selector: 'app-job-description-detail',
    templateUrl: './job-description-detail.component.html',
    styleUrls: ['./job-description-detail.component.scss']
})
export class JobDescriptionDetailComponent implements OnInit {
    jobDetail!: Job;
    jobId!: string;
    jobRef: any;
    constructor(private jobDetailService: JobService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.jobDetailService.getJobDetails(id!).subscribe((res) => {
            this.jobRef = res;
            this.jobDetail = {
                ...this.jobRef,
                deadline: new Date(this.jobRef.deadline).toDateString(),
                createAt: new Date(this.jobRef.createAt).toDateString()
            };
        });
    }
}
