import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import SimpleCalender from "../Asset/SimpleCalender";
import { format } from "date-fns";

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
  position: relative;
  display: flex;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #c5c5c5;
  padding: 10px 0 5px 0;
  align-items: center;
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
const DenyBar = styled.div`
  position: absolute;
  background-color: white;
  top: 50px;
  right: 10px;
  border: solid 1px gray;
  border-radius: 5px;
  z-index: 10;
  padding: 0 10px 10px 10px;
  & > button {
    position: relative;
    right: -48%;
    background-color: unset;
    border: none;
    font-size: 20px;
  }
  & > div {
    border-top: 1px solid lightgray;
    background-color: white;
    /* margin-top: 20px; */
    padding-top: 10px;
    & > input {
      border-radius: 5px;
    }
    & > button {
      border: none;
      border-radius: 10px;
      background-color: #8b0024;
      color: white;
      padding: 5px 7px;
    }
  }
`;

export default function RegisterAllow() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [deny, setDeny] = useState(false);
  const [denyReason, setReason] = useState("");
  const [change, setChange] = useState(false);
  const [filterData, setFilterData] = useState([]);

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
    const filtered = data.filter((item) => {
      if (filterStatus !== "all" && item.status !== filterStatus) {
        return false;
      }
      if (
        searchTerm &&
        !item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      const itemDate = new Date(item.versionList[0]?.lastUpdateDate);
      if (itemDate < startDate || itemDate > endDate) {
        return false;
      }
      return true;
    });
    setFilterData(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getAxios = () => {
    axios
      .get("https://api.litmap.store/api/board/confirm", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        setData([...result.data.result]);
        setFilterData(result.data.result); // 초기 데이터 필터링
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirm = (versionId) => {
    axios
      .put(`https://api.litmap.store/api/version/confirm/${versionId}`, "", {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        alert("승인이 완료되었습니다");
        getAxios();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAxios();
  }, [change]);

  return (
    <Content>
      <Header>작품 등록 승인</Header>

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
            <span>제목</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </NameArea>
          <DateArea>
            <span>등록날짜별</span>
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
          <CheckboxContainer onClick={handleCheckAll}>
            <CheckboxInput type="checkbox" checked={allChecked} readOnly />
            <CheckboxCustom />
          </CheckboxContainer>
          <Category>
            <div>등록 날짜</div>
            <div>제목</div>
            <div>버전</div>
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
              <span>
                {item?.versionList[0]?.lastUpdateDate &&
                  format(
                    new Date(item.versionList[0].lastUpdateDate),
                    "yyyy년 MM월 dd일"
                  )}
              </span>
              <span>{item.title}</span>
              <span>
                {item?.versionList[0]?.versionName &&
                  item.versionList[0].versionName}
              </span>
              <span>
                <Status
                  onClick={() => {
                    axios
                      .get(`https://api.litmap.store/api/work/${item.workId}`)
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    navigate(`/work/${item.workId}`);
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
                  onClick={() => {
                    confirm(item.versionList[0].versionId);
                  }}
                >
                  승인
                </button>
                <button
                  style={{
                    backgroundColor: "#FFE1DC",
                  }}
                  onClick={() => {
                    setDeny(true);
                  }}
                >
                  거절
                </button>
                {deny ? (
                  <DenyBar>
                    <button
                      onClick={() => {
                        setDeny(false);
                      }}
                    >
                      X
                    </button>
                    <div>
                      <span>반려사유를 입력하세요: </span>{" "}
                      <input
                        onChange={(e) => {
                          setReason(e.target.value);
                        }}
                        type="text"
                      />{" "}
                      <button
                        onClick={() => {
                          axios
                            .post(
                              "https://api.litmap.store/api/version/confirm/decline",
                              { versionId: item.workId, summary: denyReason }
                            )
                            .then((result) => {
                              console.log(result);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        전송
                      </button>
                    </div>
                  </DenyBar>
                ) : null}
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
              color: "#8B0024",
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
