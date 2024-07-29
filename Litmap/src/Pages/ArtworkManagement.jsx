import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faRotateRight,
  faChevronRight,
  faCaretDown,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useStore } from "../Asset/store";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  height: 100%;
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

const Status = styled.div`
  background-color: ${({ status }) =>
    status === "임시 저장"
      ? "#FFE1DC"
      : status === "승인 중"
      ? "#FFF5E6"
      : "#EFF5FF"};
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
  background-color: #f5f5f5;
  color: #7d7d7d;
  padding: 5px 10px;
  border: 1px solid #7d7d7d;
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
    background-color: #8b0024;
    color: #fff;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 10px;
  background-color: #f5f5f5;
  color: #9f9f9f;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 100px;
  outline: none;
  padding: 5px;
  flex-grow: 1;
  background-color: #f5f5f5;
  color: #9f9f9f;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  gap: 10px;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dadada;
  margin-bottom: 10px;
`;

const TreeToggle = styled.span`
  cursor: pointer;
  margin-right: 10px;
`;

const LoadingBar = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  top: 50%;
`;

const ArtworkManagement = ({ setContentHeight }) => {
  const { workInfos, addWorkInfos } = useStore();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.litmap.store/api/board/myWorkList"
  //       );
  //       console.log(response.data.result);
  //       const fetchedData = response.data.result.list.map((item, index) => ({
  //         id: index + 1,
  //         name: item.title,
  //         category: item.category,
  //         workId: item.workId,
  //         author: item.mainAuthor,
  //         publisher: item.publisher,
  //         versions: item.versionLists.map((version) => ({
  //           versionId: version.versionId,
  //           versionName: version.versionName,
  //           versionNum: version.versionNum,
  //           date: version.lastUpdateDate.split("T")[0],
  //           status:
  //             version.confirm === "LOAD"
  //               ? "임시 저장"
  //               : version.confirm === "CONFIRM"
  //               ? "승인 중"
  //               : "게시 완료",
  //         })),
  //       }));
  //       setData(fetchedData);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(data);
  //       console.error("데이터를 불러오는데 실패했습니다.", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    setContentHeight(200 + data.length * 100); // Content 높이 설정
  }, [data, setContentHeight]);

  const handleRefresh = () => {
    setRefreshTime(new Date().toLocaleString());
  };

  /* 작품 삭제 */
  const handleDelete = (workId) => {
    console.log(workId);
    axios
      .delete(`https://api.litmap.store/api/work/${workId}`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(versionId);
        console.log(error);
      });
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  /* 버전삭제 */
  const handleDeleteVersion = (versionId, versionNum) => {
    console.log(versionId);
    console.log(versionNum);
    axios
      .delete(`https://api.litmap.store/api/version/${versionId}/${versionNum}`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    const item = data.find((item) => item.id === id);
    if (item.versions.length === 1) {
      handleDelete(id);
    } else {
      const newData = data.map((item) => {
        if (item.id === id) {
          const newVersions = item.versions.filter(
            (version) => version.versionId !== versionId
          );
          return { ...item, versions: newVersions };
        }
        return item;
      });
      setData(newData);
    }
  };

  const filteredData = data.filter((item) => {
    if (
      filterStatus !== "all" &&
      !item.versions.some((version) => version.status === filterStatus)
    ) {
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

  const toggleExpand = (id) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Content>
      <Header>작품 및 리스트</Header>

      {loading ? (
        <LoadingBar>
          <ClipLoader color="rgba(139, 0, 36, 1)"></ClipLoader>
        </LoadingBar>
      ) : null}
      {/* <button
          onClick={async () => {
            await axios
              .put("https://api.litmap.store/api/version/rollback/17/0.1")
              .then((result) => {
                setLoading(true);
                console.log(result);
                addWorkInfos(result.data.result);
                console.log(workInfos);
                if (result.data.result?.workId) {
                  setLoading(false);
                  navigate("/category1");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          수정하기
        </button> */}
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

      <Controls>
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
      </Controls>

      <Divider />

      <Table>
        <tbody>
          {currentItems.map((item, i) => (
            <React.Fragment key={item.id}>
              <tr>
                <Td onClick={() => toggleExpand(item.id)}>
                  <TreeToggle>
                    {expandedItems[item.id] ? (
                      <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} />
                    )}
                  </TreeToggle>
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.author}</Td>
                <Td>{item.publisher}</Td>
                <Td>
                  <button onClick={() => handleDelete(item.workId)}>
                    삭제하기
                  </button>
                </Td>
              </tr>
              {expandedItems[item.id] &&
                item.versions.map((version, i) => (
                  <tr key={version.versionId}>
                    <Td></Td>
                    <Td>{version.date}</Td>
                    <Td>{version.versionName}</Td>
                    <Td>
                      <Status status={version.status}>{version.status}</Status>
                    </Td>
                    <Td>
                      <button
                        onClick={async () => {
                          await axios
                            .put(
                              `https://api.litmap.store/api/version/rollback/${version.versionId}/0.1`
                            )
                            .then((result) => {
                              console.log(result);
                              addWorkInfos(result.data.result);
                              if (result.data.result?.workId) {
                                navigate("/category1");
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        수정하기
                      </button>
                    </Td>
                    <Td>
                      <button
                        onClick={() =>
                          handleDeleteVersion(
                            item.workId,
                            item.versions[i].versionNum
                          )
                        }
                      >
                        삭제하기
                      </button>
                    </Td>
                  </tr>
                ))}
            </React.Fragment>
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
