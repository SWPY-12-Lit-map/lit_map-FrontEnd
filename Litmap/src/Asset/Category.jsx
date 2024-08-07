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
  margin: 20px auto 0px;
  position: relative;
  font-size: 20px;
`;

const CategoryMenuItem = styled.li`
  padding: 0 20px;
`;

const CategoryTab = styled.div`
  text-align: center;
  width: 60px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  color: ${(props) => (props.active ? "#8B0024" : "black")};
  border-bottom: ${(props) => (props.active ? "4px solid #8B0024" : "unset")};
`;

const BarsIcon = styled(FontAwesomeIcon)`
  color: #000000;
  cursor: pointer;
  font-size: 20px;
  margin-right: 20px;
`;

function Category({ setMega, mega, activeCategory, setActiveCategory }) {
  return (
    <CategoryMenu>
      <BarsIcon
        icon={faBars}
        onClick={() => {
          setMega(true);
        }}
      />
      {["홈", "도서", "드라마", "영화", "웹툰"].map((a, i) => {
        return (
          <CategoryMenuItem>
            <CategoryTab
              active={activeCategory === a}
              onClick={() => setActiveCategory(a)}
            >
              {a}
            </CategoryTab>
          </CategoryMenuItem>
        );
      })}

      {mega && <Megamenu mega={mega} setMega={setMega} />}
    </CategoryMenu>
  );
}

export default Category;
