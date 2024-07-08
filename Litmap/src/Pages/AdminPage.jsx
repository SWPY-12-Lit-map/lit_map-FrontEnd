import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

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
const Breadcrumb = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;
const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
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

const Menu = styled.ul`
  overflow: hidden;
`;

const Title = styled.h4`
  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled.span`
  margin: 0 10px;
`;

const MenuItem = styled.li``;

const MenuItems = styled.div`
  transition: all 0.1s;
`;

const Button = styled.button`
  background-color: #1890ff;
  color: white;
  border: 1px solid #fff0f6;
  padding: 8px 30px;
  cursor: pointer;
`;

const Pagi_position = styled.div`
  margin: 25% 40%;
`;

export default function AdminPage() {
  const [clicked, setClicked] = useState(false);

  // 페이지네이션 변수
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  /* 페이지네이션 */
  function PaginationBasic() {
    return (
      <Pagi_position>
        <Pagination>
          <Pagination.Prev />
          {items} <Pagination.Next />
        </Pagination>
      </Pagi_position>
    );
  }

  return (
    <Container>
      <Sidebar>
        <Menu>
          <Title
            onClick={() => {
              clicked == false ? setClicked(true) : setClicked(false);
            }}
          >
            관리자용 메뉴
            <Arrow>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="14"
                viewBox="0 0 512 512"
                style={{
                  transition: "all 0.1s",
                  transform: clicked == false ? null : "rotate(180deg)",
                }}
              >
                <path
                  fill="#ffffff"
                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                />
              </svg>
            </Arrow>
          </Title>
          <MenuItems style={{ height: clicked == false ? "0" : "100px" }}>
            <MenuItem>가입 승인</MenuItem>
            <MenuItem>작품 등록 승인</MenuItem>
            <MenuItem>회원 관리</MenuItem>
            <MenuItem>홈 화면 관리</MenuItem>
          </MenuItems>
        </Menu>
      </Sidebar>
      <Content>
        <Breadcrumb>
          Breadcrumb Link / Breadcrumb Link / Breadcrumb Link
        </Breadcrumb>{" "}
        <Header>가입 승인</Header>
        <Table>
          <thead>
            <tr>
              <th>
                <input type="checkbox"></input>
              </th>
              <Th>이름</Th>
              <Th>가입일</Th>
              <Th>분야</Th>
              <Th>상태</Th>
              <Th>출판사</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <input type="checkbox"></input>
              </td>
              <Td>하지우</Td>
              <Td>가입일 YY-MM-DD-TT</Td>
              <Td>소설</Td>
              <Td>승인중</Td>
              <Td>출판사</Td>
            </tr>
            <tr>
              <td>
                {" "}
                <input type="checkbox"></input>
              </td>
              <Td>하지우</Td>
              <Td>가입일 YY-MM-DD-TT</Td>
              <Td>소설</Td>
              <Td>승인중</Td>
              <Td>출판사</Td>
            </tr>
          </tbody>
        </Table>{" "}
        <Button>일괄 승인</Button>
        <PaginationBasic></PaginationBasic>
      </Content>
    </Container>
  );
}
