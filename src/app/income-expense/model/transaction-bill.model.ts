export class TransactionBill {
  description?: string;
  amount?: number;
  type?: string;
  constructor(desc: string, amount: number, type: string) {
    this.description = desc;
    this.amount = amount;
    this.type = type;
  }
}


