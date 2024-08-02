import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsPaperclip } from "react-icons/bs";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const Content = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > label,
  div {
    width: 40%;
  }
`;

const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Dropzone = styled.div`
  height: 200px;
  width: 100% !important;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Filename = styled.div`
  width: 100% !important;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px 0;
  height: 40px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const BannerPreview = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50%;
`;

export default function BannerManage() {
  const [fileName, setFileName] = useState([]);
  const [banners, setBanner] = useState([]);
  const [preview, setPreview] = useState(undefined);
  const fileTypes = ["JPG", "PNG", "JPEG"];

  useEffect(() => {
    axios
      .get("https://api.litmap.store/api/board/banner")
      .then((response) => {
        console.log(response);
        setBanner(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fileName]);

  function DragDrop() {
    const handleChange = (file) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("path", "banner");
      console.log(file);

      axios
        .post(
          "https://api.litmap.store/api/files",
          formData,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data.result);
          setPreview(response.data.result);
          setFileName([...fileName, response.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <>
        <UploadBox>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <Dropzone id="dropzone">
              <IoFolderOpenOutline
                style={{ fontSize: "100px", color: "#C5C5C5" }}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: "#C5C5C5",
                }}
              >
                이미지 등록하기 (최대 3개까지 가능합니다)
              </p>
            </Dropzone>
          </FileUploader>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Filename
              onClick={() => {
                setPreview(banners[0]);
              }}
            >
              <BsPaperclip /> {banners[0]}
            </Filename>{" "}
            <Filename
              onClick={() => {
                setPreview(banners[1]);
                console.log(preview);
              }}
            >
              <BsPaperclip /> {banners[1]}
            </Filename>
            <Filename
              onClick={() => {
                setPreview(banners[2]);
              }}
            >
              <BsPaperclip /> {banners[2]}
            </Filename>
          </div>
        </UploadBox>
      </>
    );
  }

  return (
    <Content>
      <Header>홈 화면 관리</Header>
      <DragDrop></DragDrop>
      <p>미리보기</p>
      <BannerPreview>
        {preview === undefined ? (
          <img
            id="noImg"
            style={{
              width: "70%",
            }}
            src="/Rectangle 2.png"
          />
        ) : (
          <img
            style={{
              width: "70%",
            }}
            src={preview}
          />
        )}
      </BannerPreview>
    </Content>
  );
}
