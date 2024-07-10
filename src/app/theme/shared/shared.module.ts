import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { IconModule } from '@ant-design/icons-angular';
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AbsoluteLoaderComponent } from 'src/app/components/absolute-loader/absolute-loader.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbDropdownModule,
		NgbNavModule,
		NgbModule,
		NgbCollapseModule,
		NgScrollbarModule,
		CardComponent,
		IconModule,
		AbsoluteLoaderComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		NgbDropdownModule,
		NgbNavModule,
		NgbCollapseModule,
		NgScrollbarModule,
		CardComponent,
		IconModule
	],
	declarations: []
})
export class SharedModule {}
