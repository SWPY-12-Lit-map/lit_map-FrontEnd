import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CategoryMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 20px 50px;
  gap: 15px;
  margin-bottom: 20px;
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

function Category(props) {
  const setMega = props.setMega;

  return (
    <CategoryMenu>
      <BarsIcon
        icon={faBars}
        onClick={() => {
          setMega(true);
        }}
      />
      <CategoryMenuItem>
        <StyledLink to="/">홈</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink to="/category1">도서_임시작품등록페이지</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink to="/category2">드라마_임시마이페이지</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink to="/category3">영화</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink to="/category4">웹툰</StyledLink>
      </CategoryMenuItem>
    </CategoryMenu>
  );
}

export default Category;
