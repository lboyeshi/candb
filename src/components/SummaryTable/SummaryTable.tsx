import * as React from "react";
import { useState, useEffect } from "react";
import { ICGListCoin } from "../../utils/coingecko/types";

import { useMediaQuery } from "@mantine/hooks";

import { Table } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import SummaryRow from "./SummaryRow";
import { DEFAULT_SKELETON_HEIGHT } from "./_config";

interface SummaryTableProps {
  isLoading: boolean;
  coins?: Array<any>;
  pageSize: number;
  currency: string;
}

const SummaryTable: React.FC<SummaryTableProps> = ({
  isLoading,
  coins,
  pageSize,
  currency,
}) => {
  const isLimitedWidth = useMediaQuery("(max-width: 800px)");

  // Small table for mobile devices
  if (isLimitedWidth)
    return (
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {true &&
            new Array(pageSize).map((v, i) => (
              <tr key={i}>
                {new Array(3).map((v, i) => (
                  <td>
                    <Skeleton height={DEFAULT_SKELETON_HEIGHT} m={8} />
                  </td>
                ))}
              </tr>
            ))}
          {coins &&
            coins.length &&
            coins.map((c) => (
              <SummaryRow
                id={c.id}
                name={c.name}
                symbol={c.symbol}
                current_price={c.current_price}
                market_cap={c.market_cap}
                total_volume={c.total_volume}
                price_change_percentage_24h={c.price_change_percentage_24h}
                sparkline_in_7d={c.sparkline_in_7d}
                currency={currency}
                key={c.id}
                isLimitedWidth
              />
            ))}
        </tbody>
      </Table>
    );

  // "Desktop" table
  return (
    <Table p={16} highlightOnHover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Volume</th>
          <th></th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {isLoading &&
          new Array(pageSize).fill(1).map((v, i) => (
            <tr key={i}>
              {new Array(7).fill(1).map((v, i) => (
                <td>
                  <Skeleton height={DEFAULT_SKELETON_HEIGHT} m={8} />
                </td>
              ))}
            </tr>
          ))}
        {coins &&
          coins.length &&
          coins.map((c) => (
            <SummaryRow
              id={c.id}
              name={c.name}
              symbol={c.symbol}
              current_price={c.current_price}
              market_cap={c.market_cap}
              total_volume={c.total_volume}
              price_change_percentage_24h={c.price_change_percentage_24h}
              sparkline_in_7d={c.sparkline_in_7d}
              currency={currency}
              key={c.id}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default SummaryTable;
