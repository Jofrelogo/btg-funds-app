import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { FundService } from '../../services/fund.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  displayedColumns: string[] = ['type', 'fundName', 'amount', 'notificationMethod', 'date'];
  dataSource = this.transactions;

  constructor(
    private readonly fundService: FundService,
    private readonly titleService: Title
  ) {
    this.titleService.setTitle('BTG Fondos - Historial');
  }

  ngOnInit(): void {
    this.fundService.transactions$.subscribe(data => {
      this.transactions = data;
    });
  }
}
