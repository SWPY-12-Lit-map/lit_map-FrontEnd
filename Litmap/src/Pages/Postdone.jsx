import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;
const Logo = styled.div``;
const Alertbox = styled.div``;

export default function Postdone() {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo>로고자리</Logo>
      <Alertbox>
        <div>check!</div>
        <h3>제출 완료</h3>
        <div>작품의 인물 관계도가 제출되었습니다.</div>
        <button
          onClick={() => {
            navigate("/mypage");
          }}
        >
          마이페이지로 이동
        </button>
      </Alertbox>
    </Container>
  );
}
