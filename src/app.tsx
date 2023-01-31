import React from "react";
import { Container, Paper, styled, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ExchangeRates } from "./components";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Container maxWidth="lg">
      <ContentWrapper elevation={5}>
        <Title variant="h3">Exchange rates</Title>
        <ExchangeRates />
      </ContentWrapper>
    </Container>
  </QueryClientProvider>
);

const ContentWrapper = styled(Paper)`
  margin: 40px 0;
  padding: 32px;
  text-align: center;

  @media (max-width: 390px) {
    padding: 0;
  }
`;

const Title = styled(Typography)`
  margin-bottom: 3rem;
  text-align: center;
`;
