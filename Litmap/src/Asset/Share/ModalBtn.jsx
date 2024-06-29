import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import KakaoShare from "./KakaoShare";
import DownloadImg from "./DownloadImg";
import Copy from "./Copy";
import NaverShare from "./NaverShare";

function Drop(props) {
  const [imgUrl, setUrl] = useState([]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          공유방법을 선택하세요
        </Modal.Title>
      </Modal.Header>
      <div>
        <KakaoShare imgUrl={imgUrl}></KakaoShare>
        <DownloadImg imgUrl={imgUrl} setUrl={setUrl}></DownloadImg>
        <Copy imgUrl={imgUrl}></Copy>
        <NaverShare></NaverShare>
      </div>
      <Modal.Footer>
        <Button onClick={props.onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Dropping() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        공유하기
      </Button>

      <Drop show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
