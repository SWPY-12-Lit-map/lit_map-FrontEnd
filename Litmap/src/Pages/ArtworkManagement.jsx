import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

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
    margin-right: 10px;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
    margin-right: 10px;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageButton = styled.button`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 5px 10px;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

const RefreshSection = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
`;

const Status = styled.div`
    background-color: ${({ status }) => status === '임시 저장' ? '#FFF7E6' : status === '게시 완료' ? '#E6F7FF' : '#F6FFED'};
    border: 1px solid ${({ status }) => status === '임시 저장' ? '#FFD591' : status === '게시 완료' ? '#91D5FF' : '#B7EB8F'};
    color: ${({ status }) => status === '임시 저장' ? '#FA8C16' : status === '게시 완료' ? '#1890FF' : '#52C41A'};
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
`;

const ArtworkManagement = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: "오만과 편견",
            modifyDate: "2024.06.20 13:52",
            firstRegisterDate: "2024.06.20 13:40",
            status: "임시 저장",
            author: "김믿음/초록뱀미디어",
        },
        {
            id: 2,
            name: "홍길동전",
            modifyDate: "2024.05.04 09:13",
            firstRegisterDate: "2024.05.01 09:00",
            status: "게시 완료",
            author: "김믿음/초록뱀미디어",
        },
        {
            id: 3,
            name: "사랑의 이해",
            modifyDate: "2024.05.04 09:13",
            firstRegisterDate: "2024.05.01 09:00",
            status: "승인 중",
            author: "김믿음/초록뱀미디어",
        },
    ]);
    const [checkedItems, setCheckedItems] = useState({});
    const [allChecked, setAllChecked] = useState(false);
    const [refreshTime, setRefreshTime] = useState(new Date().toLocaleString());

    const handleCheckAll = () => {
        const newCheckedItems = {};
        data.forEach((item) => {
            newCheckedItems[item.id] = !allChecked;
        });
        setCheckedItems(newCheckedItems);
        setAllChecked(!allChecked);
    };

    const handleCheckItem = (id) => {
        setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
    };

    const handleRefresh = () => {
        setRefreshTime(new Date().toLocaleString());
    };

    const handleDelete = () => {
        const newData = data.filter(item => !checkedItems[item.id]);
        setData(newData);
        setCheckedItems({});
        setAllChecked(false);
    };

    return (
        <Content>
            <Breadcrumb>
                마이페이지 / <HighlightedText>내 작품 관리</HighlightedText>
            </Breadcrumb>

            <Header>내 작품 관리</Header>

            <RefreshSection>
                조회 시간 : {refreshTime}
                <FontAwesomeIcon
                    icon={faRotate}
                    onClick={handleRefresh}
                    style={{ cursor: 'pointer', marginLeft: '10px', color: '#1890ff' }}
                />
            </RefreshSection>

            <Table>
                <thead>
                    <tr>
                        <Th>
                            <CheckBox
                                checked={allChecked}
                                onChange={handleCheckAll}
                            />
                            작품명
                        </Th>
                        <Th>수정일</Th>
                        <Th>최초 등록일</Th>
                        <Th>상태</Th>
                        <Th>작성자</Th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <Td>
                                <CheckBox
                                    checked={!!checkedItems[item.id]}
                                    onChange={() => handleCheckItem(item.id)}
                                />
                                {item.name}
                            </Td>
                            <Td>{item.modifyDate}</Td>
                            <Td>{item.firstRegisterDate}</Td>
                            <Td>
                                <Status status={item.status}>{item.status}</Status>
                            </Td>
                            <Td>{item.author}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Footer>
                <div>
                    <Button onClick={handleDelete}>삭제하기</Button>
                    <Button>수정하기</Button>
                </div>
            </Footer>

            <Pagination>
                <PageButton>Previous</PageButton>
                <PageButton>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>Next</PageButton>
            </Pagination>
        </Content>
    );
};

export default ArtworkManagement;
