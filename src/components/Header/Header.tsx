import { Group, Skeleton, Text } from "@mantine/core";
import { useMemo } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { GLOBAL } from "../../utils/coingecko/endpoints";
import { axios_fetcher } from "../../utils/misc/axios";

const Header = () => {
  const { data, error } = useSWR(GLOBAL(), axios_fetcher);
  const isLoading = useMemo(() => !data && !error, [data, error]);

  return (
    <>
      <Global>
        {!!error && <div>{"An error ocurred while fetching data"}</div>}
        {isLoading && (
          <div>
            <span style={{ color: "white", fontSize: "0.75rem" }}>
              Loading...
            </span>
          </div>
        )}
        {data && data.data.market_cap_percentage && (
          <div>
            <Group
              align={"center"}
              style={{ width: "100%", maxWidth: "960px", margin: "0 auto" }}
              position="apart"
            >
              {Object.entries(data.data.market_cap_percentage)
                .slice(0, 5)
                .map((o: any) => (
                  <Text
                    style={{
                      color: "#c28c99",
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                    }}
                  >
                    <strong>{o[0] + ": "}</strong>
                    {o[1].toFixed(2) + "%"}
                  </Text>
                ))}
            </Group>
          </div>
        )}
      </Global>
      <StyledHeader>
        <div>
          <a
            href="https://calebandbrown.com"
            target="_blank"
            rel={"noreferrer"}
          >
            <img
              src={
                "https://global-uploads.webflow.com/5e26823f16b6d170cafb8f8a/5e41f653a0a389a5d2d1b5cc_caleb-and-brown-logo.svg"
              }
              alt="caleb+brown+logo"
            />
          </a>
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;

const Global = styled.header`
  padding: 8px;
  background-color: var(--color-candb-blue-2);
  height: 35px;

  overflow: hidden;
  > div {
    display: flex;
    align-items: center;
    max-width: 95vw;
    margin: auto;
    justify-content: space-between;
  }
`;

const StyledHeader = styled.header`
  min-height: 70px;
  background-color: var(--color-candb-blue-1);
  > div {
    display: flex;
    align-items: center;
    padding: 1rem;
    justify-content: space-between;
    > a {
      > img {
        max-width: 50vw;
      }
    }
  }
`;
