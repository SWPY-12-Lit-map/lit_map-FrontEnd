import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { useStore } from "../Asset/store";
import { IoTimeOutline } from "react-icons/io5";

const Nav = styled.div`
  width: 100%;
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
  width: 40%;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 60px;
  padding: 20px 0px 20px 125px;
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
  position: relative;
  border: 1px solid black;
  border-radius: 0 0 30px 30px;
  background-color: white;
  width: 100%;
  height: 500px;
  position: absolute;
  top: 60px;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const RecentSearch = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
  & > svg {
    margin-right: 5px;
  }
  & > button {
    position: absolute;
    right: 0;
    background-color: unset;
    border: none;
  }
  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;

  & button {
    margin: 0 30px;
  }
`;

const Profile = styled.div`
  display: flex;
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
  align-items: center;
`;

const ProfileImg = styled.img`
  display: flex;
  width: 40px;
  height: auto;
  border-radius: 50%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9f9f9f;
  &:hover {
    color: #8b0024;
  }
`;

const SignButton = styled(StyledLink)`
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

const LogoutDropdown = styled(Dropdown)`
  display: flex;
  align-items: center;
  margin-right: 40px;
  & > button {
    background: white;
    border: none;
    padding: 0;
    color: black;
    font-size: 24px;
    margin-left: 10px;
    &:hover,
    &:focus,
    &:active {
      background: white;
      outline: none;
      box-shadow: none;
    }
  }
`;

function Navbar({ login, setLogin, userInput, setUserInput }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("/profile.png"); // 기본 프로필 이미지 설정
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인 상태 확인 및 프로필 이미지 불러오기
    const checkLoginStatus = async () => {
      const litmapEmail = getCookie("litmapEmail");
      const memberRoleStatus = getCookie("memberRoleStatus");
      if (litmapEmail) {
        setLogin(true);
        await loadProfileImage(memberRoleStatus);
      } else {
        setLogin(false);
      }
    };

    const loadProfileImage = async (memberRoleStatus) => {
      try {
        let response;
        if (memberRoleStatus === "PUBLISHER_MEMBER") {
          response = await axios.get(
            "https://api.litmap.store/api/publishers/mypage",
            { withCredentials: true }
          );
        } else if (memberRoleStatus === "ACTIVE_MEMBER") {
          response = await axios.get(
            "https://api.litmap.store/api/members/mypage",
            { withCredentials: true }
          );
        } else {
          response = await axios.get("https://api.litmap.store/admin/mypage", {
            withCredentials: true,
          });
        }

        if (response.data.result && response.data.result.userImage) {
          setProfileImage(response.data.result.userImage);
        } else {
          setProfileImage("/profile.png"); // 기본 이미지로 설정
        }
      } catch (error) {
        console.error("Failed to load profile image:", error);

        if (error.response && error.response.status === 500) {
          // 서버 측 오류일 경우 사용자에게 알림
          alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          setProfileImage("/profile.png"); // 에러 발생 시 기본 이미지로 설정
        }
      }
    };

    checkLoginStatus();
  }, [login, setLogin]);

  // 쿠키 값 가져오기
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const [userSearch, setUserSearch] = useState(""); // 유저 검색내용 초기값을 빈 문자열로 설정
  const [searchSort, setSort] = useState("작품 제목"); // 검색 카테고리
  const [state, setState] = useState(false); // 검색창 활성화 여부
  const { searchResult, addSearchResult } = useStore();

  const searchTypeMap = {
    "작품 제목": "TITLE",
    내용: "CONTENTS",
    작가: "AUTHOR",
    출판사: "PUBLISHER",
    회원: "MEMBER",
    "제목 + 내용": "TITLE_AND_CONTENTS",
  };

  const postBody = {
    searchType: searchTypeMap[searchSort] || "",
    question: userSearch,
  };

  // 검색결과
  const search = () => {
    axios
      .post("https://api.litmap.store/api/board/search", postBody)
      .then((result) => {
        addSearchResult(result.data.result);
        if (result.data.resultCode === 200) {
          navigate("/searchresult");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://api.litmap.store/api/members/logout",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLogin(false); // 로그아웃 상태로 설정

        // 모든 쿠키 삭제
        document.cookie.split(";").forEach((cookie) => {
          const name = cookie.split("=")[0].trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });
        console.log("로그아웃 성공, 모든 쿠키 삭제됨");

        navigate("/login"); // 로그인 페이지로 리다이렉트
      }
    } catch (error) {
      console.log("로그아웃 실패:", error);
    }
  };

  // 특정 영역 외 클릭 시 발생하는 이벤트
  const searchRef = useRef(null);

  useEffect(() => {
    function handleFocus(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setState(false);
      }
    }
    document.addEventListener("mousedown", handleFocus);
    return () => {
      document.removeEventListener("mousedown", handleFocus);
    };
  }, [searchRef]);

  // localstorage에서 가져오기
  const [recentSearch, setRecentSearch] = useState([]);

  const getSearches = () => {
    const getRecentSearch = localStorage.getItem("recentSearch")
      ? JSON.parse(localStorage.getItem("recentSearch"))
      : [];
    setRecentSearch(getRecentSearch);
  };

  useEffect(() => {
    getSearches();
  }, [setUserInput, userInput, userSearch, setUserSearch]);

  // 중복 검색어 처리
  const updateSearches = (newSearch) => {
    const updatedSearches = [
      newSearch,
      ...userInput.filter((item) => item !== newSearch),
    ];
    setUserInput(updatedSearches);
    localStorage.setItem("recentSearch", JSON.stringify(updatedSearches));
  };

  const searchKey = (e) => {
    if (e.key === "Enter") {
      updateSearches(userSearch);
      setUserSearch("");
      search();
      setState(false);
    }
  };

  const searchBtn = () => {
    updateSearches(userSearch);
    setUserSearch("");
    search();
  };

  // 인물 등록페이지면 안보이게
  const [postPage, setPostPage] = useState(false);
  useEffect(() => {
    if (location.pathname === "/category1") {
      setPostPage(true);
    } else {
      setPostPage(false);
    }
  }, [location]);

  const handleProfileClick = () => {
    navigate("/category2");
  };

  // 최근 검색어 삭제
  const deleteRecent = (name) => {
    const updatedUserInput = userInput.filter((item) => item !== name);
    setUserInput(updatedUserInput);
    localStorage.setItem("recentSearch", JSON.stringify(updatedUserInput));
  };

  return (
    <Nav style={{ display: postPage ? "none" : "flex" }}>
      <NavLogo to="/">
        <LogoImg src="/Logo.png" alt="로고" />
      </NavLogo>

      <SearchBarContainer ref={searchRef}>
        <SearchCategory>
          <DropBtn id="dropdown-basic-button" title={searchSort}>
            {["작품 제목", "내용", "작가", "회원", "제목 + 내용"].map(
              (data, i) => (
                <Dropdown.Item
                  key={i}
                  onClick={() => {
                    setSort(data);
                    toggleDropdown();
                  }}
                >
                  {data}
                </Dropdown.Item>
              )
            )}
          </DropBtn>
        </SearchCategory>
        <SearchBtn
          onClick={() => {
            searchBtn();
            toggleDropdown();
            search();
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
          onChange={(e) => setUserSearch(e.target.value)}
          onKeyDown={searchKey}
          onClick={() => setState(!state)}
        />
        {state && (
          <SearchInfo
            style={{
              borderTop: state ? "none" : "black",
            }}
          >
            최근 검색어:
            {recentSearch.map((a, index) => (
              <RecentSearch
                key={index}
                onClick={() => {
                  setUserSearch(a);
                  search();
                }}
              >
                <IoTimeOutline /> {a}
                <button onClick={() => deleteRecent(a)}>X</button>
              </RecentSearch>
            ))}
          </SearchInfo>
        )}
      </SearchBarContainer>

      <Right>
        {login === false ? (
          <>
            <SignButton to="/signup">회원가입</SignButton>
            <StyledLink to="/login">로그인</StyledLink>
          </>
        ) : (
          <>
            <Profile onClick={handleProfileClick}>
              <ProfileImg src={profileImage} alt="프로필" />
            </Profile>
            <LogoutDropdown>
              <Dropdown.Toggle id="dropdown-custom-components"></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
            </LogoutDropdown>
          </>
        )}
      </Right>
    </Nav>
  );
}

export default Navbar;
