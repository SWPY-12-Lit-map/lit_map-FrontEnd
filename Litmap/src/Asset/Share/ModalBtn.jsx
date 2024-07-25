import React, { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import { RiDownloadLine } from "react-icons/ri";

const Btn = styled.button`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 5px 10px;
  margin-left: 20px;
  border-radius: 10px;
  width: 10%;
  padding: 10px 0px;
  z-index: 10;
`;

export default function ModalBtn(props) {
  const [modalShow, setModalShow] = useState(false);
  const [isDownloadOnly, setIsDownloadOnly] = useState(false);
  const workInfo = props.workInfo;

  const handleShareClick = () => {
    setIsDownloadOnly(false);
    setModalShow(true);
  };

  const handleDownloadClick = () => {
    setIsDownloadOnly(true);
    setModalShow(true);
  };

  return (
    <>
      <Btn onClick={handleShareClick}>
        <CiShare2 />
        공유하기
      </Btn>
      <Btn onClick={handleDownloadClick}>
        <RiDownloadLine />
        저장하기
      </Btn>

      <ModalComponent
        workInfo={workInfo}
        show={modalShow}
        onHide={() => setModalShow(false)}
        isDownloadOnly={isDownloadOnly}
      />
    </>
  );
}
