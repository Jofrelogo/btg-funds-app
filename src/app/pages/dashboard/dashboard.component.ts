import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { FundService } from '../../services/fund.service';
import { Fund } from '../../models/fund.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  funds: Fund[] = [];
  balance = 0;
  transactions: string[] = [];

  notificationMethod = 'Email';
  constructor(
    private readonly titleService: Title,
    private readonly fundService: FundService,
    private readonly snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('BTG Fondos - Dashboard');
  }

  ngOnInit(): void {
    this.fundService.getFunds().subscribe(data => {
      this.funds = data;
    });

    this.balance = this.fundService.getCurrentBalance();
  }

  subscribeFund(fund: Fund): void {
    if (this.fundService.getSubscribedFunds().includes(fund.id)) {
      this.showMessage('Ya está suscrito a este fondo');
      return;
    }
    if (this.balance >= fund.minimumAmount) {
      this.balance -= fund.minimumAmount;
      this.fundService.updateBalance(this.balance);

      this.fundService.addTransaction({
        fundId: fund.id,
        type: 'Suscripción',
        fundName: fund.name,
        amount: fund.minimumAmount,
        notificationMethod: this.notificationMethod,
        date: new Date().toLocaleString()
      });

      this.fundService.addSubscribedFund(fund.id);
      this.showMessage(`Suscripción exitosa a ${fund.name}`);
    } else {
      this.showMessage('No tiene saldo disponible para vincularse al fondo');
    }
  }

  cancelFund(fund: Fund): void {

    if (this.fundService.getSubscribedFunds().includes(fund.id)) {
      this.balance += fund.minimumAmount;
      this.fundService.updateBalance(this.balance);
      this.fundService.removeSubscribedFund(fund.id);
      this.fundService.addTransaction({
        type: 'Cancelación',
        fundId: fund.id,
        fundName: fund.name,
        amount: fund.minimumAmount,
        notificationMethod: '-',
        date: new Date().toLocaleString()
      });

      this.showMessage(`Cancelación exitosa de ${fund.name}`);
    } else {
      this.showMessage('No está suscrito a este fondo');
    }
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }
}
