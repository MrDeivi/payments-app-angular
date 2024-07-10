import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import {
	BellOutline,
	CheckCircleOutline,
	LogoutOutline,
	MessageOutline,
	ProfileOutline,
	SettingOutline,
	UserOutline,HomeOutline
} from '@ant-design/icons-angular/icons';
import { AuthStore } from 'src/app/store/auth.store';
import { User } from 'src/app/store/types';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
	selector: 'app-nav-right',
	standalone: true,
	imports: [SharedModule, RouterModule, MatRippleModule, MatRippleModule],
	templateUrl: './nav-right.component.html',
	styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
	@Input() styleSelectorToggle!: boolean;
	@Output() Customize = new EventEmitter();
	windowWidth: number;
	screenFull: boolean = true;
	profile = [];
	setting = [
		{ icon: 'question-circle', title: 'Support' },
		{ icon: 'user', title: 'Account Settings' },
		{ icon: 'lock', title: 'Privacy Center' },
		{ icon: 'comment', title: 'Feedback' },
		{ icon: 'unordered-list', title: 'History' }
	];

	constructor(private iconService: IconService, public authStore: AuthStore) {
		this.windowWidth = window.innerWidth;
		this.iconService.addIcon(
			...[
				CheckCircleOutline,
				MessageOutline,
				SettingOutline,
				LogoutOutline,
				HomeOutline,
				UserOutline,
				ProfileOutline,
				BellOutline,
			]
		);
	}


	get user(): User {
		return this.authStore.user()
	}

	logout() {
		 this.authStore.logout()
	}
}
