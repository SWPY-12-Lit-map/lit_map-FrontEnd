import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faRotateRight, faChevronRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useStore } from "../Asset/store";
import { useNavigate } from "react-router-dom";

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Td = styled.td`
  border-bottom: 1px solid #dadada;
  padding: 10px;

  button {
    border: none;
    background-color: white;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked + span {
    background-color: #8B0024;
    border-color: #8B0024;
  }

  &:checked + span::after {
    display: block;
  }
`;

const CheckboxCustom = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #9F9F9F;
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
  margin-top: 20px;
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
`;

const Status = styled.div`
  background-color: ${({ status }) =>
    status === "임시 저장"
      ? "#FFE1DC"
      : status === "게시 완료"
      ? "#EFF5FF"
      : "#FFF5E6"};
  border: none;
  color: #121212;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #F5F5F5;
  color: #7D7D7D;
  padding: 5px 10px;
  border: 1px solid #7D7D7D;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DropdownContent = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  border: 1px solid #ddd;
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  color: ${({ selected }) => (selected ? "#fff" : "#7D7D7D")};
  background-color: ${({ selected }) => (selected ? "#8B0024" : "#fff")};
  padding: 10px 16px;
  cursor: pointer;
  display: block;
  border-radius: 8px;

  &:hover {
    background-color: #8B0024;
    color: #fff;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 10px;
  background-color: #F5F5F5;
  color: #9F9F9F;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 100px;
  outline: none;
  padding: 5px;
  flex-grow: 1;
  background-color: #F5F5F5;
  color: #9F9F9F;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dadada;
  margin-bottom: 10px;
`;

const ArtworkManagement = () => {
  const { addWorkInfos } = useStore();
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      name: "오만과 편견",
      modifyDate: "2024.06.20",
      firstRegisterDate: "2024.06.20 13:40",
      status: "임시 저장",
    },
    {
      id: 2,
      name: "홍길동전",
      modifyDate: "2024.05.04",
      firstRegisterDate: "2024.05.01 09:00",
      status: "게시 완료",
    },
    {
      id: 3,
      name: "사랑의 이해",
      modifyDate: "2024.05.04",
      firstRegisterDate: "2024.05.01 09:00",
      status: "승인 중",
    },
    {
      id: 4,
      name: "오만과 편견1",
      modifyDate: "2024.06.20",
      firstRegisterDate: "2024.06.20 13:40",
      status: "임시 저장",
    },
    {
      id: 5,
      name: "홍길동전1",
      modifyDate: "2024.05.04",
      firstRegisterDate: "2024.05.01 09:00",
      status: "게시 완료",
    },
    {
      id: 6,
      name: "사랑의 이해1",
      modifyDate: "2024.05.04",
      firstRegisterDate: "2024.05.01 09:00",
      status: "승인 중",
    },
    {
      id: 7,
      name: "사랑의 이해2",
      modifyDate: "2024.05.04",
      firstRegisterDate: "2024.05.01 09:00",
      status: "승인 중",
    },
  ]);
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    const newCheckedItems = { ...checkedItems };
    delete newCheckedItems[id];
    setCheckedItems(newCheckedItems);
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

  return (
    <Content>
      <Header>작품 및 리스트</Header>

      <BigButton onClick={() => (window.location.href = "/category1")}>
        <img src="/registration.png" alt="등록 아이콘" />
        <div className="text-container">
          <div className="text-title">릿맵 등록하기</div>
          <div className="text-subtitle">
            새 작품의 인물지도를 등록해보세요.
          </div>
        </div>
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </BigButton>

      <RefreshSection>
        조회 시간 : {refreshTime}
        <FontAwesomeIcon
          icon={faRotateRight}
          onClick={handleRefresh}
          style={{ cursor: "pointer", marginLeft: "10px", color: "#1890ff" }}
        />
      </RefreshSection>

      <Controls>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CheckboxContainer onClick={handleCheckAll}>
            <CheckboxInput
              type="checkbox"
              checked={allChecked}
              readOnly
            />
            <CheckboxCustom />
          </CheckboxContainer>
          <span>전체보기 (456개)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <DropdownContainer>
            <DropdownButton onClick={() => setShowDropdown(!showDropdown)}>
              상태순 <FontAwesomeIcon icon={faCaretDown} />
            </DropdownButton>
            <DropdownContent show={showDropdown}>
              <DropdownItem
                selected={filterStatus === "임시 저장"}
                onClick={() => setFilterStatus("임시 저장")}
              >
                임시저장
              </DropdownItem>
              <DropdownItem
                selected={filterStatus === "승인 중"}
                onClick={() => setFilterStatus("승인 중")}
              >
                승인중
              </DropdownItem>
              <DropdownItem
                selected={filterStatus === "게시 완료"}
                onClick={() => setFilterStatus("게시 완료")}
              >
                게시완료
              </DropdownItem>
            </DropdownContent>
          </DropdownContainer>
          <SearchBar>
            <SearchInput
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </SearchBar>
        </div>
      </Controls>

      <Divider />

      <Table>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <Td>
                <CheckboxContainer onClick={() => handleCheckItem(item.id)}>
                  <CheckboxInput
                    type="checkbox"
                    checked={checkedItems[item.id] || false}
                    readOnly
                  />
                  <CheckboxCustom />
                </CheckboxContainer>
              </Td>
              <Td>{item.modifyDate}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Status status={item.status}>{item.status}</Status>
              </Td>
              <Td>
                <button
                  onClick={
                    async () => {
                      await axios
                        .put(
                          "https://api.litmap.store/api/version/rollback/7/0.1"
                        )
                        .then((result) => {
                          console.log(result);
                          addWorkInfos(result.data.result);
                          if (result.data.result.workId) {
                            navigate("/category1");
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }
                  }
                >
                  수정하기
                </button>
              </Td>
              <Td>
                <button onClick={() => handleDelete(item.id)}>삭제하기</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

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
            className={`page-number ${currentPage === number ? "active" : ""}`}
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
    </Content>
  );
};

export default ArtworkManagement;
