import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Fund } from '../models/fund.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  private readonly apiUrl = 'http://localhost:3000/funds';

  private readonly balanceSubject = new BehaviorSubject<number>(500000);
  balance$ = this.balanceSubject.asObservable();

  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  private readonly subscribedFundsSubject = new BehaviorSubject<number[]>([]);
  subscribedFunds$ = this.subscribedFundsSubject.asObservable();

  constructor(private readonly http: HttpClient) { }

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  getCurrentBalance(): number {
    return this.balanceSubject.value;
  }

  updateBalance(balance: number): void {
    this.balanceSubject.next(balance);
  }

  addTransaction(transaction: Transaction): void {
    const current = this.transactionsSubject.value;
    this.transactionsSubject.next([...current, transaction]);
  }

  addSubscribedFund(id: number): void {
    const current = this.subscribedFundsSubject.value;
    this.subscribedFundsSubject.next([...current, id]);
  }

  removeSubscribedFund(id: number): void {
    const current = this.subscribedFundsSubject.value.filter(f => f !== id);
    this.subscribedFundsSubject.next(current);
  }

  getSubscribedFunds(): number[] {
    return this.subscribedFundsSubject.value;
  }
}
