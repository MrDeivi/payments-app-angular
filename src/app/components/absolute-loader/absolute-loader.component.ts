import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
	standalone: true,
	selector: 'app-absolute-loader',
	templateUrl: './absolute-loader.html',
	styleUrls: ['./absolute-loader.scss'],
	imports: [MatProgressSpinner,CommonModule]
})
export class AbsoluteLoaderComponent {
	@Input() className: string = '';
}
