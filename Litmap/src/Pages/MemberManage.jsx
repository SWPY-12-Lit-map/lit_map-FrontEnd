import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useStore } from "../Asset/store";
import { useNavigate } from "react-router-dom";
import Calendar from "../Asset/Calender";
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
    padding: 5px;
    background-color: unset;
    border-radius: 10px;
    margin: 0 5px;
  }
`;

export default function MemberManage() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      date: "2024.07.01",
      userName: "가입자",
      area: "1인 작가",
      workLink: "www.naver.com",
      state: false,
    },
  ]);
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCheckAll = () => {
    const newCheckedItems = {};
    currentItems.forEach((item) => {
      newCheckedItems[item.id] = !allChecked;
    });
    setCheckedItems(newCheckedItems);
    setAllChecked(!allChecked);
  };

  const handleCheckItem = (id) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  const handleRefresh = () => {
    setRefreshTime(new Date().toLocaleString());
  };

  const filteredData = data.filter((item) => {
    if (filterStatus !== "all" && item.status !== filterStatus) {
      return false;
    }
    if (searchTerm && !item.name.includes(searchTerm)) {
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

  const getAxios = () => {
    axios
      .get("https://api.litmap.store/api/board/confirm")
      .then((result) => {
        console.log(result);
        setData([...result.data.result]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DenyAccess = (memberId) => {
    axios
      .get(`https://api.litmap.store/api/members/${memberId}/approve-withdrawl`)
      .then((result) => {
        console.log(result);
        setData([...result.data.result]);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <input type="text" />
          </NameArea>
          <DateArea>
            <span>가입날짜별</span>
            <SelectDate>
              <SimpleCalender date={startDate} setDate={setStartDate} />
              ~
              <SimpleCalender date={endDate} setDate={setEndDate} />
            </SelectDate>
          </DateArea>
          <SearchBtn>검색</SearchBtn>
        </div>
      </SearchName>

      <Controls>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <CheckboxContainer onClick={handleCheckAll}>
            <CheckboxInput type="checkbox" checked={allChecked} readOnly />
            <CheckboxCustom />
          </CheckboxContainer>
          <Category>
            <div>가입 날짜</div>
            <div>이름</div>
            <div>선택 분야</div>
            <div>작품 링크</div>
            <div>상태</div>
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
                  checked={checkedItems[item.id] || false}
                  readOnly
                />
                <CheckboxCustom />
              </CheckboxContainer>
            </div>

            <Category id="memberInfo">
              <span>{item.date}</span>
              <span>{item.userName}</span>
              <span>{item.area}</span>
              <span>
                <Status
                  onClick={() => {
                    navigate(item.workLink);
                  }}
                >
                  작품 보러가기
                </Status>
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#EFF5FF",
                  }}
                >
                  승인
                </button>
                <button
                  style={{
                    backgroundColor: "#FFE1DC",
                  }}
                >
                  거절
                </button>
              </span>
            </Category>
          </div>
        ))}
      </Controls>
      <Foot>
        {" "}
        <ChooseBtn>
          <button
            style={{
              color: "#007BFF",
              borderColor: "#007BFF",
            }}
          >
            일괄 승인
          </button>
          <button
            style={{
              color: "#8B0024 ",
              borderColor: "#8B0024",
            }}
          >
            일괄 거절
          </button>
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
