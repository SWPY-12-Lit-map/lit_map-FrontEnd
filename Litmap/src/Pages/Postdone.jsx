import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const Container = styled.div`
  text-align: center;
  margin-top: 30px;
`;
const Logo = styled.img``;

const CustomCircle = styled(FaCheckCircle)`
  font-size: 80px;
  color: #52c41a;
  margin-top: 120px;
`;

const Alertbox = styled.div`
  & > h4 {
    font-weight: 600;
    margin-top: 40px;
  }
  & > div {
    margin-top: -5px;
    color: #8c8c8c;
  }
  & > button {
    margin-top: 50px;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #8b0024;
    padding: 10px 40px;
  }
`;

export default function Postdone() {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo src="/Logo.png"></Logo>
      <Alertbox>
        <CustomCircle />
        <h4>제출 완료</h4>
        <div>작품의 인물 관계도가 제출되었습니다.</div>
        <button
          onClick={() => {
            navigate("/category2");
          }}
        >
          마이페이지로 이동
        </button>
      </Alertbox>
    </Container>
  );
}
