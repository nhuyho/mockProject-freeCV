import { Job } from 'src/app/shared/models/job.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable({
    providedIn: 'root',
})
export class JobService {
    downloadURL!: Observable<string>;
    urlImageFire!: string;

    constructor(
        private ngFirestore: AngularFirestore,
        private storage: AngularFireStorage
    ) {}

    // Get All Jobs
    getAllJobs() {
        return this.ngFirestore.collection('jobs').snapshotChanges();
    }

    //Get Job Detail by ID
    getJobDetails(id: string) {
        return this.ngFirestore.collection('jobs').doc(id).valueChanges();
    }

    //Update data of job detail on firebase
    updateJobDetail(id: string, job: { [key: string]: any }) {
        return this.ngFirestore.collection('jobs').doc(id).update({
            content: job.content,
            createAt: job.createAt,
            deadline: job.deadline,
            location: job.location,
            quantity: job.quantity,
            thumbnail: job.thumbnail,
            title: job.title,
            technology: job.technology
        });
    }

    saveImageToStorage(fileImage: File | null) {
        const presentDate = Date.now();
        const filePath = `images/jobs/thumbnails/${presentDate}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload( `images/jobs/thumbnails/${presentDate}`, fileImage);

        task.snapshotChanges().pipe(
            finalize(() => {
                this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe(url => {
                    this.urlImageFire = url;
                });
            })
        ).subscribe(url => {
            return url ? url : null;
        });
    }

    // Update Job
    updateJob(id: string, job: Job){
        return this.ngFirestore.collection('jobs').doc(id).update({
            title: job.title,
            createAt: job.createAt,
            deadline: job.deadline
        });
    }

    //Create new Jd
    createJob(job: { [key: string]: any }) {
        return this.ngFirestore.collection('jobs').add({
            content: job.content,
            createAt: job.createAt,
            deadline: job.deadline,
            exp: job.exp,
            location: job.location,
            quantity: job.quantity,
            salaryMax: job.salaryMax,
            salaryMin: job.salaryMin,
            technology: job.technology,
            thumbnail: job.thumbnail,
            title: job.title,
            workingForm: job.workingForm
        })
        .catch(e => {
            console.log(e);
        });
    }

    //Validate imput type number
    validateSpaceInput(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length <= 10;
        const isValid = !isWhitespace;
        return isValid ? null : {whitespace: true};
    }

    //Decode html to check empty text editor
    decodeHTMLEntities (content: string) {
        if(content && typeof content === 'string') {
          // strip script/html tags
          content = content.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          content = content.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        }

        return content;
      }
}
