import React from "react";
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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
`;

const Td = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
`;

const Button = styled.button`
    background-color: #1890ff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
`;

const ArtworkManagement = () => (
    <Content>
        <Breadcrumb>
            마이페이지 / <HighlightedText>내 작품 관리</HighlightedText>
        </Breadcrumb>

        <Header>내 작품 관리</Header>

        <Table>
            <thead>
                <tr>
                <Th>작품명</Th>
                <Th>버전</Th>
                <Th>버전명</Th>
                <Th>장르</Th>
                <Th>등록 상태</Th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <Td>범죄도시4</Td>
                <Td>1.0</Td>
                <Td>v1</Td>
                <Td>액션</Td>
                <Td>
                    <Button>등록 중</Button>
                </Td>
                </tr>
                <tr>
                <Td>인사이드 아웃 2</Td>
                <Td>1.1</Td>
                <Td>version 1.1</Td>
                <Td>애니메이션</Td>
                <Td>
                    <Button>등록 완료</Button>
                </Td>
                </tr>
            </tbody>
        </Table>
    </Content>
);

export default ArtworkManagement;
