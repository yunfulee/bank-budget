export class TransactionBill {
  description?: string;
  amount?: string;
  type?: string;
  date?: string;

  constructor(desc?: string, amount?: string, type?: string, date?: string) {
    this.description = desc;
    this.amount = amount;
    this.type = type;
    this.date = date;

  }
}


