import React, { useMemo, useEffect, useState } from "react";

import useSWR from "swr";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import { COINS_LIST, COINS_MARKETS } from "./utils/coingecko/endpoints";
import { axios_fetcher } from "./utils/misc/axios";
import { paginate } from "./utils/misc/misc";

import {
  Pagination,
  Box,
  Group,
  TextInput,
  Button,
  Chips,
  Chip,
  InputWrapper,
  Title,
} from "@mantine/core";
import Header from "./components/Header/Header";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [currency, setCurrency] = useState("aud");
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString.toLowerCase());
  // Current Page Number
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(100);
  const { data, error } = useSWR(
    COINS_MARKETS(currentPage, pageSize, currency),
    axios_fetcher
  );
  const filteredData = useMemo(
    () =>
      debouncedSearchString && data
        ? data.filter(
            (v: any) =>
              v.id.toLowerCase().includes(debouncedSearchString) ||
              v.symbol.toLowerCase().includes(debouncedSearchString) ||
              v.name.toLowerCase().includes(debouncedSearchString)
          )
        : data,
    [data, debouncedSearchString]
  );
  const isLoading = useMemo(() => !data && !error, [data, error]);

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.length / pageSize) : 0),
    [data, pageSize]
  );

  return (
    <>
      <Header />
      <div>
        <Box
          mb={16}
          sx={{
            maxWidth: "960px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ padding: "1rem" }}>
            <Title p={8} sx={{ fontSize: "clamp(1.5rem,5vw,3rem)" }}>
              Cryptocurrencies
            </Title>
            <Group position="apart" p={8} sx={{ width: "100%" }}>
              <TextInput
                label="Search"
                placeholder="e.g Bitcoin, ETH"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <InputWrapper label="Currency">
                <Chips
                  multiple={false}
                  value={currency}
                  onChange={setCurrency}
                  variant="filled"
                >
                  <Chip value="usd">USD</Chip>
                  <Chip value="aud">AUD</Chip>
                  <Chip value="gbp">GBP</Chip>
                  <Chip value="eur">EUR</Chip>
                </Chips>
              </InputWrapper>
            </Group>
            <SummaryTable
              isLoading={isLoading}
              coins={filteredData}
              pageSize={pageSize}
              currency={currency}
            />
          </div>
        </Box>
      </div>
    </>
  );
};

export default App;
