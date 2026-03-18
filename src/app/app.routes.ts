import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'transactions', component: TransactionsComponent }
];
