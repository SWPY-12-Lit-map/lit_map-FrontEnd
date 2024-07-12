import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import Calendar from "../Calender";
import axios from "axios";

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
  const [getGenres, setGenre] = useState([]);
  const [getCategory, setCategory] = useState([]);

  // 장르 변경
  function ChangeDrop(id, sort, data) {
    document.querySelector(`#${id}`).innerHTML = data;
    const info = { ...work, [sort]: data };
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
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <Dropzone id="dropzone">
          {work.imageUrl
            ? "Dropped!"
            : "Click or drag file to this area to upload"}
        </Dropzone>
      </FileUploader>
    );
  };

  // 빈값 확인
  const CheckInputs = () => {
    const works = Object.values(work);
    const found = works.find((a) => a === "");
    if (found === undefined) {
      setNext(true);
    }
  };

  useEffect(() => {
    CheckInputs();
  }, [work, setWork]);

  useEffect(() => {
    axios
      .get("http://43.200.133.58:8080/api/genre")
      .then((result) => {
        console.log(result.data.result);
        setGenre(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

  useEffect(() => {
    axios
      .get("http://43.200.133.58:8080/api/category")
      .then((result) => {
        console.log(result.data.result);
        setCategory(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

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
      {/* 카테고리 */}
      <Input>
        <span>
          {" "}
          <RedStar>*</RedStar> 카테고리
        </span>
        <DropdownButton
          id="카테고리"
          title={work.category ? work.category : "카테고리를 선택하세요"}
        >
          {getCategory.map((category, i) => {
            return (
              <Dropdown.Item
                key={i}
                onClick={() => {
                  ChangeDrop("카테고리", "category", category.name);
                }}
              >
                {category.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Input>
      {/* 출판일 선택 */}
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
          id="장르"
          title={work.genre ? work.genre : "장르를 선택하세요"}
        >
          {getGenres.map((genre, i) => {
            return (
              <Dropdown.Item
                key={i}
                onClick={() => {
                  ChangeDrop("장르", "genre", genre.name);
                }}
              >
                {genre.name}
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
      {/* 작품 설명 */}
      <Input>
        {" "}
        <RedStar>*</RedStar> 부가설명:{" "}
        <input
          id="text"
          placeholder="부가설명을 입력해주세요"
          value={work.contents}
          onChange={(e) => {
            const info = { ...work, contents: e.target.value };
            setWork(info);
          }}
        ></input>
        <button>+</button>
      </Input>
    </>
  );
}
