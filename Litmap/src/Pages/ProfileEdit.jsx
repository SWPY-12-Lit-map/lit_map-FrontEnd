import React, { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`;

const Breadcrumb = styled.div`
    font-size: 14px;
    color: #6c757d;
    margin-bottom: 10px;
`;

const HighlightedText = styled.span`
    font-weight: bold;
    color: #343a40;
`;

const Header = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const ProfileSection = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const ProfileImage = styled.div`
    width: 250px;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-right: 20px;
    position: relative;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
    }

    .nickname {
        font-size: 18px;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .role {
        width: 50px;
        font-size: 14px;
        color: #fff;
        background-color: #8D2741; 
        padding: 5px 10px;
        border-radius: 50px;
        margin-bottom: 10px;
        display: inline-block;
        text-align: center;
    }

    .intro {
        font-size: 12px;
        color: #6c757d;
    }

    .camera-icon {
        position: absolute;
        top: 85px;
        right: 70px;
        cursor: pointer;
        background: white;
        border-radius: 50%;
        padding: 5px;
        border: 1px solid #ccc;
    }

    input[type="file"] {
        display: none;
    }
`;

const ProfileInfo = styled.div`
    flex-grow: 1;
    margin-left: 30px;
`;

const InfoItem = styled.div`
    margin-bottom: 10px;

    .title {
        font-weight: bold;
        margin-bottom: 5px;
        color: #343a40;
    }

    .content {
        color: #495057;
    }
`;

const Button = styled.button`
    background-color: white;
    color: #8D2741;
    border: 1px solid #8D2741;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    width: 50%;
`;

const ProfileEdit = ({ onImageChange }) => {
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setProfileImage(imageUrl);

                onImageChange(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log("Password:", password);
    };

    return (
        <Content>
            <Breadcrumb>
                마이페이지 / <HighlightedText>프로필 관리</HighlightedText>
            </Breadcrumb>
            <Header>프로필 관리</Header>
            <ProfileSection>
                <ProfileImage>
                    <img src={profileImage} alt="프로필 이미지" />
                    <label className="camera-icon">
                        📷
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <div className="nickname">문학동네</div>
                    <div className="role">대표</div>
                    <div className="intro">회사 한줄 소개가 들어가는 곳입니다.</div>
                </ProfileImage>
                <ProfileInfo>
                    <InfoItem>
                        <div className="title">이메일</div>
                        <div className="content">litmap0728@litmap.com</div>
                    </InfoItem>
                    <InfoItem>
                        <div className="title">휴대폰 번호</div>
                        <div className="content">010-0000-0000</div>
                    </InfoItem>
                    <InfoItem>
                        <div className="title">홈페이지 주소</div>
                        <div className="content">https://www.litmap.com</div>
                    </InfoItem>
                    <InfoItem>
                        <div className="title">사업자 주소</div>
                        <div className="content">서울시 강서구 마곡나루</div>
                    </InfoItem>
                    <Button onClick={handleSubmit}>편집하기</Button>
                </ProfileInfo>
            </ProfileSection>
        </Content>
    );
};

export default ProfileEdit;
