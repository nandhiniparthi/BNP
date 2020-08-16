import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { PrimaryTransactionComponent } from './primary-transaction/primary-transaction.component';
import { SavingsTransactionComponent } from './savings-transaction/savings-transaction.component';
import { ChequeBookRequestComponent } from './chequeBookRequest/chequeBookRequest.component';
import { AboutUsComponent } from './about-us/about-us.component'

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
  	path: 'login',
  	component: LoginComponent
  },
  {
  	path: 'userAccount',
  	component: UserAccountComponent
  },
  {
    path: 'primaryTransaction/:username',
    component: PrimaryTransactionComponent
  },
  {
    path: 'savingsTransaction/:username',
    component: SavingsTransactionComponent
  },
  {
    path: 'chequeBookRequest',
    component: ChequeBookRequestComponent
  },
  {
    path: 'aboutUs',
    component:AboutUsComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);