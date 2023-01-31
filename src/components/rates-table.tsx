import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import { RatesResponse } from "../types";

type Props = {
  data: RatesResponse;
};

export const RatesTable = ({ data: { date, order, rates } }: Props) => (
  <TableContainer component={TableWrapper}>
    <Alert severity="info">{`Currency exchange rates valid for ${date}, order: ${order}`}</Alert>
    <Table size="small">
      <TableHead>
        <TableHeader>
          <TableCell>Country</TableCell>
          <TableCell>Currency</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Code</TableCell>
          <TableCell>Rate</TableCell>
        </TableHeader>
      </TableHead>
      <TableBody>
        {rates.map(({ country, currency, amount, code, rate }) => (
          <TableRow key={code}>
            <TableCell>{country}</TableCell>
            <TableCell>{currency}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{code}</TableCell>
            <TableCell>{rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const TableWrapper = styled(Paper)`
  margin-top: 2rem;
`;

const TableHeader = styled(TableRow)`
  > * {
    font-weight: bold;
  }
`;
