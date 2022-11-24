import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/shared/models/job.model';

@Component({
    selector: 'app-job-description-item',
    templateUrl: './job-description-item.component.html',
    styleUrls: ['./job-description-item.component.scss']
})
export class JobDescriptionItemComponent implements OnInit {
    //declare an empty array to contain job list
    @Input() jobItem!: Job;
    constructor(private jobService: JobService) { }

    ngOnInit(): void {

    }
}
