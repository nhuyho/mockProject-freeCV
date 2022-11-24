import { Component, OnInit } from '@angular/core';
import { CvItem } from 'src/app/shared/models/cv-item.model';
import { CvListService } from 'src/app/services/cv-list.service';

@Component({
    selector: 'app-cv-list',
    templateUrl: './cv-list.component.html',
    styleUrls: ['./cv-list.component.scss'],
})
export class CvListComponent implements OnInit {
    listCvData!: CvItem[];
    constructor(private cvListService: CvListService) {}

    ngOnInit(): void {
        this.cvListService.getDataCvList().subscribe((data) => {
            this.listCvData = data;
        });
    }
}
