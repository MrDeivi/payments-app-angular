import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	standalone: true,
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	imports: [CommonModule, MatIconModule,MatButtonModule]
})
export class BreadcrumbComponent {
	@Input() showBackButton: boolean = true;
	@Input() title: string = '';
	@Input() items: string[] = [];

	constructor(private location: Location) { }

	goBack() {
		this.location.back()
	}
}
