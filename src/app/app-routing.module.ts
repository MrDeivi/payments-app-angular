import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: '',
				redirectTo: '/dashboard',
				pathMatch: 'full'
			},
			{
				canActivate: [AuthGuard],
				path: 'dashboard',
				loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DefaultComponent),
				data: { requiresAuth: true },
				pathMatch: 'full'
			},
			{
				canActivate: [AuthGuard],
				path: 'users',
				loadComponent: () => import('./demo/users/users.component').then((c) => c.UsersComponent),
				data: { requiresAuth: true, roles: ['admin'] }
			},
			{
				canActivate: [AuthGuard],
				path: 'payments',
				loadComponent: () => import('./demo/payments/payments.component').then((c) => c.PaymentsComponent),
				data: { requiresAuth: true, roles: ['admin'] }
			},
			{
				canActivate: [AuthGuard],
				path: 'payments/:id',
				loadComponent: () => import('./demo/payment-detail/payment-detail.component').then((c) => c.PaymentDetailComponent),
				data: { requiresAuth: true }
			},
			{
				canActivate: [AuthGuard],
				path: 'user-payments',
				loadComponent: () => import('./demo/userPayments/user-payments.component').then((c) => c.UserPaymentsComponent),
				data: { requiresAuth: true }
			}, {
				canActivate: [AuthGuard],
				path: 'create-payment-request',
				loadComponent: () => import('./demo/create-payments/create-payments.component').then((c) => c.CreatePaymentRequestComponent),
				data: { requiresAuth: true }
			},
		]
	},
	{
		path: '',
		component: GuestComponent,
		children: [
			{
				path: 'login',
				loadComponent: () => import('./demo/authentication/login/login.component')
			},
			{
				path: 'register',
				loadComponent: () => import('./demo/authentication/register/register.component')
			}
		]
	},
	{ path: '**', redirectTo: '/dashboard' }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
