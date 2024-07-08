import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MegamenuWrapper = styled.div`
  display: flex;
  background-color: black;
  color: white;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  width: 100%;
  position: absolute;
  z-index: 10000;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const ColumnTitle = styled.h3`
  font-size: 16px;
  border-bottom: 1px solid #555;
  padding-bottom: 10px;
`;

const SubCategory = styled.div`
  margin-top: 15px;
`;

const SubCategoryTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const NavigationItem = styled.div`
  font-size: 12px;
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  display: none;

  ${NavigationItem}:hover & {
    display: block;
  }
`;

const MegaLogin = styled.ul`
  position: absolute;
  bottom: -10px;
  right: 10px;
  display: flex;
  color: #000;
  list-style: none;
  padding-left: 0;
`;

const MegaLoginItem = styled.li`
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const LoginButton = styled(StyledLink)`
  background-color: #1890ff;
  border-radius: 10px;
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function Megamenu(props) {
  const mega = props.mega;

  return (
    <MegamenuWrapper style={{ display: mega == false ? "none" : "flex" }}>
      {["책", "영화", "드라마", "웹툰"].map((category) => (
        <Column key={category}>
          <ColumnTitle>{category}</ColumnTitle>
          {["고전 소설", "현대 소설", "판타지 소설"].map((subCategory) => (
            <SubCategory key={subCategory}>
              <SubCategoryTitle>{subCategory}</SubCategoryTitle>
              {["춘향전", "홍길동전", "운영전", "금방울전"].map(
                (item, index) => (
                  <NavigationItem key={index}>
                    {item}
                    {item === "춘향전" && (
                      <Tooltip>
                        마우스 호버 시, 간략한 설명 텍스트가 나옴
                      </Tooltip>
                    )}
                  </NavigationItem>
                )
              )}
            </SubCategory>
          ))}
        </Column>
      ))}

      <MegaLogin>
        <MegaLoginItem>
          <StyledLink to="/signup">가입하기</StyledLink>
        </MegaLoginItem>
        <MegaLoginItem>
          <LoginButton to="/login">로그인하기</LoginButton>
        </MegaLoginItem>
      </MegaLogin>
    </MegamenuWrapper>
  );
}

export default Megamenu;
