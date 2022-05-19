import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <a href="https://calebandbrown.com" target="_blank" rel={"noreferrer"}>
          <img
            src={
              "https://global-uploads.webflow.com/5e26823f16b6d170cafb8f8a/5e41f653a0a389a5d2d1b5cc_caleb-and-brown-logo.svg"
            }
            alt="caleb+brown+logo"
          />
        </a>
      </div>
    </StyledHeader>
  );
};

export default Header;

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
