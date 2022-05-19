import React, { useMemo, useEffect, useState } from "react";

import useSWR from "swr";
import SummaryTable from "./components/SummaryTable/SummaryTable";
import { COINS_LIST } from "./utils/coingecko/endpoints";
import { axios_fetcher } from "./utils/misc/axios";
import { paginate } from "./utils/misc/misc";

import { Pagination, Box, Group, TextInput, Button } from "@mantine/core";
import Header from "./components/Header/Header";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const { data, error } = useSWR(COINS_LIST(), axios_fetcher);
  const isLoading = useMemo(() => !data && !error, [data, error]);

  // Current Page Number
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState(10);

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.length / pageSize) : 0),
    [data, pageSize]
  );

  // Current Coins for page
  const [currentCoins, setCurrentCoins] = useState<Array<any>>([]);

  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString);

  useEffect(() => {
    if (debouncedSearchString) {
      let filtered = data.filter(
        (d: any) =>
          d.name.toLowerCase() === debouncedSearchString.toLowerCase() ||
          d.symbol.toLowerCase() === debouncedSearchString.toLowerCase() ||
          d.id.toLowerCase() === debouncedSearchString.toLowerCase()
      );
      setCurrentCoins(paginate(filtered, 1, pageSize));
    } else {
    }
  }, [debouncedSearchString, data]);

  useEffect(() => {
    if (data) {
      setCurrentCoins(paginate(data, currentPage, pageSize));
      console.log(data);
    }
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      setCurrentCoins(paginate(data, 1, pageSize));
    }
  }, [data, error, isLoading]);
  return (
    <>
      <Header />
      <div>
        <Box
          sx={{
            maxWidth: "960px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group align={"center"} p={8}>
            <TextInput
              label="Search"
              placeholder="e.g Bitcoin, ETH"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Group>
          <SummaryTable isLoading={isLoading} coins={currentCoins} />
          <Pagination
            page={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            mt={8}
          />
        </Box>
      </div>
    </>
  );
};

export default App;

/*
So
1. We load the loooong list (1 time only, unless manually reloaded)
2. We set paginate first page
3. Components load the required data when required, saving to main state any additional details coming from the server so it doesn't need to cache (but swr is recaching anyway?)

*/
