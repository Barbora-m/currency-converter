import axios from "axios";

import { RatesResponse } from "../types";

export const fetchRates = async () => {
  const { data } = await axios.get<RatesResponse>("http://localhost:8000");

  return data;
};
