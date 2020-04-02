import {Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  ActivatedRoute } from '@angular/router';


@Component({
    selector     : 'app-search-form',
    templateUrl  : './search.form.component.html',
    styleUrls    : ['./search.form.component.scss']
})
export class SearchFormComponent implements OnInit {
    searchForm: FormGroup;
    advancedFilter = false;
    growthRange = {
        min: 130,
        max: 250
    };
    weightRange = {
        min: 45,
        max: 100
    };
    @Output() onchange = new EventEmitter();
    @Input() filter: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {}

    onSubmit() { }

    ngOnInit(): void {
        const online = this.route.snapshot.paramMap.get('isOnline');
        if (online === 'true') {
            this.filter.online = true;
        } else {
            this.filter.online = false;
        }

        this.searchForm = this.formBuilder.group({
            age_from          : [this.filter.age_from],
            age_to          : [this.filter.age_to],
            is_online          : [this.filter.online],
            country: [this.filter.country],
            city: [this.filter.city],
            marital_status: [this.filter.marital_status],
            children: [this.filter.children],
            eye_color: [this.filter.eye_color],
            hair_color: [this.filter.hair_color],
            alcohol: [this.filter.alcohol],
            smoking: [this.filter.smoking],
            nationality: [this.filter.nationality],
            languages: [this.filter.languages],
            work: [this.filter.work],
            hobby: [this.filter.hobby],
            growth: [this.filter.growth],
            weight: [this.filter.weight]
        });
    }

    onChanges() {
        this.filter = {
            online: this.searchForm.controls.is_online.value,
            age_from: this.searchForm.controls.age_from.value,
            age_to: this.searchForm.controls.age_to.value,
            country: this.searchForm.controls.country.value,
            city: this.searchForm.controls.city.value,
            marital_status: this.searchForm.controls.marital_status.value,
            children: this.searchForm.controls.children.value,
            eye_color: this.searchForm.controls.eye_color.value,
            hair_color: this.searchForm.controls.hair_color.value,
            alcohol: this.searchForm.controls.alcohol.value,
            smoking: this.searchForm.controls.smoking.value,
            nationality: this.searchForm.controls.nationality.value,
            languages: this.searchForm.controls.languages.value,
            work: this.searchForm.controls.work.value,
            hobby: this.searchForm.controls.hobby.value,
            weight: this.searchForm.controls.weight.value,
            growth: this.searchForm.controls.growth.value
        };
        this.formatDate(this.filter);
        this.onchange.emit(this.filter);
    }

    formatDate(filter: any) {
        const cy = new Date();
        let cm = '';
        let cd = '';
        if (this.filter.age_from !== 'all') {
            if (cy.getMonth() < 10) {
            cm = '0' + cy.getMonth();
            } else {
            cm = cy.getMonth().toString();
            }
            if (cy.getDate() < 10) {
                cd = '0' + cy.getDate();
            } else {
                cd = cy.getDate().toString();
            }
            const ryFrom = `${cy.getFullYear() - this.filter.age_from}-${cm}-${cd}`;
            this.filter.age_from = ryFrom;
        }

        if (this.filter.age_to !== 'all') {
            if (cy.getMonth() < 10) {
            cm = '0' + cy.getMonth();
            } else {
            cm = cy.getMonth().toString();
            }
            if (cy.getDate() < 10) {
                cd = '0' + cy.getDate();
            } else {
                cd = cy.getDate().toString();
            }
            const ryTo = `${cy.getFullYear() - this.filter.age_to}-${cm}-${cd}`;
            this.filter.age_to = ryTo;
        }

    }

    toggleAdvancedFilter() {
        this.advancedFilter = !this.advancedFilter;
    }
}

