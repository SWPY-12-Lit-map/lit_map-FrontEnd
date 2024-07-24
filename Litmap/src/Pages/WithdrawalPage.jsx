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

const Header = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
`;

const SubHeader = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Description = styled.div`
    font-size: 12px;
    margin-bottom: 20px;
    color: #959595;
`;

const CheckboxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;

    & > div {
        width: calc(50% - 10px);
    }
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #343a40;
`;

const CheckboxInput = styled.input`
    display: none;

    &:checked + span {
        background-color: #8B0024;
        border-color: #8B0024;
    }

    &:checked + span::after {
        display: block;
    }
`;

const CheckboxCustom = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #9F9F9F;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    background-color: white;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
        display: none;
    }
`;

const Notice = styled.div`
    margin-top: 20px;
    font-size: 12px;
    color: #959595;

    p {
        margin-bottom: 1px;
    }
`;

const OkCheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #343a40;
`;

const OkCheckboxInput = styled.input`
    display: none;

    &:checked + span {
        background-color: #8B0024;
        border-color: #8B0024;
    }

    &:checked + span::after {
        display: block;
    }
`;

const OkCheckboxCustom = styled.span`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #9F9F9F;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    background-color: white;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
        display: none;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`;

const Button = styled.button`
    background-color: ${(props) => (props.primary ? "#E7C6CE" : "white")};
    color: ${(props) => (props.primary ? "white" : "#7D7D7D")};
    border: ${(props) => (props.primary ? "none" : "1px solid #7D7D7D")};
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    width: 100px;
    font-size: 15px;

    &:hover {
        background-color: ${(props) => (props.primary ? "#8B0024" : "#f8f9fa")};
    }
`;

const WithdrawalPage = ({ onCancel, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState("");
    const [checked, setChecked] = useState(false);

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleCheckedChange = () => {
        setChecked(!checked);
    };

    const handleConfirmClick = () => {
        if (selectedReason && checked) {
            onConfirm();
        } else {
            alert("모든 항목을 체크해주세요.");
        }
    };

    return (
        <Content>
            <Header>서비스 탈퇴</Header>
            <SubHeader>탈퇴 사유가 무엇인가요?</SubHeader>
            <Description>의견을 바탕으로 서비스 개선에 더욱 힘쓰겠습니다.</Description>
            <CheckboxContainer>
                <div>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="radio"
                            name="reason"
                            value="이용이 불편하고 장애가 많아서"
                            checked={selectedReason === "이용이 불편하고 장애가 많아서"}
                            onChange={handleReasonChange}
                        />
                        <CheckboxCustom />
                        이용이 불편하고 장애가 많아서
                    </CheckboxLabel>
                </div>
                <div>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="radio"
                            name="reason"
                            value="제공되는 콘텐츠가 부족해서"
                            checked={selectedReason === "제공되는 콘텐츠가 부족해서"}
                            onChange={handleReasonChange}
                        />
                        <CheckboxCustom />
                        제공되는 콘텐츠가 부족해서
                    </CheckboxLabel>
                </div>
                <div>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="radio"
                            name="reason"
                            value="다른 서비스가 더 좋아서"
                            checked={selectedReason === "다른 서비스가 더 좋아서"}
                            onChange={handleReasonChange}
                        />
                        <CheckboxCustom />
                        다른 서비스가 더 좋아서
                    </CheckboxLabel>
                </div>
                <div>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="radio"
                            name="reason"
                            value="정보 유출을 우려해서"
                            checked={selectedReason === "정보 유출을 우려해서"}
                            onChange={handleReasonChange}
                        />
                        <CheckboxCustom />
                        정보 유출을 우려해서
                    </CheckboxLabel>
                </div>
                <div>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="radio"
                            name="reason"
                            value="서비스 사용 빈도가 낮아서"
                            checked={selectedReason === "서비스 사용 빈도가 낮아서"}
                            onChange={handleReasonChange}
                        />
                        <CheckboxCustom />
                        서비스 사용 빈도가 낮아서
                    </CheckboxLabel>
                </div>
                <div>
                    <CheckboxLabel>
                        <CheckboxInput
                            type="radio"
                            name="reason"
                            value="웹사이트 사용이 불편해서"
                            checked={selectedReason === "웹사이트 사용이 불편해서"}
                            onChange={handleReasonChange}
                        />
                        <CheckboxCustom />
                        웹사이트 사용이 불편해서
                    </CheckboxLabel>
                </div>
            </CheckboxContainer>
            <SubHeader>회원탈퇴안내</SubHeader>
            <Notice>
                <p>· 회원 탈퇴 시 작성된 작품목록은 자동으로 삭제되지 않습니다.</p>
                <p>· 탈퇴 후에는 동일한 이메일 주소로 다시 가입할 수 없습니다.</p>
                <p>· 회원 탈퇴 후 3개월간 재가입이 어렵습니다.</p>
                <p>· 회원 탈퇴 후 회원정보는 자동 삭제됩니다.</p>
            </Notice>
            <OkCheckboxLabel>
                <OkCheckboxInput
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckedChange}
                />
                <OkCheckboxCustom />
                위 내용을 확인했으며, 탈퇴를 진행합니다.
            </OkCheckboxLabel>
            <ButtonContainer>
                <Button onClick={onCancel}>취소하기</Button>
                <Button primary onClick={handleConfirmClick}>탈퇴하기</Button>
            </ButtonContainer>
        </Content>
    );
};

export default WithdrawalPage;
