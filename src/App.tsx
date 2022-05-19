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
  Text,
  ActionIcon,
  Input,
} from "@mantine/core";
import Header from "./components/Header/Header";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const [currency, setCurrency] = useState("aud");
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString);
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
              v.id
                .toLowerCase()
                .includes(debouncedSearchString.toLowerCase()) ||
              v.symbol
                .toLowerCase()
                .includes(debouncedSearchString.toLowerCase()) ||
              v.name.toLowerCase().includes(debouncedSearchString.toLowerCase())
          )
        : data,
    [data, debouncedSearchString]
  );
  const isLoading = useMemo(() => !data && !error, [data, error]);

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
                label="Search page"
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
            <Group position="apart" p={8} sx={{ width: "100%" }}>
              <InputWrapper label="Page">
                <Group>
                  <ActionIcon
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((v) => v - 1)}
                  >
                    {"<"}
                  </ActionIcon>
                  <Text weight={700}>{currentPage}</Text>
                  <ActionIcon onClick={() => setCurrentPage((v) => v + 1)}>
                    {">"}
                  </ActionIcon>
                </Group>
              </InputWrapper>
            </Group>
            {error ? (
              <span>An error ocurred</span>
            ) : (
              <SummaryTable
                isLoading={isLoading}
                coins={filteredData}
                pageSize={pageSize}
                currency={currency}
              />
            )}
          </div>
        </Box>
      </div>
    </>
  );
};

export default App;
