import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { MdDelete } from "react-icons/md";
import basicImg from "./blank-profile-picture-973460_1280.png";
import { FiPlus } from "react-icons/fi";

const EditInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;

  & > div {
    width: 350px;
    height: 500px;
    margin: 0 10px;
    flex-shrink: 0;
    flex-grow: 0;
    border: none;
    border-radius: 10px;
  }
`;

const DeleteBtn = styled.button`
  margin: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background-color: #e9e9e9;
`;

const CustomImg = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #e9e9e9;
`;

const Btnstyle = styled.div`
  position: relative;
  left: 85%;
  border: none;
  width: 45%;
  padding: 5px 10px;
  :hover {
    cursor: pointer;
  }
  label {
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
`;

const CharacterImg = styled.button`
  background-color: unset;
  border: none;
  font-size: 20px;
  color: #af3131;
`;

const SelectBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  > span {
    margin-right: 15px;
  }
`;

const TextInput = styled.input`
  width: 100%;
  border: solid 1px gray;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
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

const CastAddButton = styled.button`
  font-size: 80px;
  margin: 0 50px;
  color: #c5c5c5;
  border: none;
  background-color: #e9e9e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

export default function EditCharacter(props) {
  const count = props.count;
  const setCount = props.setCount;
  const characterInfos = props.characterInfos;
  const setInfos = props.setInfos;
  const work = props.work;

  const initialState = characterInfos.map(() => ({
    species: "",
    role: "",
    gender: "",
  }));

  const [selectedOptions, setSelectedOptions] = useState(initialState);

  /* 이미지 업로드 */
  const UploadImg = ({ index }) => {
    const fileUpload = (e) => {
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      const updatedInfos = characterInfos.map((info, i) =>
        i === index ? { ...info, imageUrl: imgUrl } : info
      );
      setInfos(updatedInfos);
    };

    return (
      <>
        <label
          htmlFor={`imgUpload${index}`}
          style={{ height: "30%", margin: "0 auto", width: "90%" }}
        >
          <CustomImg src={characterInfos[index].imageUrl || basicImg} rounded />
        </label>

        {characterInfos[index].imageUrl ? (
          <Btnstyle>
            <CharacterImg
              onClick={() => {
                const updatedInfos = characterInfos.map((info, i) =>
                  i === index ? { ...info, imageUrl: "" } : info
                );
                setInfos(updatedInfos);
              }}
            >
              <MdDelete />
            </CharacterImg>
          </Btnstyle>
        ) : (
          <input
            title="프로필 업로드"
            id={`imgUpload${index}`}
            type="file"
            accept="image/*"
            onChange={fileUpload}
          />
        )}
      </>
    );
  };

  const inputChange = (e, data, index) => {
    const updatedInfos = characterInfos.map((info, i) =>
      i === index ? { ...info, [data]: e.target.value } : info
    );
    setInfos(updatedInfos);
    console.log(work);
  };

  // 라디오 변경
  const radioChange = (type, value, index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = { ...updatedOptions[index], [type]: value };
    setSelectedOptions(updatedOptions);
    const updatedInfos = characterInfos.map((info, i) =>
      i === index ? { ...info, [type]: value } : info
    );
    setInfos(updatedInfos);
  };

  const isChecked = (type, value, index) => {
    return selectedOptions[index] && selectedOptions[index][type] === value;
  };
  return (
    <EditInfo>
      {characterInfos.map((info, i) => (
        <Card key={i} id={info.id}>
          <DeleteBtn
            onClick={() => {
              const updatedInfos = characterInfos.filter(
                (character, index) => index !== i
              );
              setInfos(updatedInfos);
              setCount(count - 1);
            }}
          >
            X
          </DeleteBtn>
          <UploadImg index={i} />
          <Card.Body>
            <TextInput
              type="text"
              placeholder="역할의 이름을 입력해주세요"
              value={info.name}
              onChange={(e) => inputChange(e, "name", i)}
            />{" "}
            <TextInput
              placeholder="역할의 한줄 소개를 적어주세요"
              value={info.otherInfo}
              onChange={(e) => inputChange(e, "contents", i)}
            />
            <SelectBar>
              <span>종류</span>
              <RadioLabel checked={isChecked("type", "인간", i)}>
                <input
                  type="radio"
                  name={`type${i}`}
                  value="인간"
                  checked={isChecked("type", "인간", i)}
                  onChange={() => radioChange("type", "인간", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                인간
              </RadioLabel>
              <RadioLabel checked={isChecked("type", "동물", i)}>
                <input
                  type="radio"
                  name={`type${i}`}
                  value="동물"
                  checked={isChecked("type", "동물", i)}
                  onChange={() => radioChange("type", "동물", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                동물
              </RadioLabel>
              <RadioLabel checked={isChecked("type", "사물", i)}>
                <input
                  type="radio"
                  name={`type${i}`}
                  value="사물"
                  checked={isChecked("type", "사물", i)}
                  onChange={() => radioChange("type", "사물", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                사물
              </RadioLabel>
            </SelectBar>
            <SelectBar>
              <span>역할</span>
              <RadioLabel checked={isChecked("role", "주연", i)}>
                <input
                  type="radio"
                  name={`role${i}`}
                  value="주연"
                  checked={isChecked("role", "주연", i)}
                  onChange={() => radioChange("role", "주연", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                주연
              </RadioLabel>
              <RadioLabel checked={isChecked("role", "조연", i)}>
                <input
                  type="radio"
                  name={`role${i}`}
                  value="조연"
                  checked={isChecked("role", "조연", i)}
                  onChange={() => radioChange("role", "조연", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                조연
              </RadioLabel>
              <RadioLabel checked={isChecked("role", "기타", i)}>
                <input
                  type="radio"
                  name={`role${i}`}
                  value="기타"
                  checked={isChecked("role", "기타", i)}
                  onChange={() => radioChange("role", "기타", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                기타
              </RadioLabel>
            </SelectBar>
            <SelectBar>
              <span>성별</span>
              <RadioLabel checked={isChecked("gender", "남성", i)}>
                <input
                  type="radio"
                  name={`gender${i}`}
                  value="남성"
                  checked={isChecked("gender", "남성", i)}
                  onChange={() => radioChange("gender", "남성", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                남자
              </RadioLabel>
              <RadioLabel checked={isChecked("gender", "여성", i)}>
                <input
                  type="radio"
                  name={`gender${i}`}
                  value="여성"
                  checked={isChecked("gender", "여성", i)}
                  onChange={() => radioChange("gender", "여성", i)}
                />
                <span className="material-symbols-outlined">check_circle</span>
                여자
              </RadioLabel>
            </SelectBar>
            <SelectBar>
              <span>나이</span>
              <TextInput
                placeholder="나이"
                value={info.age}
                onChange={(e) => inputChange(e, "age", i)}
              />
            </SelectBar>
            <SelectBar>
              <span>성격</span>
              <TextInput
                placeholder="성격(MBTI 입력)"
                value={info.personality}
                onChange={(e) => inputChange(e, "mbti", i)}
              />
            </SelectBar>
          </Card.Body>
        </Card>
      ))}

      <CastAddButton
        variant="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <FiPlus />
      </CastAddButton>
    </EditInfo>
  );
}
