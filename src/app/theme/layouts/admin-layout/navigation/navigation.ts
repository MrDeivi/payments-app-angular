export interface NavigationItem {
	id: string;
	title: string;
	type: 'item' | 'collapse' | 'group';
	translate?: string;
	icon?: string;
	hidden?: boolean;
	url?: string;
	classes?: string;
	groupClasses?: string;
	exactMatch?: boolean;
	external?: boolean;
	target?: boolean;
	breadcrumbs?: boolean;
	children?: NavigationItem[];
	link?: string;
	description?: string;
	path?: string;
	roles?: string[]
}

export const NavigationItems: NavigationItem[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		type: 'group',
		icon: 'icon-navigation',
		children: [
			{
				id: 'default',
				title: 'Home',
				type: 'item',
				classes: 'nav-item',
				url: '/dashboard',
				icon: 'dashboard',
				breadcrumbs: false,
			},
			{
				id: 'users',
				title: 'Users',
				type: 'item',
				classes: 'nav-item',
				url: '/users',
				icon: 'user',
				breadcrumbs: false,
				roles: ['admin']
			},
			{
				id: 'payments',
				title: 'Payment Requests',
				type: 'item',
				classes: 'nav-item',
				url: '/payments',
				icon: 'profile',
				breadcrumbs: false,
				roles: ['admin']
			},
			{
				id: 'payments',
				title: 'My payments',
				type: 'item',
				classes: 'nav-item',
				url: '/user-payments',
				icon: 'profile',
				breadcrumbs: false,
			},
		]
	},
];
