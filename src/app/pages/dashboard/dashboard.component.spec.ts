import { render, screen, fireEvent } from '@testing-library/angular';
import { DashboardComponent } from './dashboard.component';
import { FundService } from '../../services/fund.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

interface IFundServiceMock {
  funds$: any;
  balance$: any;
  getSubscribedFunds: () => number[];
  addSubscribedFund: jasmine.Spy;
  removeSubscribedFund: jasmine.Spy;
  addTransaction: jasmine.Spy;
}

describe('DashboardComponent (ATL + Jasmine)', () => {

  let mockFundService: IFundServiceMock;

  beforeEach(() => {
    mockFundService = {
      funds$: of([{ id: 1, name: 'Fondo A', minimumAmount: 100000, category: 'FPV' }]),
      balance$: of(500000),
      getSubscribedFunds: () => [],
      addSubscribedFund: jasmine.createSpy('addSubscribedFund'),
      removeSubscribedFund: jasmine.createSpy('removeSubscribedFund'),
      addTransaction: jasmine.createSpy('addTransaction')
    };
  });

  it('should render dashboard component and fund', async () => {
    await render(DashboardComponent, {
      imports: [
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: FundService, useValue: mockFundService }]
    });

    expect(screen.getByText('Fondo A')).toBeTruthy();
    expect(screen.getByText('Saldo disponible')).toBeTruthy();
    expect(screen.getByText('COP 500.000')).toBeTruthy();
  });

});