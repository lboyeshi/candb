import { Box, Skeleton, Text } from "@mantine/core";
import * as React from "react";

import styled from "styled-components";

import { formatCurrency, generateChartColor } from "../../utils/misc/misc";
import Sparkline from "../Sparkline/Sparkline";

import { TrendingDown, TrendingUp } from "tabler-icons-react";

interface SummaryRowProps {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: Array<number>;
  };
  currency: string;
  isLimitedWidth?: boolean;
  [key: string]: any;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  id,
  name,
  symbol,
  current_price,
  market_cap,
  total_volume,
  price_change_percentage_24h,
  sparkline_in_7d,
  isLimitedWidth,
  currency,
  ...rest
}) => {
  if (isLimitedWidth)
    return (
      <tr style={{ position: "relative" }} {...rest}>
        {/* Name */}
        <td>
          <Box sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text
              weight={700}
              style={{
                color: "var(--color-candb-blue-1)",
                fontSize: "clamp(0.8rem,1vw,1.2rem)",
              }}
            >
              {name}
            </Text>
            <Text color={"gray"} sx={{ textTransform: "uppercase" }}>
              {symbol}
            </Text>
          </Box>
        </td>
        {/* Price + Change*/}
        <td>
          <Box style={{ flexDirection: "column" }}>
            {
              <Text style={{ fontSize: "clamp(0.8rem, 1vw, 1.2rem)" }}>
                {formatCurrency(current_price, currency)}
              </Text>
            }
            {
              <Text>
                <PercentageChange value={price_change_percentage_24h} />
              </Text>
            }
          </Box>
        </td>
        {/* Sparkline */}
        <td>
          <Sparkline
            color={generateChartColor(price_change_percentage_24h)}
            values={sparkline_in_7d.price}
            style={{ width: "100px" }}
          />
        </td>
      </tr>
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
      {/* Price */}
      <td>
        <Box>
          {
            <Text style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>
              {formatCurrency(current_price, currency)}
            </Text>
          }
        </Box>
      </td>
      {/* Market Cap */}
      <td>
        <Box>
          {
            <Text style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>
              {formatCurrency(market_cap, currency)}
            </Text>
          }
        </Box>
      </td>
      {/* Volume */}
      <td>
        <Box>
          {
            <Text style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>
              {formatCurrency(total_volume, currency)}
            </Text>
          }
        </Box>
      </td>
      {/* Sparkline */}
      <td>
        <Sparkline
          color={generateChartColor(price_change_percentage_24h)}
          values={sparkline_in_7d.price}
          style={{ width: "100px" }}
        />
      </td>
      {/* Change */}
      <td>
        <Box>
          <Text>
            <PercentageChange value={price_change_percentage_24h} />
          </Text>
        </Box>
      </td>
    </tr>
  );
};

export default SummaryRow;

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
