import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  isMenuOpen: boolean = false;

  toggleMenu() {  
    this.isMenuOpen = !this.isMenuOpen;
  }
}
