import React, { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 20px;
`;

const Breadcrumb = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
`;

const HighlightedText = styled.span`
    font-weight: bold;
    color: black;
`;

const Header = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #1890ff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
`;

const ProfileEdit = () => {
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        // 비밀번호를 확인하고 다음 단계로 넘어가는 로직 추가
        console.log("Password:", password);
    };

    return (
        <Content>
            <Breadcrumb>
                마이페이지 / <HighlightedText>회원정보 수정</HighlightedText>
            </Breadcrumb>
            <Header>회원정보 수정</Header>
            <div>개인정보 보호를 위해, 비밀번호를 입력해주세요.</div>
            <Input
                type="password"
                placeholder="비밀번호(8~12자리)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSubmit}>회원정보 수정하기</Button>
        </Content>
    );
};

export default ProfileEdit;
