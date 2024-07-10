import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import KakaoShare from "./KakaoShare";
import DownloadImg from "./DownloadImg";
import Copy from "./Copy";
import NaverShare from "./NaverShare";
import styled from "styled-components";
import { CiShare2 } from "react-icons/ci";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const Btn = styled.button`
  background-color: white;
  border-radius: 20px;
  padding: 5px 10px;
  color: black;
  margin-right: 30px;
  border-radius: 10px;
  width: 40%;
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ShareModal = styled(Modal)``;

const Body = styled.div`
  padding: 0 30px;
  p {
    color: #9f9f9f;
  }
`;

const Danger = styled.span`
  color: red;
`;

const SharePart = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const ShareBtn = styled.button`
  background-color: #8d2741;
  border: solid 1px #8d2741;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 0;
`;

const CopyUrl = styled.div`
  display: flex;
  margin-bottom: 50px;
`;
const UrlBox = styled.div`
  border: solid 1px #e8e8e8;
  background-color: #e8e8e8;
  border-radius: 10px;
  width: 50%;
  padding: 10px 5px;
  text-align: center;
  color: black;
`;
const CopyBtn = styled.button`
  background-color: white;
  border: solid 2px #8d2741;
  border-radius: 10px;
  color: #8d2741;
  padding: 8px 10px;
  margin-left: 20px;
`;

function ModalComponent(props) {
  const [imgUrl, setimgUrl] = useState([]);
  const [url, setUrl] = useState();
  const work = props.work;
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function CopyClipboard(Url) {
    navigator.clipboard
      .writeText(Url)
      .then(() => {
        alert("복사완료!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <ShareModal
      {...props}
      className="Modal"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">공유하기</Modal.Title>
      </Modal.Header>
      <Body>
        <Danger>
          <RiErrorWarningLine color="red" />
          필수사항
        </Danger>
        <p>
          라이선스 관련 공지를 모두 숙지하였으며, 이를 위반할 경우 법적인 제재를
          받을 수 있음을 인지합니다.
        </p>
        <SharePart>
          <ShareBtn>
            <FaInstagram color="white" size={"60px"} />
          </ShareBtn>
          <KakaoShare imgUrl={imgUrl} />
          {/* <DownloadImg imgUrl={imgUrl} setUrl={setUrl} work={work}></DownloadImg> */}
          {/* <Copy imgUrl={imgUrl}></Copy> */}
          <NaverShare />
        </SharePart>
        <CopyUrl>
          <UrlBox>{url}</UrlBox>
          <CopyBtn
            onClick={() => {
              CopyClipboard(url);
            }}
          >
            URL 복사
          </CopyBtn>
        </CopyUrl>
      </Body>
    </ShareModal>
  );
}

export default function ModalBtn(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const work = props.work;

  return (
    <>
      <Btn onClick={() => setModalShow(true)}>
        {" "}
        <CiShare2 />
        공유하기
      </Btn>

      <ModalComponent
        work={work}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
