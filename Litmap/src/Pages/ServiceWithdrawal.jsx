import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Text = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    background-color: ${props => (props.primary ? '#1890ff' : 'white')};
    color: ${props => (props.primary ? 'white' : '#000')};
    border: 1px solid ${props => (props.primary ? '#1890ff' : '#ddd')};
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
`;

const ServiceWithdrawal = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleWithdraw = () => {
        // 탈퇴 로직 추가
        console.log("탈퇴하기 클릭됨");
    };

    const handleBackToList = () => {
        navigate("/category2/manage-artworks");
    };

    return (
        <Content>
            <Breadcrumb>
                마이페이지 / <HighlightedText>서비스 탈퇴</HighlightedText>
            </Breadcrumb>
            <Header>서비스 탈퇴</Header>
            <Text>탈퇴하시겠습니까?</Text>
            <Text>탈퇴 시, 추후 작품을 삭제할 수 없습니다.</Text>
            <Input
                type="password"
                placeholder="비밀번호(8~12자리)"
                value={password}
                onChange={handlePasswordChange}
            />
            <ButtonContainer>
                <Button onClick={handleBackToList}>내 작품 목록으로 가기</Button>
                <Button primary onClick={handleWithdraw}>탈퇴하기</Button>
            </ButtonContainer>
        </Content>
    );
};

export default ServiceWithdrawal;
