import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundService } from '../../services/fund.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private readonly fundService: FundService) { }

  ngOnInit(): void {
    this.fundService.transactions$.subscribe(data => {
      this.transactions = data;
    });
  }
}
