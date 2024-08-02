import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import AdminPage from "./AdminPage";
import MemberEdit from "./MemberEdit";
import ProfileManage from "./ProfileManage";
import ArtworkManagement from "./ArtworkManagement";
import RegisterAllow from "./RegisterAllow";
import MemberManage from "./MemberManage";
import BannerManage from "./BannerManage";
import WithdrawalPage from "./WithdrawalPage";
import { useStore } from "../Asset/store";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #fbf9f6;
  padding: 40px;
  box-sizing: border-box;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #fbf9f6;
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
    background-color: #8d2741;
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
      margin-bottom: 20px;

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

const AdminMenu = styled.ul``;

const MypageLayout = () => {
  const [profile, setProfile] = useState(null);
  const [contentHeight, setContentHeight] = useState(1000);
  const [stats, setStats] = useState({ 작성중인글: 0, 작성한글: 0 });
  const [profileImage, setProfileImage] = useState("");
  const { userId } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async (type) => {
      try {
        const response = await axios.get(
          `https://api.litmap.store/${type}/mypage`,
          {
            withCredentials: true,
          }
        );

        if (response.data.resultCode === 200) {
          const profileData = response.data.result;

          // 역할에 따라 API 호출
          if (profileData.memberRoleStatus === "PUBLISHER_MEMBER") {
            const publisherResponse = await axios.get(
              "https://api.litmap.store/api/publishers/mypage",
              {
                withCredentials: true,
              }
            );
            if (publisherResponse.data.resultCode === 200) {
              setProfile(publisherResponse.data.result);
              setProfileImage(publisherResponse.data.result.userImage);
            } else {
              console.error("Failed to fetch publisher profile");
            }
          } else if (profileData.memberRoleStatus === "PENDING_MEMBER") {
            alert("승인중인 회원입니다");
            navigate("/");
          } else if (profileData.memberRoleStatus === "ACTIVE_MEMBER") {
            setProfile(profileData);
            setProfileImage(profileData.userImage);
          }
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.reason === "사용자 정보가 일치하지 않습니다."
        ) {
          // PUBLISHER_MEMBER로 로그인했는데 잘못된 API 호출 시 예외 처리
          const publisherResponse = await axios.get(
            "https://api.litmap.store/api/publishers/mypage",
            {
              withCredentials: true,
            }
          );
          if (publisherResponse.data.resultCode === 200) {
            setProfile(publisherResponse.data.result);
            setProfileImage(publisherResponse.data.result.userImage);
          } else {
            console.error("Failed to fetch publisher profile");
          }
        } else {
          console.error("Failed to fetch user profile", error);
          navigate("/");
        }
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "https://api.litmap.store/api/board/workCount",
          {
            withCredentials: true,
          }
        );
        setStats({
          작성중인글: response.data.result["작성중인 글"],
          작성한글: response.data.result["작성한 글"],
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    if (userId == 62) {
      fetchUserProfile("admin");
    } else {
      fetchUserProfile("member");
    }

    fetchStats();
  }, [navigate]);

  const getRoleLabel = (role) => {
    switch (role) {
      case "ACTIVE_MEMBER":
        return "작가";
      case "PENDING_MEMBER":
        return "승인중";
      case "ADMIN":
        return "관리자";
      case "PUBLISHER_MEMBER":
        return "출판사";
      default:
        return "기타";
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <Container
      $contentHeight={contentHeight}
      style={{
        backgroundColor: userId == 62 ? "#ABB0BC" : null,
      }}
    >
      <Sidebar
        style={{
          backgroundColor: userId == 62 ? "#ABB0BC" : null,
        }}
      >
        <Box>
          <ProfileSection>
            <img
              src={profileImage || "/profile.png"}
              alt="프로필 이미지"
            />
            <div className="name">{profile.nickname}님</div>
            <div className="role">{getRoleLabel(profile.memberRoleStatus)}</div>
          </ProfileSection>
          <StatsSection>
            <div className="stat">
              <div className="title">작성한 글</div>
              <div className="count">{stats.작성한글}개</div>
            </div>
            <div className="stat">
              <div className="title">작성중인 글</div>
              <div className="count">{stats.작성중인글}개</div>
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
            {userId == 62 ? (
              <AdminMenu>
                <h3>관리자용 메뉴</h3>
                <li>
                  <Link to="adminpage">
                    <img src="/Shape.png" alt="가입승인 이미지" />
                    가입승인
                  </Link>
                  <Link to="adminregister">
                    <img src="/mypage_list.png" alt="작품 등록 승인" />
                    작품 등록 승인
                  </Link>
                  <Link to="membermanage">
                    <img
                      src="/heart-circle-outline.png"
                      alt="회원 관리 이미지"
                    />
                    회원 관리
                  </Link>
                  <Link to="bannermannage">
                    <img src="/home-outline.png" alt="홈 화면 관리 이미지" />홈
                    화면 관리
                  </Link>
                </li>
              </AdminMenu>
            ) : null}
          </MenuSection>
        </Box>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route
            path="/"
            element={<ArtworkManagement setContentHeight={setContentHeight} />}
          />
          <Route
            path="manage-profile"
            element={
              <ProfileManage
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                profile={profile}
                setProfile={setProfile}
              />
            }
          />
          <Route path="edit-member" element={<MemberEdit />} />
          <Route
            path="edit-member/withdrawal"
            element={<WithdrawalPage memberId={profile.id} />}
          />
          <Route
            path="manage-artworks"
            element={<ArtworkManagement setContentHeight={setContentHeight} />}
          />
          <Route path="adminpage" element={<AdminPage />} />
          <Route path="adminregister" element={<RegisterAllow />} />
          <Route path="membermanage" element={<MemberManage />} />
          <Route path="bannermannage" element={<BannerManage />} />
        </Routes>
      </MainContent>
    </Container>
  );
};

export default MypageLayout;
