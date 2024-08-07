import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useStore } from "../Asset/store";
import { useNavigate } from "react-router-dom";
import Calendar from "../Asset/Calender";
import SimpleCalender from "../Asset/SimpleCalender";

const BigButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;

  img {
    margin-right: 10px;
  }

  .text-container {
    flex-grow: 1;
    text-align: left;
  }

  .text-title {
    font-weight: bold;
  }

  .text-subtitle {
    font-size: 12px;
    color: #888;
  }
`;

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
  margin-bottom: 20px;
  font-size: 16px;

  .text-container {
    flex-grow: 1;
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    & > * {
      height: 100%;
    }
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
  align-items: center;
  border-bottom: 1px solid #c5c5c5;
  padding: 10px 0 5px 0;
  justify-content: space-evenly;
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
export default function ArtworkManagement() {
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [member, setMember] = useState([]);
  const { setCondition, condition } = useStore();

  const navigate = useNavigate();

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

  const handleSearch = () => {
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const filteredData = member.filter((item) => {
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

  /* 가입 승인 */
  const AllowAccess = (memberId) => {
    axios
      .put(`https://api.litmap.store/admin/approve/${memberId}/`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        GetwaitMembers(); // 데이터 갱신
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* 가입 대기 회원 조회 */
  const GetwaitMembers = () => {
    axios
      .get("https://api.litmap.store/admin/pending", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        setMember(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetwaitMembers();
  }, []);

  return (
    <Content>
      <BigButton
        onClick={() => {
          setCondition(true);
          console.log(condition);
          navigate("/category1");
        }}
      >
        <img src="/registration.png" alt="등록 아이콘" />
        <div className="text-container">
          <div className="text-title">릿맵 등록하기</div>
          <div className="text-subtitle">
            새 작품의 인물지도를 등록해보세요.
          </div>
        </div>
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </BigButton>
      <Header>가입 승인</Header>

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
          <SearchBtn onClick={handleSearch}>검색</SearchBtn>
        </div>
      </SearchName>

      <Controls>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <CheckboxContainer onClick={handleCheckAll}>
            <CheckboxInput type="checkbox" checked={allChecked} readOnly />
            <CheckboxCustom />
          </CheckboxContainer>
          <Category>
            <div>릿맵 아이디</div>
            <div>이름</div>
            <div>닉네임</div>
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
              <span>{item.litmapEmail}</span>
              <span>{item.name}</span>
              <span>{item.nickname}</span>
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
                  onClick={() => {
                    AllowAccess(item.id);
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
