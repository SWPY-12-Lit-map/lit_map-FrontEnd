import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import Megamenu from "../Asset/Megamenu";

const CategoryMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding-left: 0;
  gap: 15px;
  margin-bottom: 20px;
  position: relative;
`;

const CategoryMenuItem = styled.li`
  padding: 0 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const MegamenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 100;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

function Category() {
  return (
    <CategoryMenu>
      <CategoryMenuItem>
        <StyledLink to="/category1">카테고리1</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink to="/category2">카테고리2</StyledLink>
      </CategoryMenuItem>
      <CategoryMenuItem>
        <StyledLink to="/category3">카테고리3</StyledLink>
      </CategoryMenuItem>
    </CategoryMenu>
  );
}

export default Category;
