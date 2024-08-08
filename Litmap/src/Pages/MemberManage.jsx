import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SimpleCalender from "../Asset/SimpleCalender";

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const NameArea = styled.div`
  & > span {
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 6px 10px;
    margin-right: 10px;
  }
  & > input {
    border: none;
    border-radius: 5px;
    padding: 6px;
    width: 67%;
  }
`;

const DateArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > span {
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 6px 10px;
    margin-right: 10px;
  }
`;

const SearchName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background-color: #e2e5eb;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;

  .text-container {
    flex-grow: 1;
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & > * {
      height: 100%;
    }
  }
`;

const SelectDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    margin: 5px;
  }
`;

const SearchBtn = styled.button`
  border: 1px solid #8b0024;
  color: #8b0024;
  border-radius: 5px;
  padding: 5px 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked + span {
    background-color: #8b0024;
    border-color: #8b0024;
  }

  &:checked + span::after {
    display: block;
  }
`;

const CheckboxCustom = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #9f9f9f;
  border-radius: 50%;
  position: relative;
  background-color: white;
  margin-right: 10px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
    display: none;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  .page-number {
    cursor: pointer;
    margin: 0 5px;
    &.active {
      font-weight: bold;
      color: black;
    }
  }

  .page-control {
    cursor: pointer;
    margin: 0 5px;
    color: #aaa;
  }
`;

const RefreshSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;

  font-size: 12px;
  color: #9f9f9f;
`;

const Status = styled.div`
  background-color: #dcdcdc;
  border: none;
  color: #121212;
  padding: 5px 10px;
  border-radius: 10px;
  display: inline-block;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #c5c5c5;
  padding: 10px 0 5px 0;
  & > span {
    width: 20%;
    & > button {
      border: none;
      padding: 5px 10px;
      border-radius: 15px;
      margin: 0 5px;
    }
  }
  & > div {
    width: 20%;
  }
`;
const Controls = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const Foot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChooseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  & > button {
    background-color: unset;
    padding: 5px;
    border-radius: 10px;
    margin: 0 5px;
    border-color: #8b0024;
    color: #8b0024;
    :active,
    :focus,
    :target {
      border-color: #8b0024;
    }
  }
`;

export default function MemberManage() {
  const [data, setData] = useState([]);
  const [checkedItem, setCheckedItem] = useState(null);
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCheckItem = (id) => {
    setCheckedItem(checkedItem === id ? null : id);
    console.log(id);
  };

  const handleRefresh = () => {
    setRefreshTime(new Date().toLocaleString());
  };

  const handleSearch = () => {
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const filteredData = data.filter((item) => {
    if (filterStatus !== "all" && item.status !== filterStatus) {
      return false;
    }
    if (
      searchTerm &&
      !item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 회원 조회
  useEffect(() => {
    axios
      .get("https://api.litmap.store/admin/all", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        setData(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 회원 탈퇴 승인
  const DenyAccess = (memberId) => {
    axios
      .post(`https://api.litmap.store/admin/approve-withdrawl/${memberId}/`)
      .then((result) => {
        console.log(result);
        alert("탈퇴처리완료!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDenyAccess = () => {
    if (checkedItem) {
      DenyAccess(checkedItem);
    }
  };

  return (
    <Content>
      <Header>회원 관리</Header>

      <RefreshSection>
        조회 시간 : {refreshTime}
        <FontAwesomeIcon
          icon={faRotateRight}
          onClick={handleRefresh}
          style={{ cursor: "pointer", marginLeft: "10px", color: "#1890ff" }}
        />
      </RefreshSection>

      <SearchName>
        <div className="text-container">
          <NameArea>
            <span>이름</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </NameArea>
          <DateArea>
            <span>가입날짜별</span>
            <SelectDate>
              <SimpleCalender date={startDate} setDate={setStartDate} />
              ~
              <SimpleCalender date={endDate} setDate={setEndDate} />
            </SelectDate>
          </DateArea>
          <SearchBtn onClick={handleSearch}>검색</SearchBtn>
        </div>
      </SearchName>

      <Controls>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Category>
            <div>릿맵 아이디</div>
            <div>이름</div>
            <div>닉네임</div>
            <div>업무용 이메일</div>
            <div>작품보러가기</div>
          </Category>
        </div>

        {currentItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div>
              <CheckboxContainer onClick={() => handleCheckItem(item.id)}>
                <CheckboxInput
                  type="checkbox"
                  checked={checkedItem === item.id}
                  readOnly
                />
                <CheckboxCustom />
              </CheckboxContainer>
            </div>

            <Category id="memberInfo">
              {/* <span>{item.memberRoleStatus}</span> */}
              <span>{item.litmapEmail}</span>
              <span>{item.name}</span>
              <span>{item.nickname}</span>
              <span>{item.workEmail}</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    item.urlLink == null
                      ? alert("링크가 존재하지 않습니다")
                      : (location.href = item.urlLink);
                  }}
                >
                  작품보러가기
                </button>
              </span>
            </Category>
          </div>
        ))}
      </Controls>
      <Foot>
        <ChooseBtn>
          <button onClick={handleDenyAccess}>탈퇴처리</button>
        </ChooseBtn>
        <Pagination>
          <span
            className="page-control"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </span>
          {pageNumbers.map((number) => (
            <span
              key={number}
              className={`page-number ${
                currentPage === number ? "active" : ""
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </span>
          ))}
          <span
            className="page-control"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            &gt;
          </span>
        </Pagination>
      </Foot>
    </Content>
  );
}
