import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress } from "@mui/material";

import { fetchRates } from "../api";

import { RatesTable } from "./rates-table";
import { CurrencyConverter } from "./currency-converter";

export const ExchangeRates = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ["rates"],
    queryFn: fetchRates,
  });

  if (error) {
    return <Alert severity="error">{(error as Error).message}</Alert>;
  }

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  return (
    <>
      <CurrencyConverter data={data} />
      <RatesTable data={data} />
    </>
  );
};
