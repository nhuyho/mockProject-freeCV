import { Component, Input, OnInit } from '@angular/core';
import { CvItem } from 'src/app/shared/models/cv-item.model';

@Component({
    selector: 'app-cv-item',
    templateUrl: './cv-item.component.html',
    styleUrls: ['./cv-item.component.scss'],
})
export class CvItemComponent implements OnInit {
    @Input() itemCvData!: CvItem;
    constructor() {}

    ngOnInit(): void {}
}
