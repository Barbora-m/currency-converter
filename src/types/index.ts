export type Rate = {
  amount: number;
  code: string;
  country: string;
  currency: string;
  rate: number;
};

export type RatesResponse = {
  date: string;
  order: number;
  rates: Array<Rate>;
};
