import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Megamenu from "./Megamenu";
import { useStore } from "./store";

const CategoryMenu = styled.ul`
  width: 80%;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 20px 50px;
  gap: 15px;
  margin: 20px auto;
  position: relative;
  font-size: 20px;
`;

const CategoryMenuItem = styled.li`
  padding: 0 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const BarsIcon = styled(FontAwesomeIcon)`
  color: #000000;
  cursor: pointer;
  font-size: 20px;
`;

function Category({ setMega, mega }) {
  return (
    <CategoryMenu>
      <BarsIcon
        icon={faBars}
        onClick={() => {
          setMega(true);
        }}
      />
      <CategoryMenuItem>
        <StyledLink>홈</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink>도서</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink>드라마</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink>영화</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink>웹툰</StyledLink>
      </CategoryMenuItem>
      {mega && <Megamenu mega={mega} setMega={setMega} />}
    </CategoryMenu>
  );
}

export default Category;
