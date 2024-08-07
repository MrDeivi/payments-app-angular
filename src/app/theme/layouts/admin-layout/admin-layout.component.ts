
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SharedModule, NavigationComponent, NavBarComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminComponent {
  navCollapsed: boolean;
  navCollapsedMob: boolean;

	navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = false;
      setTimeout(() => {
        this.navCollapsedMob = true;
      }, 100);
	} else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('mob-open');
    }
  }
}
