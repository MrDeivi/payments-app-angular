import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthStore } from '../store/auth.store';
@Directive({
	standalone: true,
	selector: '[appHighlight]',
})
export class RoleDirective implements OnInit {
	@Input() roles: string[] = []

	constructor(private el: ElementRef, private authStore: AuthStore) {}
	ngOnInit(): void {
		const can = !this.roles?.length ? true : this.authStore.hasRoles(this.roles)
		if (!can) this.el.nativeElement?.remove();
	}
}
