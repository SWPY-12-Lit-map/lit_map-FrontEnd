import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Nav = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 40px;
  margin-top: 20px;
`;

const NavLogo = styled(Link)`
  display: flex;
  font-size: 24px;
  margin-right: 10px;

  @media all and (max-width: 960px) {
    font-size: 16px;
  }
`;

const LogoImg = styled.img`
  display: flex;
  width: 110px;
  height: auto;
  margin-left: 10px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40%;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 60px;
  padding: 20px 0px 20px 120px;
  border: 1px solid black;
  border-radius: 30px;
  color: #8d8d8d;
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 20px;
  background-color: unset;
  border: none;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  width: 20px;
  color: #8d8d8d;
`;

const SearchCategory = styled.div`
  width: 150px;
  position: absolute;
  left: 10px;
  color: #8d8d8d;
`;

const DropBtn = styled(DropdownButton)`
  & button {
    width: 110px;
    background-color: unset;
    border: none;
    border-right: solid 1px black;
    padding: 0 5px;
    border-radius: 0px;
    color: black;
    font-weight: 600;
    position: relative;
    bottom: 2px;
    &:hover {
      background-color: white;
      color: #8d8d8d;
    }
    &:first-child:active {
      background-color: white;
      color: #8d8d8d;
    }
    &.show {
      background-color: white;
      color: black;
    }
    &:focus {
      background-color: white;
      color: black;
      box-shadow: none;
    }
  }
`;

const SearchInfo = styled.div`
  border: 1px solid black;
  border-radius: 0 0 30px 30px;
  background-color: white;
  width: 100%;
  height: 500px;
  position: absolute;
  top: 60px;
  z-index: 10;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  & button {
    margin: 0 30px;
  }
`;

const Profile = styled(Link)`
  display: flex;
  font-size: 24px;
  margin-right: 40px;
`;

const ProfileImg = styled.img`
  display: flex;
  width: 40px;
  height: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const SignButton = styled(StyledLink)`
  background-color: #d9d9d9;
  border-radius: 30px;
  width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0px;
  margin-right: 40px;
`;

const AlertBtn = styled.button`
  border: none;
  background: unset;
`;

function Navbar(props) {
  const location = useLocation();

  const navigate = useNavigate();
  const login = props.login;
  const [userInput, setUserInput] = useState(
    localStorage.getItem("recentSearch")
      ? JSON.parse(localStorage.getItem("recentSearch"))
      : []
  ); // 유저가 검색한 값 가져오기
  useEffect(() => {
    window.localStorage.setItem("recentSearch", JSON.stringify(userInput));
  }, [userInput, setUserInput]); // 유저 검색내용 저장
  const [userSearch, setUserSearch] = useState(""); // 유저 검색내용 초기값을 빈 문자열로 설정
  const [searchSort, setSort] = useState(); // 검색 카테고리
  const [state, setState] = useState(false); // 검색창 활성화 여부

  // 특정 영역 외 클릭 시 발생하는 이벤트
  const searchRef = useRef(null);

  useEffect(() => {
    function handleFocus(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        // input 체크 해제
        setState(false);
      }
    }

    document.addEventListener("mouseup", handleFocus);
    return () => {
      document.removeEventListener("mouseup", handleFocus);
    };
  }, [searchRef]);

  // localstorage에서 가져오기
  const [recentSearch, setRecentSearch] = useState();

  const getSearches = () => {
    const getRecentSearch = localStorage.getItem("recentSearch")
      ? JSON.parse(localStorage.getItem("recentSearch"))
      : [];
    setRecentSearch(getRecentSearch);
  };

  useEffect(() => {
    getSearches();
  }, [setUserInput, userInput, userSearch, setUserSearch]);

  const searchKey = (e) => {
    if (e.key === "Enter") {
      console.log(userSearch);
      setUserInput([...userInput, userSearch]);
      setUserSearch("");
      getSearches();
      navigate("/searchresult");
      setState(false);
    }
  };

  const searchBtn = () => {
    setUserInput([...userInput, userSearch]);
    setUserSearch("");
    getSearches();
  };

  // 인물 등록페이지면 안보이게
  const [postPage, setPostPage] = useState(false);
  useEffect(() => {
    if (location.pathname == "/category1") {
      setPostPage(true);
      console.log(postPage);
    } else {
      setPostPage(false);
      console.log(postPage);
    }
  }, [location]);

  return (
    <Nav style={{ display: postPage ? "none" : "flex" }}>
      <NavLogo to="/">
        <LogoImg src="/Logo.png" alt="로고" />
      </NavLogo>

      <SearchBarContainer ref={searchRef}>
        <SearchCategory>
          <DropBtn
            id="dropdown-basic-button"
            title={searchSort ? searchSort : "통합검색"}
          >
            <Dropdown.Item
              onClick={(e) => {
                setSort(e.target.text);
              }}
            >
              작품 제목
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setSort(e.target.text);
              }}
            >
              작가 이름
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                setSort(e.target.text);
              }}
            >
              출판사 이름
            </Dropdown.Item>
          </DropBtn>
        </SearchCategory>
        <SearchBtn
          onClick={() => {
            searchBtn();
          }}
        >
          <SearchIcon icon={faMagnifyingGlass} />
        </SearchBtn>
        <SearchBar
          id="searchBar"
          placeholder="검색어를 입력해주세요"
          className="search"
          value={userSearch}
          style={{
            borderRadius: state ? "30px 30px 0px 0px" : "30px",
            borderBottom: state ? "none" : "solid 1px black",
          }}
          onChange={(e) => {
            setUserSearch(e.target.value);
          }}
          onKeyDown={searchKey}
          onClick={() => {
            state ? setState(false) : setState(true);
          }}
        />
        {state ? (
          <SearchInfo
            style={{
              borderTop: state ? "none" : "black",
            }}
          >
            {recentSearch.map((a, index) => (
              <p key={index}>{a}</p>
            ))}
          </SearchInfo>
        ) : null}
      </SearchBarContainer>

      <Right>
        {login === false ? (
          <>
            <SignButton to="/signup">가입하기</SignButton>
            <StyledLink to="/login">로그인</StyledLink>
          </>
        ) : (
          <>
            <AlertBtn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="28"
                viewBox="0 0 448 512"
              >
                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
              </svg>
            </AlertBtn>
            <Profile to="/mypage">
              <ProfileImg src="profile.png" alt="프로필" />
            </Profile>
          </>
        )}
      </Right>
    </Nav>
  );
}

export default Navbar;
