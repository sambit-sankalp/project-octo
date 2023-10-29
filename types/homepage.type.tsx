export type comapanyData = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

export type homecardDataType = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
  name: string;
};

export type homeprops = {
  top_gainers: homecardDataType[];
  top_losers: homecardDataType[];
};
