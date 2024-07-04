import styled from "styled-components";
import InfoInput from "./infoInput";
import EditTool from "./editTool";

const Side = styled.div`
  border: solid 1px black;
  width: 20%;
  padding: 0 10px;
`;

const Nav = styled.div`
  width: 100%;
  border: solid 1px black;
  & button {
    width: 50%;
  }
`;

const Prevbtn = styled.button`
  background-color: white;
  border: solid 1px black;
  padding: 5px 20px;
`;

const Nextbtn = styled.button`
  color: white;
  background-color: #0d6efd;
  border: none;
  border: solid 1px #0d6efd;
  padding: 5px 20px;
`;

export default function Sidebar(props) {
  const state = props.state;
  const setState = props.setState;
  const work = props.work;
  const setWork = props.setWork;

  return (
    <Side>
      <Nav>
        <button>정보입력</button>
        <button>관계도 수정</button>
      </Nav>
      {state == 1 || state == 2 ? (
        <InfoInput
          count={props.count}
          setCount={props.setCount}
          work={work}
          setWork={setWork}
          newInfos={props.newInfos}
        />
      ) : (
        <EditTool />
      )}
      {state == 2 || state == 3 ? (
        <Prevbtn
          onClick={() => {
            if (state == 2) {
              setState(1);
            } else if (state == 3) {
              setState(2);
            }
          }}
        >
          이전
        </Prevbtn>
      ) : null}
      <Nextbtn
        onClick={() => {
          if (state == 1) {
            setState(2);
          } else if (state == 2) {
            setState(3);
          }
        }}
      >
        다음
      </Nextbtn>
    </Side>
  );
}
