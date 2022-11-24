import { CVTemplate } from 'src/app/shared/models/cv-template.model';
import { CvTemplateService } from 'src/app/services/cv-template.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cv-item',
  templateUrl: './user-cv-item.component.html',
  styleUrls: ['./user-cv-item.component.scss']
})
export class UserCvItemComponent implements OnInit {

  @Input() cvItem!: string;

  cvTemplate: CVTemplate = {} as CVTemplate;

  opened: boolean = false;

  constructor(private cvTemplateService: CvTemplateService) { }

  ngOnInit(): void {
    this.cvTemplateService.getTemplateDoc(this.cvItem).subscribe((response: any) => {
      this.cvTemplate = response;
    });
  }
  openDialog(){
    this.opened = true;
  }
  closeDialog(){
    this.opened = false;
  }

}
