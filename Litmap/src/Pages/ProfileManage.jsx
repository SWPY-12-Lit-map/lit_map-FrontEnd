import React, { useState, useEffect } from "react";
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

const Header = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const InfoItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    position: relative;

    .title {
        font-weight: bold;
        margin-right: 10px;
        color: #343a40;
    }

    .description {
        color: #6c757d;
        margin-right: 10px;
    }

    .content {
        color: #495057;
        margin-right: 10px;
    }

    input {
        width: 300px;
        padding: 8px;
        margin-right: 10px;
        border: 1px solid #9F9F9F;
        border-radius: 10px;
        color: #9F9F9F;
        font-size: 13px;
        position: relative;
    }

    .char-counter {
        position: absolute;
        right: 15px;
        bottom: 5px;
        font-size: 12px;
        color: #6c757d;
    }
`;

const ProfileImage = styled.div`
    margin-bottom: 20px;
    font-weight: bold;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
    }

    .camera-icon {
        display: flex;
        align-items: center;
        cursor: pointer;
        background: white;
        border-radius: 4px;
        padding: 5px;
        border: 1px solid #8B0024;
        margin-right: 10px;
        
        img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            margin-top: 10px;
        }
    }

    input[type="file"] {
        display: none;
    }

    .delete-button {
        display: flex;
        align-items: center;
        background-color: white;
        color: #575757;
        border: 1px solid #D9D9D9;
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;

        img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            margin-top: 10px;
        }
    }

    .button-container {
        display: flex;
        gap: 10px;
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
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        width: 45%;
    }
`;

const Note = styled.div`
    font-size: 12px;
    color: #6c757d;
    margin-top: 20px;
`;

const ProfileManage = ({ profileImage, setProfileImage }) => {
    const [nickname, setNickname] = useState("문학동네");
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = () => {
            const fetchedMessage = "";
            setMessage(fetchedMessage);
        };

        fetchProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setProfileImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setProfileImage("https://via.placeholder.com/100");
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        console.log("저장된 닉네임:", nickname);
        console.log("저장된 메시지:", message);
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    return (
        <Content>
            <Header>프로필 관리</Header>
            <ProfileSection>
                <InfoItem>
                    <div className="title">닉네임</div>
                    {editing ? (
                        <>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                maxLength={10}
                            />
                            <div className="char-counter">{nickname.length}/10</div>
                        </>
                    ) : (
                        <input
                            type="text"
                            value={nickname}
                            readOnly
                        />
                    )}
                </InfoItem>
                <InfoItem>
                    <div className="title">메시지</div>
                    {editing ? (
                        <>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={30}
                                placeholder="메시지를 입력해주세요."
                            />
                            <div className="char-counter">{message.length}/30</div>
                        </>
                    ) : (
                        <input
                            type="text"
                            value={message || "메시지를 입력해주세요."}
                            readOnly
                        />
                    )}
                </InfoItem>
                <ProfileImage>
                    <div className="title">프로필 이미지</div>
                    <img src={profileImage} alt="프로필 이미지" />
                    <div className="button-container">
                        {editing ? (
                            <>
                                <label className="camera-icon">
                                    <img src="/mypage_camera.png" alt="카메라 아이콘" />
                                    이미지 변경
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                </label>
                                <button className="delete-button" onClick={handleDeleteImage}>
                                    <img src="/mypage_close.png" alt="삭제 아이콘" />
                                    삭제
                                </button>
                            </>
                        ) : null}
                    </div>
                </ProfileImage>
                {editing ? (
                    <ButtonContainer>
                        <Button onClick={handleSave}>저장하기</Button>
                        <Button onClick={handleCancel}>취소하기</Button>
                    </ButtonContainer>
                ) : (
                    <Button onClick={handleEdit}>편집하기</Button>
                )}

                <Note>회원 기본 정보는 회원정보 수정에서 가능합니다.</Note>
            </ProfileSection>
        </Content>
    );
};

export default ProfileManage;
