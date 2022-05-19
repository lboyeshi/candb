import { Box, Skeleton, Text } from "@mantine/core";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";

import styled from "styled-components";

import useSWR from "swr";
import {
  COINS_MARKET_CHART,
  SIMPLE_PRICE,
} from "../../utils/coingecko/endpoints";
import { axios_fetcher } from "../../utils/misc/axios";
import { formatCurrency, generateChartColor } from "../../utils/misc/misc";
import Ticker from "../Sparkline/Sparkline";
import { DEFAULT_SKELETON_HEIGHT } from "./_config";

import {
  TrendingDown,
  TrendingDown2,
  TrendingDown3,
  TrendingUp,
  TrendingUp2,
  TrendingUp3,
} from "tabler-icons-react";

interface SummaryRowProps {
  id: string;
  name: string;
  symbol: string;
  isLimitedWidth?: boolean;
  [key: string]: any;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  id,
  name,
  symbol,
  isLimitedWidth,
  ...rest
}) => {
  const [dataEnabled, setDataEnabled] = useState(false);
  const { data: historicalData, error: historicalError } = useSWR(
    dataEnabled ? COINS_MARKET_CHART(id) : null,
    axios_fetcher
  );

  const { data: liveData, error: liveError } = useSWR(
    dataEnabled ? SIMPLE_PRICE(id) : null,
    axios_fetcher
  );

  const isLoadingLive = useMemo(
    () => !liveData && !liveError,
    [liveData, liveError]
  );

  const isLoadingHistorical = useMemo(
    () => !historicalData && !historicalError,
    [historicalData, historicalError]
  );

  return (
    <tr style={{ position: "relative" }} {...rest}>
      {/* Name */}
      <td>
        <Box sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text weight={700} style={{ color: "var(--color-candb-blue-1)" }}>
            {name}
          </Text>
          <Text color={"gray"} sx={{ textTransform: "uppercase" }}>
            {symbol}
          </Text>
        </Box>
      </td>
      {dataEnabled ? (
        <>
          {/* Price */}
          <td>
            <Field error={liveError} isLoading={isLoadingLive}>
              <Box>
                {<Text>{liveData && formatCurrency(liveData[id]?.usd)}</Text>}
              </Box>
            </Field>
          </td>
          {/* Market Cap */}
          <td>
            <Field error={liveError} isLoading={isLoadingLive}>
              <Box>
                {
                  <Text>
                    {liveData && formatCurrency(liveData[id].usd_market_cap)}
                  </Text>
                }
              </Box>
            </Field>
          </td>
          {/* Volume */}
          <td>
            <Field error={liveError} isLoading={isLoadingLive}>
              <Box>
                {
                  <Text>
                    {liveData && formatCurrency(liveData[id].usd_24h_vol)}
                  </Text>
                }
              </Box>
            </Field>
          </td>
          {/* Ticker */}
          <td>
            <Field error={historicalError} isLoading={isLoadingHistorical}>
              <Ticker
                color={
                  liveData
                    ? generateChartColor(liveData[id].usd_24h_change)
                    : "black"
                }
                values={
                  historicalData && historicalData.prices.map((p: any) => p[1])
                }
                style={{ width: "100px" }}
              />
            </Field>
          </td>
          {/* Change */}
          <td>
            <Field error={liveError} isLoading={isLoadingLive}>
              <Box>
                <Text>
                  {liveData && (
                    <PercentageChange value={liveData[id].usd_24h_change} />
                  )}
                </Text>
              </Box>
            </Field>
          </td>
        </>
      ) : (
        <td colSpan={5}>
          <ShowDataButton onClick={() => setDataEnabled(true)}>
            Show price data
          </ShowDataButton>
        </td>
      )}
    </tr>
  );
};

export default SummaryRow;

const Field: React.FC<{ error: any; isLoading: boolean; children: any }> = ({
  error,
  isLoading,
  children,
}) => {
  if (error) {
    return (
      <Box>
        <span>Error</span>
      </Box>
    );
  }
  if (isLoading) {
    return <Skeleton height={DEFAULT_SKELETON_HEIGHT} m={8} />;
  }
  return <>{children}</>;
};

const PercentageChange: React.FC<{ value: number }> = ({ value }) => {
  if (!value) return null;
  return (
    <PChangeContainer>
      <span
        style={{
          color:
            value > 0
              ? "green"
              : value < 0
              ? "red"
              : "var(--color-candb-blue-1)",
        }}
      >
        {Math.abs(value).toFixed(2) + "%"}
      </span>
      {value < 0 && <TrendingDown color={"red"} />}
      {value > 0 && <TrendingUp color={"green"} />}
    </PChangeContainer>
  );
};

const PChangeContainer = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 700;
  }
`;

const ShowDataButton = styled.button`
  background-color: var(--color-candb-blue-1);
  border-radius: 5px;
  border: none;
  padding: 4px 8px;
  color: white;
  cursor: pointer;
`;
