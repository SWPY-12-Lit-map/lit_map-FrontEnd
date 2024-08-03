import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsPaperclip } from "react-icons/bs";
import { useStore } from "../store";
import { ChromePicker } from "react-color";
import axios from "axios";

const SelectBackground = styled.div`
  margin-top: 10%;

  & > span {
    color: #7d7d7d;
    font-weight: 600;
  }

  & > label {
    width: 100%;
  }
`;

const Dropzone = styled.div`
  height: 150px;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 10px;
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

const LineSelect = styled.div`
  margin-top: 10%;
  color: #7d7d7d;
  font-weight: 600;
`;

const SelectBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5% 0 3% 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  span {
    font-size: 24px;
    margin-right: 5px;
    color: ${({ checked }) => (checked ? "black" : "gray")};
  }

  input {
    display: none;
  }
`;

const CustomDropdownButton = styled(DropdownButton)`
  > .btn {
    text-align: left;
    width: 100%;
    background-color: unset;
    border-color: #575757;
    color: #575757;
    margin-top: 5%;
    border-radius: 10px;
    &:hover,
    &:active,
    &:focus {
      border: 2px solid #8b0024;
      background-color: unset !important;
      color: #8b0024 !important;
    }
  }
  > div {
    width: 100%;
  }
`;

const CustomDropItem = styled(Dropdown.Item)`
  &:active,
  &:hover,
  &:focus {
    border-color: black;
    background-color: #8b0024 !important;
    color: white !important;
  }
`;

export default function EditTool(props) {
  const {
    setLine,
    setEdgetype,
    edgeType,
    lineStyle,
    setBackImg,
    backgroundImg,
    setWork,
    work,
    backgroundType,
    setBackground,
  } = props;

  const { backgroundColor, setBackgroundColor, setBackgroundImg } = useStore();

  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [imageFile, setFile] = useState("");

  // 이미지 업로드
  const handleChange = async (file) => {
    setFile(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("path", "relationshipBackground");
    await axios
      .post("https://api.litmap.store/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const ImgUrl = {
          ...work,
          relationship: {
            ...work.relationship,
            backgroundImage: response.data.result,
          },
        };
        setWork(ImgUrl);
        setBackgroundImg(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 색깔 고르기
  const handleColorChangeComplete = (color) => {
    console.log(color.hex);
    setBackgroundColor(color.hex);
    setWork({
      ...work,
      relationship: {
        ...work.relationship,
        backgroundColor: "11",
      },
    });
    console.log(work);
  };

  return (
    <div>
      <SelectBackground>
        <span>배경설정</span>
        <SelectBar>
          <RadioLabel
            onClick={() => {
              setBackground(true);
            }}
          >
            <input type="radio" name="BackroundType" />
            <span
              className="material-symbols-outlined"
              style={{
                backgroundColor: backgroundType ? "#af3131" : "unset",
                color: backgroundType ? "white" : "gray",
                borderRadius: "50%",
              }}
            >
              check_circle
            </span>
            이미지
          </RadioLabel>
          <RadioLabel
            onClick={() => {
              setBackground(false);
            }}
          >
            <input type="radio" name="BackroundType" />
            <span
              className="material-symbols-outlined"
              style={{
                backgroundColor: backgroundType ? "unset" : "#af3131",
                color: backgroundType ? "gray" : "white",
                borderRadius: "50%",
              }}
            >
              check_circle
            </span>
            색상
          </RadioLabel>
        </SelectBar>
        {backgroundType ? (
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <Dropzone id="dropzone">
              {imageFile ? (
                "Dropped!"
              ) : (
                <IoFolderOpenOutline
                  style={{ fontSize: "100px", color: "#C5C5C5" }}
                />
              )}
            </Dropzone>
            <Filename>
              <BsPaperclip />
              {backgroundImg?.name}
            </Filename>
          </FileUploader>
        ) : (
          <ChromePicker
            color={backgroundColor}
            onChange={handleColorChangeComplete}
          />
        )}
      </SelectBackground>
      <LineSelect>
        관계선 설정
        <CustomDropdownButton
          id="dropdown-basic-button"
          title={edgeType ? edgeType : "선을 선택하세요"}
        >
          <CustomDropItem onClick={() => setEdgetype("직선")}>
            직선
          </CustomDropItem>
          <CustomDropItem onClick={() => setEdgetype("곡선")}>
            곡선
          </CustomDropItem>
        </CustomDropdownButton>
        <CustomDropdownButton
          id="dropdown-basic-button"
          title={lineStyle ? lineStyle : "선을 선택하세요"}
        >
          <CustomDropItem onClick={() => setLine("실선")}>실선</CustomDropItem>
          <CustomDropItem onClick={() => setLine("점선")}>점선</CustomDropItem>
        </CustomDropdownButton>
      </LineSelect>
    </div>
  );
}
