import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CvItem } from 'src/app/shared/models/cv-item.model';
import { CvListService } from 'src/app/services/cv-list.service';

@Component({
    selector: 'app-cv-carousel',
    templateUrl: './cv-carousel.component.html',
    styleUrls: ['./cv-carousel.component.scss']
})
export class CvCarouselComponent implements OnInit {
    listCvData!: CvItem[];
    constructor(private cvListService: CvListService) { }

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
        this.cvListService.getDataCvList().subscribe((data) => {
            this.listCvData = data;
        });
    }

}
