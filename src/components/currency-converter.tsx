import { ChangeEvent, useCallback, useState } from "react";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import styled from "styled-components";

import { RatesResponse } from "../types";

type Props = {
  data: RatesResponse;
};

export const CurrencyConverter = ({ data }: Props) => {
  const [amount, setAmount] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleAmountChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setConvertedAmount("");

      if (/^\d*([.,]\d*)?$/.test(value)) {
        setAmount(value);
      }
    },
    []
  );

  const handleCodeChange = useCallback(
    ({ target: { value } }: SelectChangeEvent) => {
      setConvertedAmount("");
      setCurrencyCode(value);
    },
    []
  );

  const handleConvertButtonClick = useCallback(() => {
    const numericAmount = Number(amount.replace(",", "."));

    const selectedCurrency = data?.rates.find(
      ({ code }) => code === currencyCode
    );

    if (!selectedCurrency || !numericAmount) {
      return;
    }

    const { amount: currencyAmount, rate } = selectedCurrency;

    const result = (numericAmount / (rate / currencyAmount)).toFixed(2);

    setConvertedAmount(result);
  }, [amount, currencyCode, data?.rates]);

  return (
    <Container>
      <Typography mb={4} textAlign="center" variant="h5">
        Currency converter
      </Typography>
      <FormContainer>
        <InputsContainer>
          <FormControl>
            <InputLabel>From</InputLabel>
            <FromInput
              endAdornment={<InputAdornment position="end">CZK</InputAdornment>}
              label="From"
              name="amount"
              onChange={handleAmountChange}
              value={amount}
            />
          </FormControl>
          <FormControl>
            <InputLabel>To</InputLabel>
            <Select
              label="To"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 500,
                  },
                },
              }}
              name="code"
              onChange={handleCodeChange}
              sx={{ width: 90 }}
              value={currencyCode}
            >
              {data.rates.map(({ code }) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputsContainer>
        <Button onClick={handleConvertButtonClick} variant="contained">
          Convert
        </Button>
        <FormControl>
          <InputLabel>Result</InputLabel>
          <ResultInput
            endAdornment={
              <InputAdornment position="end">{currencyCode}</InputAdornment>
            }
            label="Result"
            name="convertedAmount"
            readOnly
            value={convertedAmount}
          />
        </FormControl>
      </FormContainer>
    </Container>
  );
};

const Container = styled(Paper)`
  margin: 0 auto;
  padding: 32px;
  width: fit-content;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 48px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FromInput = styled(OutlinedInput)`
  width: 200px;

  @media (max-width: 390px) {
    width: 150px;
  }
`;

const ResultInput = styled(OutlinedInput)`
  width: 310px;

  @media (max-width: 390px) {
    width: 260px;
  }
`;
