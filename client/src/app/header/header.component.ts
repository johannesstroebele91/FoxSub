import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

    showMobileMenu: boolean = true;

    clickMenu(){
        this.showMobileMenu = !this.showMobileMenu;
    }
}
