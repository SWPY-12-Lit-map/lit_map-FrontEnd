import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import AdminPage from "./AdminPage";
import MemberEdit from "./MemberEdit";
import ProfileManage from "./ProfileManage";
import ArtworkManagement from "./ArtworkManagement";
import ServiceWithdrawal from "./ServiceWithdrawal";

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
  width: 100%;
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

        img {
          margin-right: 8px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const MypageLayout = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/60");

  return (
    <Container>
      <Sidebar>
        <Box>
          <ProfileSection>
            <img src={profileImage} alt="프로필 이미지" />
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
                <Link to="manage-profile">
                  <img src="/mypage_profile.png" alt="프로필관리 이미지" />
                  프로필 관리
                </Link>
              </li>
              <li>
                <Link to="edit-member">
                  <img src="/mypage_edit.png" alt="회원정보 수정" />
                  회원정보 수정
                </Link>
              </li>
            </ul>
            <h3>관리</h3>
            <ul>
              <li>
                <Link to="manage-artworks">
                  <img src="/mypage_list.png" alt="작품 리스트" />
                  작품 리스트
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="delete-service">
                  서비스 탈퇴하기
                </Link>
              </li>
              <li>
                <Link to="adminpage">
                  관리자용 메뉴
                </Link>
              </li>
            </ul>
          </MenuSection>
        </Box>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route path="/" element={<ArtworkManagement />} />
          <Route path="manage-profile" element={<ProfileManage profileImage={profileImage} setProfileImage={setProfileImage} />} />
          <Route path="edit-member" element={<MemberEdit />} />
          <Route path="manage-artworks" element={<ArtworkManagement />} />
          <Route path="delete-service" element={<ServiceWithdrawal />} />
          <Route path="adminpage" element={<AdminPage />} />
        </Routes>
      </MainContent>
    </Container>
  );
};

export default MypageLayout;
