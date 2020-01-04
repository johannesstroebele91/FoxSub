import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    showMenu: boolean = true;



    clickMenu(){
        this.showMenu = !this.showMenu;
    }
}