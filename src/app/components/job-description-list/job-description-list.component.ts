import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
    selector: 'app-job-description-list',
    templateUrl: './job-description-list.component.html',
    styleUrls: ['./job-description-list.component.scss']
})
export class JobDescriptionListComponent implements OnInit {
    //declare an empty array to contain job list
    jobList: Job[] = [];

    constructor(private jobService: JobService) { }

    ngOnInit(): void {
        //Get Job list
        this.jobService.getAllJobs().subscribe(res => {
            this.jobList = res.map(job => {
                return {
                    id: job.payload.doc.id,
                    ...job.payload.doc.data() as {},
                    createAt: new Date(job.payload.doc.get('createAt')),
                    deadline: new Date(job.payload.doc.get('deadline'))
                } as Job;
            });
        });
    }
}
