import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import KakaoShare from "./KakaoShare";
import DownloadImg from "./DownloadImg";
import NaverShare from "./NaverShare";
import styled from "styled-components";
import { RiErrorWarningLine } from "react-icons/ri";
import { useStore } from "../store";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ShareModal = styled(Modal)``;

const Body = styled.div`
  padding: 0 30px;
  p {
    color: #9f9f9f;
    font-size: 14px;
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

const CopyUrl = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 50px;
`;

const UrlBox = styled.div`
  border: solid 1px #e8e8e8;
  background-color: #e8e8e8;
  border-radius: 10px;
  width: 65%;
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
  width: 35%;
`;

const FacebookShare = styled(CiFacebook)`
  cursor: pointer;
  border-radius: 50%;
  background-color: #8d2741;
  color: white;
  width: 80px;
  height: 80px;
  padding: 20px;
`;

const TwitterShare = styled(FaXTwitter)`
  cursor: pointer;
  border-radius: 50%;
  background-color: #8d2741;
  color: white;
  width: 80px;
  height: 80px;
  padding: 20px;
`;

const CustomDropdownButton = styled(DropdownButton)`
  width: 100%;
  & button {
    width: 60%;
    height: 100%;
    padding: 10px;
    background-color: #e9e9e9;
    border: none;
    color: black;
    position: relative;
    bottom: 2px;
    &:hover {
      background-color: #e9e9e9;
      color: #8d8d8d;
    }
    &:first-child:active {
      background-color: #e9e9e9;
      color: #8d8d8d;
    }
    &.show {
      background-color: #e9e9e9;
      color: black;
    }
    &:focus {
      background-color: #e9e9e9;
      color: black;
      box-shadow: none;
    }
  }
`;

const CustomDropdownItem = styled(Dropdown.Item)`
  &:hover {
    background-color: #8d2741;
    color: white;
  }
  &:first-child:active {
    background-color: #e9e9e9;
    color: #8d8d8d;
  }
  &.show {
    background-color: #8d2741;
    color: black;
  }
  &:focus {
    background-color: #8d2741;
    color: white;
  }
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

function ModalComponent({ workInfo, isDownloadOnly, ...props }) {
  const { imgUrl, setImgUrl, url, setUrl } = useStore();
  const [fileType, setFileType] = useState("PNG");

  useEffect(() => {
    setUrl(window.location.href);
  }, [setUrl]);

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

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(imgUrl)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <ShareModal
      {...props}
      className="Modal"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isDownloadOnly ? "저장하기" : "공유하기"}
        </Modal.Title>
      </Modal.Header>
      <Body>
        {!isDownloadOnly && (
          <>
            <Danger>
              <RiErrorWarningLine color="red" />
              필수사항
            </Danger>
            <p>
              라이선스 관련 공지를 모두 숙지하였으며, 이를 위반할 경우 법적인
              제재를 받을 수 있음을 인지합니다.
            </p>
            <SharePart>
              <KakaoShare imgUrl={imgUrl} />
              <NaverShare />
              <FacebookShare
                src="/Facebook.png"
                alt="Facebook Share"
                onClick={handleFacebookShare}
              />
              <TwitterShare
                src="/Twitter.png"
                alt="Twitter Share"
                onClick={handleTwitterShare}
              />
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
          </>
        )}
        {isDownloadOnly && (
          <>
            {" "}
            <Danger>
              <RiErrorWarningLine color="red" />
              필수사항
            </Danger>
            <p>
              라이선스 관련 공지를 모두 숙지하였으며, 이를 위반할 경우 법적인
              제재를 받을 수 있음을 인지합니다.
            </p>
            <ModalBody>
              <CustomDropdownButton id="파일 확장자 선택" title={fileType}>
                <CustomDropdownItem
                  onClick={(e) => {
                    setFileType(e.target.text);
                  }}
                >
                  PNG
                </CustomDropdownItem>
                <CustomDropdownItem
                  onClick={(e) => {
                    setFileType(e.target.text);
                  }}
                >
                  JPG
                </CustomDropdownItem>
              </CustomDropdownButton>
              <DownloadImg
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                workInfo={workInfo}
                fileType={fileType}
              />
            </ModalBody>
          </>
        )}
      </Body>
    </ShareModal>
  );
}

export default ModalComponent;
