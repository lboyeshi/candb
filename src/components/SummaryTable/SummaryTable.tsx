import * as React from "react";
import { useState, useEffect } from "react";
import { ICGListCoin } from "../../utils/coingecko/types";

import { useMediaQuery } from "@mantine/hooks";

import { Table } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import SummaryRow from "./SummaryRow";
import { DEFAULT_SKELETON_HEIGHT } from "./_config";

interface SummaryTableProps {
  // display skeleton while loading
  isLoading: boolean;
  coins?: Array<ICGListCoin>;
}

const SummaryTable: React.FC<SummaryTableProps> = ({ isLoading, coins }) => {
  const isLimitedWidth = useMediaQuery("(max-width: 800px)");

  // Small table for mobile devices
  if (isLimitedWidth)
    return (
      <Table highlightOnHover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {isLoading &&
          Array(10).map((v, i) => (
            <tr key={i}>
              {Array(3).map((v, i) => (
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
              key={c.id}
              isLimitedWidth={isLimitedWidth}
            />
          ))}
      </Table>
    );

  // "Desktop" table
  return (
    <Table highlightOnHover>
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
          Array(10).map((v, i) => (
            <tr key={i}>
              {Array(7).map((v, i) => (
                <td>
                  <Skeleton height={DEFAULT_SKELETON_HEIGHT} m={8} />
                </td>
              ))}
            </tr>
          ))}
        {coins &&
          coins.length &&
          coins.map((c) => (
            <SummaryRow id={c.id} name={c.name} symbol={c.symbol} key={c.id} />
          ))}
      </tbody>
    </Table>
  );
};

export default SummaryTable;
