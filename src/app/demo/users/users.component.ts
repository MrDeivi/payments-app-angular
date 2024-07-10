import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { UsersTableComponent } from 'src/app/components/users-table/users-table.component';

@Component({
	selector: 'users-default',
	standalone: true,
	imports: [
		MatButtonModule,
		MatCardModule,
		CommonModule,
		SharedModule,
		BreadcrumbComponent,
		UsersTableComponent
	],
	templateUrl: './users.component.html',
})
export class UsersComponent {
	 
}
