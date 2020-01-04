import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    mobileMenu: boolean = true;

    clickMenu(){
        this.mobileMenu = !this.mobileMenu;
    }
}