import React from 'react';
import styled from 'styled-components';

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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    padding: 10px;
    background-color: #eaeaea;
    border: 1px solid #ddd;
`;

const Td = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
`;

const Header = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Breadcrumb = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
`;

const Link = styled.a`
    color: #888;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    background-color: #FFF0F6;
    color: #EB2F96;
    border: 1px solid #FFF0F6;
    border-radius: 15px;
    padding: 8px 16px;
    cursor: pointer;
`;

const MyPage = () => {
  return (
    <Container>
      <Sidebar>
        <div>
          <h2>마이페이지</h2>
          <ul>
            <li><Link href="/edit-profile">회원정보 수정</Link></li>
            <li><Link href="/manage-artworks">내 작품 목록 관리</Link></li>
            <li><Link href="/delete-service">서비스 탈퇴</Link></li>
          </ul>
        </div>
      </Sidebar>
      <Content>
        <Breadcrumb>
          Breadcrumb Link / Breadcrumb Link / Breadcrumb Link
        </Breadcrumb>
        <Header>내 작품 관리</Header>
        <Table>
          <thead>
            <tr>
              <Th>작품명</Th>
              <Th>버전</Th>
              <Th>버전명</Th>
              <Th>장르</Th>
              <Th>등록 상태</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>범죄도시4</Td>
              <Td>1.0</Td>
              <Td>v1</Td>
              <Td>액션</Td>
              <Td><Button>등록 중</Button></Td>
            </tr>
            <tr>
              <Td>인사이드 아웃 2</Td>
              <Td>1.1</Td>
              <Td>version 1.1</Td>
              <Td>애니메이션</Td>
              <Td><Button>등록 완료</Button></Td>
            </tr>
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default MyPage;
