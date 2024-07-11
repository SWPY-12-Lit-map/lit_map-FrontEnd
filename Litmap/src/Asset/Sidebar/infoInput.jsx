import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import Calendar from "../Calender";

const Input = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`;

const Dropzone = styled.div`
  width: 200px;
  height: 200px;
  border: solid 1px black;
`;

const RedStar = styled.span`
  color: red;
`;

export default function InfoInput(props) {
  const count = props.count;
  const setCount = props.setCount;
  const work = props.work;
  const setWork = props.setWork;
  const setNext = props.setNext;
  const [releaseDate, setReleaseDate] = useState(new Date());

  // 장르 변경
  function ChangeDrop(e) {
    document.querySelector("#dropdown-basic-button").innerHTML = e.target.text;
    const info = { ...work, genre: e.target.text };
    setWork(info);
  }

  // 파일 업로드
  const fileTypes = ["JPG", "PNG", "GIF"];

  // 이미지 업로드
  const UploadImg = () => {
    const handleChange = (file) => {
      const imgUrl = URL.createObjectURL(file);
      const info = { ...work, imageUrl: imgUrl };
      setWork(info);
    };

    const CheckInputs = () => {
      const works = Object.values(work);
      const found = works.find((a) => a === "");
      if (found !== "") {
        setNext(true);
      }
    };

    useEffect(() => {
      CheckInputs();
    }, [work, setWork]);

    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <Dropzone id="dropzone">
          {work.thumbnail
            ? "Dropped!"
            : "Click or drag file to this area to upload"}
        </Dropzone>
      </FileUploader>
    );
  };
  return (
    <>
      {/* 제목입력 */}
      <Input>
        <span>
          <RedStar>*</RedStar> 제목:{" "}
        </span>
        <input
          placeholder="제목을 입력해주세요"
          value={work.title}
          onChange={(e) => {
            const info = { ...work, title: e.target.value };
            setWork(info);
          }}
        ></input>
      </Input>
      {/* 시스템 버전 */}
      <Input>
        <span>
          {" "}
          <RedStar>*</RedStar>버전:{" "}
        </span>
        <input
          type="text"
          style={{ background: "light gray" }}
          value={work.version}
          disabled
        ></input>
      </Input>
      {/* 사용자 임의 버전등록 */}
      <Input>
        <span>
          {" "}
          <RedStar>*</RedStar> 버전명:{" "}
        </span>
        <input
          placeholder="버전명을 입력해주세요"
          value={work.versionName}
          onChange={(e) => {
            const info = { ...work, versionName: e.target.value };
            setWork(info);
          }}
        ></input>
      </Input>
      {/*  출판일 선택 */}
      <Calendar
        setReleaseDate={setReleaseDate}
        releaseDate={releaseDate}
        work={work}
        setWork={setWork}
      ></Calendar>
      {/* 출판사 이름 */}
      <Input>
        {" "}
        <RedStar>*</RedStar> 출판사:{" "}
        <input
          id="text"
          placeholder="출판사명을 입력해주세요"
          value={work.publisherName}
          onChange={(e) => {
            const info = { ...work, publisherName: e.target.value };
            setWork(info);
          }}
        ></input>{" "}
      </Input>
      {/* 작가 이름 */}
      <Input>
        {" "}
        <RedStar>*</RedStar> 작가:{" "}
        <input
          id="text"
          placeholder="작가명을 입력해주세요"
          value={work.author}
          onChange={(e) => {
            const info = { ...work, author: e.target.value };
            setWork(info);
          }}
        ></input>
        <button>+</button>
      </Input>
      {/* 장르입력 */}
      <Input>
        <span>
          {" "}
          <RedStar>*</RedStar> 장르
        </span>
        <DropdownButton
          id="dropdown-basic-button"
          title={work.genre ? work.genre : "장르를 선택하세요"}
        >
          {["액션", "코미디", "로맨스", "스릴러"].map((genres, i) => {
            return (
              <Dropdown.Item
                key={i}
                onClick={(e) => {
                  ChangeDrop(e);
                }}
              >
                {genres}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Input>
      {/* 이미지 업로드 */}
      <div style={{ display: "flex" }}>
        <span>
          <RedStar>*</RedStar> 대표 이미지:{" "}
        </span>
        <UploadImg></UploadImg>
      </div>
      {/* 대체 이미지 업로드 */}
      <p>
        <input
          id="checkbox"
          type="checkbox"
          defaultChecked={work.imageUrl ? true : false}
          onClick={() => {
            const info = { ...work, imageUrl: "대체 이미지" };
            setWork(info);
          }}
        ></input>{" "}
        <label htmlFor="checkbox">대체 이미지 등록하기</label>
      </p>
      {/* 등장인물 수 */}
      <Input>
        <span>
          {" "}
          <RedStar>*</RedStar> 등장인물:{" "}
        </span>
        <input
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
            console.log(work);
          }}
          type="number"
        ></input>
      </Input>
    </>
  );
}
