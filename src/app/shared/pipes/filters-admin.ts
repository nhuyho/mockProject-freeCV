import { Pipe, PipeTransform } from '@angular/core';

enum CaseCombineFilter {
    combinePTW = 1,
    combinePT = 2,
    combinePW = 3,
    combineTW = 4,
    combineP = 5,
    combineT = 6,
    combineW = 7,
    default = 8,
}

@Pipe({
    name: 'filter',
})
export class FiltersAdmin implements PipeTransform {
    caseFilter(place: any, technology: any, work: any): CaseCombineFilter {
        if (technology && place && work) {
            return CaseCombineFilter.combinePTW;
        } else if (place && technology && !work) {
            return CaseCombineFilter.combinePT;
        } else if (place && work && !technology) {
            return CaseCombineFilter.combinePW;
        } else if (technology && work && !place) {
            return CaseCombineFilter.combineTW;
        } else if (place && !work && !technology) {
            return CaseCombineFilter.combineP;
        } else if (technology && !place && !work) {
            return CaseCombineFilter.combineT;
        } else if (work && !technology && !place) {
            return CaseCombineFilter.combineW;
        } else {
            return CaseCombineFilter.default;
        }
    }

    transform(jobs: any[], place: any, technology: any, work: any) {
        let resultFilterJobs = jobs;
        const caseFCombineFilter = this.caseFilter(place, technology, work);
        switch (+caseFCombineFilter) {
            case CaseCombineFilter.combinePTW:
                resultFilterJobs = jobs
                    .filter(
                        (job) => String(job.location) === String(place.value)
                    )
                    .filter(
                        (job) => job.technology === String(technology.value)
                    )
                    .filter(
                        (job) =>
                            job.workingForm.toLowerCase().trim() ===
                            String(work.value)
                    );

                break;
            case CaseCombineFilter.combinePT:
                resultFilterJobs = jobs
                    .filter(
                        (job) => String(job.location) === String(place.value)
                    )
                    .filter(
                        (job) => job.technology === String(technology.value)
                    );

                break;

            case CaseCombineFilter.combinePW:
                resultFilterJobs = jobs
                    .filter(
                        (job) => String(job.location) === String(place.value)
                    )
                    .filter(
                        (job) =>
                            job.workingForm.toLowerCase().trim() ===
                            String(work.value)
                    );

                break;

            case CaseCombineFilter.combineTW:
                resultFilterJobs = jobs
                    .filter(
                        (job) => job.technology === String(technology.value)
                    )
                    .filter(
                        (job) =>
                            job.workingForm.toLowerCase().trim() ===
                            String(work.value)
                    );

                break;

            case CaseCombineFilter.combineP:
                resultFilterJobs = jobs.filter(
                    (job) => String(job.location) === String(place.value)
                );

                break;

            case CaseCombineFilter.combineT:
                resultFilterJobs = jobs.filter(
                    (job) => job.technology === String(technology.value)
                );

                break;
            case CaseCombineFilter.combineW:
                resultFilterJobs = jobs.filter(
                    (job) => job.workingForm === String(work.value)
                );

                break;
        }

        return resultFilterJobs;
    }
}
