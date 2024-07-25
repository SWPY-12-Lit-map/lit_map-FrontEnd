import { useEffect, useState } from "react";
import { useStore } from "../Asset/store";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = styled.div``;

const Navbar = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  padding: 0 2%;
`;

const NavItem = styled.span`
  cursor: pointer;
  text-align: center;
  width: 20%;
  padding: 5px 10px;
  color: ${(props) => (props.isActive ? "#8B0024" : "black")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  border-bottom: ${(props) => (props.isActive ? "solid 5px #8B0024" : "null")};
`;

const Recent = styled.div`
  display: flex;
  align-items: center;
  color: #7d7d7d;
  font-size: 18px;
  font-weight: 600;
  padding: 0 2%;
`;

const ResultCount = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 30px 0;
  padding: 0 2%;
  & > span {
    color: #8b0024;
  }
`;

const NoResult = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;
  & > div {
    font-weight: 600;
    margin: 20px 0 5px 0;
  }
`;

const Category = styled.div``;

const CategoryTitle = styled.h3``;

const CategoryCount = styled.span`
  font-size: 18px;
  color: #8b0024;
`;

const Works = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  gap: 50px 0px;
  padding: 0 140px;

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const Inputs = styled.span`
  border: 1px solid #7d7d7d;
  margin: 10px 10px;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: 400;
  & > button {
    border: none;
    background-color: unset;
    color: #7d7d7d;
  }
`;

const Foot = styled.div`
  background-color: #fbf9f6;
  width: 100%;
  height: 200px;
  padding: 30px 20px 30px 50px;
`;

const FootNav = styled.div`
  margin-top: 20px;
  & > a {
    text-decoration: none;
    margin: 0 10px;
  }
`;

export default function SearchResult({ userInput, setUserInput }) {
  const navigate = useNavigate();
  const { searchResult } = useStore();
  const [displayResults, setDisplayResults] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [worksCount, setWorksCount] = useState(0);

  useEffect(() => {
    // 카테고리 필터링
    const filteredResults = {};
    Object.keys(searchResult).forEach((category) => {
      filteredResults[category] = searchResult[category];
    });
    setDisplayResults(filteredResults);

    // 작품 총 개수 구하기
    const counts = Object.values(searchResult).map(
      (category) => category.count
    );
    const totalCount = counts.reduce((data, count) => data + count, 0);
    setWorksCount(totalCount);
  }, [searchResult]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const deleteRecent = (name) => {
    const updatedUserInput = userInput.filter((item) => item !== name);
    setUserInput(updatedUserInput);
    localStorage.setItem("recentSearch", JSON.stringify(updatedUserInput));
  };

  useEffect(() => {
    console.log(worksCount);
  }, [userInput, setUserInput]);

  // 카테고리 필터
  const filteredResults = Object.keys(displayResults)
    .filter((category, index) => {
      return activeIndex === 0 || activeIndex - 1 === index;
    })
    .reduce((res, key) => ((res[key] = displayResults[key]), res), {});

  return (
    <SearchPage>
      <Recent>
        최근 검색어
        {userInput.map((data, i) => (
          <Inputs key={i}>
            {data}{" "}
            <button
              onClick={() => {
                deleteRecent(data);
              }}
            >
              X
            </button>
          </Inputs>
        ))}
      </Recent>
      <Navbar>
        <NavItem isActive={activeIndex === 0} onClick={() => handleClick(0)}>
          전체
        </NavItem>
        <NavItem isActive={activeIndex === 1} onClick={() => handleClick(1)}>
          책
        </NavItem>
        <NavItem isActive={activeIndex === 2} onClick={() => handleClick(2)}>
          드라마
        </NavItem>
        <NavItem isActive={activeIndex === 3} onClick={() => handleClick(3)}>
          영화
        </NavItem>
        <NavItem isActive={activeIndex === 4} onClick={() => handleClick(4)}>
          웹툰
        </NavItem>
      </Navbar>
      <ResultCount>
        총 <span>{worksCount}</span>건 검색
      </ResultCount>
      {worksCount === 0 ? (
        <NoResult>
          <img src="/Document_empty.png" alt="No Results" />
          <div>검색결과가 없어요</div>
          <p>검색어를 다시 한 번 확인해주세요</p>
        </NoResult>
      ) : (
        Object.keys(filteredResults).map((category) => (
          <Category key={category}>
            <CategoryTitle>
              {category}{" "}
              <CategoryCount>{filteredResults[category].count}</CategoryCount>
            </CategoryTitle>
            <Works>
              {filteredResults[category].works.map((work) => (
                <div
                  key={work.workId}
                  onClick={() => {
                    navigate(`/work/${work.workId}`);
                  }}
                >
                  {work.imageUrl && (
                    <Thumbnail src={work.imageUrl} alt={work.title} />
                  )}
                  <h3>{work.title}</h3>
                </div>
              ))}
            </Works>
          </Category>
        ))
      )}
      <Foot>
        <FootNav>
          <Link to="/개인정보처리방침" style={{ color: "#454545" }}>
            개인정보처리방침
          </Link>
          <span style={{ color: "#9F9F9F" }}>|</span>
          <Link to="/이용약관" style={{ color: "#9F9F9F" }}>
            이용약관
          </Link>
        </FootNav>
        <div style={{ color: "#9F9F9F", marginTop: "20px" }}>
          Copyright 2024. Lit Map(릿맵). All rights reserved.
        </div>
      </Foot>
    </SearchPage>
  );
}
