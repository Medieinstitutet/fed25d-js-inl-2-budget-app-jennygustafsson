/**
 * Interface för en utgiftspost eller intäktspost
 */
export interface Transaction {
  id: number;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  category: string;
}

/**
 * Interface för listan med utgifter och/eller intäkter (array-kontext)
 */
export type TransactionList = Transaction[];
