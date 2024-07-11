import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: #FBF9F6;
  padding: 40px;
  box-sizing: border-box;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #FBF9F6;
  padding: 20px;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  flex-grow: 1;
  max-width: 800px;
  padding: 20px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }

  .role {
    font-size: 14px;
    color: #fff;
    background-color: #8D2741;
    padding: 5px 10px;
    border-radius: 50px;
    display: inline-block;
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #eaeaea;
  border-radius: 5px;
  margin-bottom: 20px;

  .stat {
    text-align: center;

    .title {
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 5px;
    }

    .count {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

const MenuSection = styled.div`
  h3 {
    font-size: 16px;
    color: #767676;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;

      a {
        color: #000;
        text-decoration: none;
        display: flex;
        align-items: center;

        &:hover {
          text-decoration: underline;
        }

        .icon {
          margin-right: 8px;
          color: #000;
        }
      }
    }
  }
`;

const MypageLayout = () => {
  return (
    <Container>
      <Sidebar>
        <Box>
          <ProfileSection>
            <img src="https://via.placeholder.com/60" alt="프로필 이미지" />
            <div className="name">문학동네님</div>
            <div className="role">대표</div>
          </ProfileSection>
          <StatsSection>
            <div className="stat">
              <div className="title">작성한 글</div>
              <div className="count">213개</div>
            </div>
            <div className="stat">
              <div className="title">작성중인 글</div>
              <div className="count">387개</div>
            </div>
          </StatsSection>
        </Box>
        <Box>
          <MenuSection>
            <h3>계정</h3>
            <ul>
              <li>
                <Link to="edit-profile">
                  <FontAwesomeIcon icon={faFaceSmile} className="icon" />
                  프로필 관리
                </Link>
              </li>
              <li>
                <Link to="security">
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  로그인 및 보안
                </Link>
              </li>
            </ul>
            <h3>관리</h3>
            <ul>
              <li>
                <Link to="manage-artworks">
                  <FontAwesomeIcon icon={faBookOpen} className="icon" />
                  작품 리스트
                </Link>
              </li>
              <li>
                <Link to="settings">
                  <FontAwesomeIcon icon={faGear} className="icon" />
                  환경 설정
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="delete-service">
                  <FontAwesomeIcon icon={faUserXmark} className="icon" />
                  서비스 탈퇴하기
                </Link>
              </li>
              <li>
                <Link to="adminpage">
                  <FontAwesomeIcon icon={faPeopleRoof} className="icon" />
                  관리자용 메뉴
                </Link>
              </li>
            </ul>
          </MenuSection>
        </Box>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default MypageLayout;
