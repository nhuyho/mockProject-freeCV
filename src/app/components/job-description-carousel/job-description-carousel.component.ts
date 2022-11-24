import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/shared/models/job.model';

@Component({
    selector: 'app-job-description-carousel',
    templateUrl: './job-description-carousel.component.html',
    styleUrls: ['./job-description-carousel.component.scss']
})
export class JobDescriptionCarouselComponent implements OnInit {
    //declare an empty array
    jobList: Job[] = [];
    constructor(private jobService: JobService) { }

    //custom option owl-carousel
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 600,
        navText: ['&#8249', '&#8250;'],
        autoplay: true,
        autoplayTimeout: 1500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        },
        nav: true
    };

    ngOnInit(): void {
        //Get Job
        this.jobService.getAllJobs().subscribe(res => {
            this.jobList = res.map(job => {
                return {
                    id: job.payload.doc.id,
                    ...job.payload.doc.data() as {},
                    deadline: new Date(job.payload.doc.get('deadline'))
                } as Job;
            });
        });
    }
}
