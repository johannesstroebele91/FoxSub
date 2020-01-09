import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-row',
    templateUrl: './row.component.html',
})

export class RowComponent implements OnInit{

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.buildLoginForm();
    }

    buildLoginForm() {
        this.form = this.formBuilder.group({
            text: ['', []]
        });
    }

    @Input() rows : any[];
    row : any[];

    @Input()
    ngSwitch: any
}