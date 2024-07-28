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

const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Dropzone = styled.div`
  height: 150px;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Filename = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-top: 10px;
  height: 30px;
  text-align: center;
`;

export default function BannerManage() {
  const [preview, setPreview] = useState([]);
  const fileTypes = ["JPG", "PNG", "JPEG"];
  // 이미지 업로드
  function DragDrop() {
    const handleChange = (file) => {
      setFile(file);
      console.log(file.name);
      const formData = new FormData();
      formData.append("image", file); // 여기를 imageFile 대신 file로 수정
      formData.append("path", "bannerImg");
      axios
        .post("https://api.litmap.store/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.result); // 애를 백엔드에 보낼때 img값으로 넣어야함
          // const ImgUrl = { ...work, imageUrl: response.data.result };
          setPreview();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <Dropzone id="dropzone">
          <IoFolderOpenOutline
            style={{ fontSize: "100px", color: "#C5C5C5" }}
          />
        </Dropzone>
        <Filename>
          <BsPaperclip />
          {/* {imageFile.name} */}
        </Filename>
      </FileUploader>
    );
  }

  return (
    <Content>
      <Header>홈 화면 관리</Header>
      <DragDrop />
      <DragDrop />
      <DragDrop />
    </Content>
  );
}
