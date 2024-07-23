import styled from "styled-components";
import InfoInput from "./infoInput";
import EditTool from "./editTool";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbArrowsDoubleSwNe } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";

const Side = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  width: 100%;
  height: 100%;
  background-color: #e6ded6;
  border-radius: 0 20px 20px 0;
  position: relative;
  transition: all 1s;
  z-index: 10;
`;

const Nav = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 200;
  padding: 50px 0 0 0;
  background-color: #e9e9e9;
  border-radius: 0 20px 20px 0;
  box-shadow: rgba(30, 41, 46, 0.12) 5px 0px 6px 0px;
`;

const SideMain = styled.div`
  width: 85%;
  padding: 50px 20px;
  z-index: 10;
  border: none;
  border-radius: 0 10px 10px 0;
  z-index: 200;
`;

const SideHideBtn = styled.button`
  position: absolute;
  border: none;
  top: 50px;
  right: -28px;
  height: 50px;
  z-index: 300;
  background-color: #8b0024;
  color: white;
  cursor: pointer;
`;

export default function Sidebar(props) {
  const state = props.state;
  const work = props.work;
  const setWork = props.setWork;
  const next = props.next;
  const setNext = props.setNext;
  const setHide = props.setHide;
  const hideNav = props.hideNav;

  return (
    <Side
      style={{
        transform: hideNav ? "translateX(-100%)" : "translateX(0)",
      }}
    >
      <Nav>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px 0",
            color: state == 1 ? "#8B0024" : "gray",
          }}
        >
          <HiOutlineUserGroup style={{ fontSize: "36px" }} />
          기본설정
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px 0",
            color: state == 2 ? "#8B0024" : " gray",
          }}
        >
          <TbArrowsDoubleSwNe style={{ fontSize: "36px" }} />
          관계도 수정
        </div>
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
            backgroundImg={props.backgroundImg}
          />
        )}
      </SideMain>
      <SideHideBtn
        onClick={() => setHide(!hideNav)}
        style={{ transform: hideNav ? "rotate(180deg)" : "rotate(0)" }}
      >
        <IoIosArrowBack />
      </SideHideBtn>
    </Side>
  );
}
