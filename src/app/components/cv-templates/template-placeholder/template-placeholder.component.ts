import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CvEditorService } from 'src/app/services/cv-editor.service';
import { CvTemplateService } from 'src/app/services/cv-template.service';
import { CVTemplate } from 'src/app/shared/models/cv-template.model';
import { ClonedTemplateComponent } from '../cloned-template/cloned-template.component';
import { CvTemplate15Component } from '../cv-template15/cv-template15.component';
import { CvTemplate18Component } from '../cv-template18/cv-template18.component';
import { CvTemplate21Component } from '../cv-template21/cv-template21.component';
import { CvTemplate22Component } from '../cv-template22/cv-template22.component';
import { CvTemplate31Component } from '../cv-template31/cv-template31.component';
import { CvTemplate33Component } from '../cv-template33/cv-template33.component';
import { CvTemplate43Component } from '../cv-template43/cv-template43.component';
import { SampleTemplateComponent } from '../sample-template/sample-template.component';
import { CvTemplate20Component } from './../cv-template20/cv-template20.component';

@Component({
    selector: 'app-template-placeholder',
    templateUrl: './template-placeholder.component.html',
    styleUrls: ['./template-placeholder.component.scss']
})
export class TemplatePlaceholderComponent implements OnInit, OnDestroy {
    templateComponent!: any;

    formSubmitted: boolean = false;

    templateId: string = this.route.snapshot.params.id;

    toggleTemplateModel!: boolean;

    templateCollection: Array<any> = [];

    submitTemplateSubscription!: Subscription;

    constructor(
        private cvTemplateService: CvTemplateService,
        private cvEditorService: CvEditorService,
        private route: ActivatedRoute,
        private ngFireStore: AngularFirestore
    ) {}

    @HostListener('window:click', []) onCloseButtonClicked() {
        document.getElementsByClassName('p-dialog-header-close').item(0)?.addEventListener('click', () => {
          this.cvEditorService.toggleTemplateModelSubject.next(false);
        })
    }

    ngOnInit(): void {
        this.cvTemplateService
            .getTemplateDoc(this.templateId)
            .pipe(first())
            .subscribe((template) => {
                this.loadFormValue(
                    (template as CVTemplate).template,
                    template as CVTemplate
                );
            });

        // submit form handler
        this.submitTemplateSubscription =
            this.cvTemplateService.submittedFormSubject.subscribe((data) => {
                this.cvTemplateService.updateTemplate(this.templateId, data);
                this.formSubmitted = !this.formSubmitted;
                setTimeout(() => {
                    this.formSubmitted = !this.formSubmitted;
                    this.cvTemplateService
                        .getTemplateDoc(this.templateId)
                        .pipe(first())
                        .subscribe((template) => {
                            this.loadFormValue(
                                (template as CVTemplate).template,
                                template as CVTemplate
                            );
                        });
                }, 2000);
            });

        // change template model handler
        this.cvEditorService.toggleTemplateModelSubject.subscribe((value) => {
            if (value) {
                this.templateCollection.length ||
                    this.ngFireStore
                        .collection('template-item')
                        .valueChanges()
                        .subscribe((collection: Array<any>) => {
                            this.templateCollection = Array.from(
                                { length: Number(collection.length / 3 + 1) },
                                () => collection.splice(0, 3)
                            );
                        });
            }
            this.toggleTemplateModel = value;
        });
    }

    ngOnDestroy() {
        this.submitTemplateSubscription.unsubscribe();
    }

    loadFormValue(model: string, template: CVTemplate): void {
        switch (model) {
            case 'sample-template':
                this.templateComponent = SampleTemplateComponent;
                break;
            case 'cv-template15':
                this.templateComponent = CvTemplate15Component;
                break;
            case 'cv-template18':
                this.templateComponent = CvTemplate18Component;
                break;
            case 'cv-template20':
                this.templateComponent = CvTemplate20Component;
                break;
            case 'cv-template21':
                this.templateComponent = CvTemplate21Component;
                break;
            case 'cv-template22':
                this.templateComponent = CvTemplate22Component;
                break;
            case 'cv-template31':
                this.templateComponent = CvTemplate31Component;
                break;
            case 'cv-template33':
                this.templateComponent = CvTemplate33Component;
                break;
            case 'cv-template43':
                this.templateComponent = CvTemplate43Component;
                break;
            default:
                this.templateComponent = ClonedTemplateComponent;
        }
        this.cvTemplateService.formDataSubject.next(
            template as CVTemplate
        );
    }

    onChangeTemplate(model: string): void {
        this.loadFormValue(
            model,
            this.cvTemplateService.changeTemplateFormDataSubject.value
        );
    }
}
