import styled from "styled-components";
import InfoInput from "./infoInput";
import EditTool from "./editTool";

const Side = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 100%;
`;

const Nav = styled.div`
  width: 100%;
  /* border: solid 1px black; */
  display: flex;
  & span {
    width: 60%;
    text-align: center;
  }
`;

const SideMain = styled.div`
  padding: 0 10px;
`;

export default function Sidebar(props) {
  const state = props.state;
  const setState = props.setState;
  const work = props.work;
  const setWork = props.setWork;
  const next = props.next;
  const setNext = props.setNext;
  return (
    <Side>
      <Nav>
        <span
          style={{
            borderBottom: state == 1 ? "solid 2px blue" : "solid 2px gray",
            display: "block",
            color: state == 1 ? "blue" : "gray",
          }}
        >
          정보입력
        </span>
        <span
          style={{
            borderBottom: state == 2 ? "solid 2px blue" : "solid 2px gray",
            display: "block",
            color: state == 2 ? "blue" : " gray",
          }}
        >
          관계도 수정
        </span>
      </Nav>
      <SideMain>
        {state == 1 ? (
          <InfoInput
            count={props.count}
            setCount={props.setCount}
            work={work}
            setWork={setWork}
            newInfos={props.newInfos}
            next={next}
            setNext={setNext}
            setMainauth={props.setMainauth}
          />
        ) : (
          <EditTool
            setEdgetype={props.setEdgetype}
            setLine={props.setLine}
            edgeType={props.edgeType}
            lineStyle={props.lineStyle}
            backgroundType={props.backgroundType}
            setBackground={props.setBackground}
            setBackImg={props.setBackImg}
            setBackColor={props.setBackColor}
          />
        )}
      </SideMain>
    </Side>
  );
}
