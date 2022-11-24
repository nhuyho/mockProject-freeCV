import { CvItem } from 'src/app/shared/models/cv-item.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CvListService {
    constructor(private ngFirestore: AngularFirestore) {}

    getDataCvList() {
        return this.ngFirestore.collection('template-item').valueChanges() as Observable<CvItem[]>;
    }
}
