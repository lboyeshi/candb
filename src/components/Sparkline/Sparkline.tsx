import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";

interface TickerProps {
  values?: Array<number>;
  isLoading?: boolean;
  color: string;
  [key: string]: any;
}

const Ticker: React.FC<TickerProps> = ({ values, color, ...rest }) => {
  const viewboxWidth = 300;
  const viewboxHeight = 100;
  const pathString = values
    ? generatePathString(values, viewboxWidth, viewboxHeight)
    : "";
  return (
    <TickerContainer {...rest}>
      {values && (
        <svg
          fill="none"
          viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
          stroke={color ?? "black"}
          style={{ width: "100%" }}
        >
          <path
            d={pathString}
            data-testid="valid-svg-path"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
          ></path>
        </svg>
      )}
      {!values && <span data-testid="no-data-text">No data</span>}
    </TickerContainer>
  );
};

export default Ticker;

const TickerContainer = styled.div`
  padding: 8px;
`;

const generatePathString = (
  values: Array<number>,
  viewboxWidth: number,
  viewboxHeight: number
) => {
  if (!values.length) return "";
  // Padding config so graph is never clipped
  const PADDING = 3;
  // (1) Normalize the array of values
  let max = Math.max(...values);
  let min = Math.min(...values);
  let normalizedValues;
  // Also mirrors the values so graph is correct way round
  try {
    normalizedValues = values.map((v) => {
      if (typeof v === "string" || isNaN(v)) throw new Error();
      return -(v - min) / (max - min) + 1;
    });
  } catch (err) {
    // return an empty path string if any value is invalid
    return "";
  }

  let length = normalizedValues.length;

  // (2)
  let pathString = `M ${PADDING},${
    normalizedValues[0] * (viewboxHeight - 2 * PADDING) + PADDING
  }`;
  for (let i = 1; i < length; i++) {
    pathString += `L ${(viewboxWidth / length) * i},${
      normalizedValues[i] * (viewboxHeight - 2 * PADDING) + PADDING
    }`;
  }

  return pathString;
};
