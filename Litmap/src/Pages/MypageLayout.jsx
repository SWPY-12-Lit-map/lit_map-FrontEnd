import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const Sidebar = styled.div`
    width: 250px;
    background-color: #1d2939;
    color: #fff;
    padding: 20px;

    ul {
      list-style: none;
      padding: 0;
    }
`;

const Content = styled.div`
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 20px;
`;

const CustomLink = styled(Link)`
    color: #888;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
`;

const MypageLayout = () => {
  return (
    <Container>
      <Sidebar>
        <div>
          <h2>마이페이지</h2>
          <ul>
            <li>
              <CustomLink to="edit-profile">회원정보 수정</CustomLink>
            </li>
            <li>
              <CustomLink to="manage-artworks">내 작품 관리</CustomLink>
            </li>
            <li>
              <CustomLink to="delete-service">서비스 탈퇴</CustomLink>
            </li>
            <li>
              <CustomLink to="/adminpage">관리자용 메뉴</CustomLink>
            </li>
          </ul>
        </div>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default MypageLayout;
