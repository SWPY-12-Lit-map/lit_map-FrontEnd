import styled from "styled-components";
import InfoInput from "./infoInput";
import EditTool from "./editTool";
import { useState } from "react";

const Side = styled.div`
  border: solid 1px black;
  width: 20%;
`;

const Nav = styled.div`
  width: 100%;
  border: solid 1px black;
  & button {
    width: 50%;
  }
`;

export default function Sidebar(props) {
  const state = props.state;
  const setState = props.setState;
  const work = props.work;
  const setWork = props.setWork;

  return (
    <Side>
      <Nav>
        <button
          onClick={() => {
            setState(false);
          }}
        >
          정보입력
        </button>
        <button
          onClick={() => {
            setState(true);
          }}
        >
          관계도 수정
        </button>
      </Nav>
      {state == false ? (
        <InfoInput
          count={props.count}
          setCount={props.setCount}
          work={work}
          setWork={setWork}
        />
      ) : (
        <EditTool />
      )}
    </Side>
  );
}
