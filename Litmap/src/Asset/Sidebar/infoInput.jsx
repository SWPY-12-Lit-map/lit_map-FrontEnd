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
  const setMainauth = props.setMainauth;
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [getGenres, setGenre] = useState([]);
  const [getCategory, setCategory] = useState([]);
  const [imageFile, setFile] = useState(null);

  // 장르 변경
  function ChangeDrop(id, sort, data) {
    document.querySelector(`#${id}`).innerHTML = data;
    const info = { ...work, [sort]: data };
    setWork(info);
  }

  // 파일 업로드
  const fileTypes = ["JPG", "PNG", "JPEG"];

  // 이미지 업로드
  function DragDrop() {
    const handleChange = (file) => {
      setFile(file);
      const formData = new FormData();
      formData.append("image", file); // 여기를 imageFile 대신 file로 수정
      formData.append("path", "img");
      axios
        .post("https://api.litmap.store/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.result); // 애를 백엔드에 보낼때 img값으로 넣어야함
          const ImgUrl = { ...work, imageUrl: response.data.result };
          setWork(ImgUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <Dropzone id="dropzone">
          {work.thumbnail
            ? "Dropped!"
            : "Click or drag file to this area to upload"}
        </Dropzone>
      </FileUploader>
    );
  }

  // 작가 수에 따라 input 추가
  const [inputs, setInputs] = useState([
    {
      id: "0",
      value: "",
    },
  ]);

  const handleAddInput = () => {
    const newInput = {
      id: inputs.length,
      value: "",
    };
    setInputs([...inputs, newInput]);
  };

  const authors = inputs.map((input) => input.value);

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
  // // 장르 가져오기
  // useEffect(() => {
  //   axios
  //     .get("https://api.litmap.store/api/genre")
  //     .then((result) => {
  //       console.log(result.data.result);
  //       setGenre(result.data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // // 카테고리 가져오기
  // useEffect(() => {
  //   axios
  //     .get("https://api.litmap.store/api/category")
  //     .then((result) => {
  //       console.log(result.data.result);
  //       setCategory(result.data.result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      {/* 제목입력 */}
      <Input id="title">
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
      <Input id="version">
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
      <Input id="versionName">
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
      <Input id="category">
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
      </Input>{" "}
      {/* 장르입력 */}
      <Input id="genre">
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
      {/* 출판일 선택 */}
      <Calendar
        setReleaseDate={setReleaseDate}
        releaseDate={releaseDate}
        work={work}
        setWork={setWork}
      ></Calendar>
      {/* 작가 이름 */}
      <Input>
        <RedStar>*</RedStar>
        <span>작가명</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {inputs.map((data) => (
            <div key={data.id}>
              <input
                type="radio"
                name="main"
                id={data.id}
                value={data.value}
                onClick={() => {
                  const names = authors;
                  const name = authors.find((name) => name === data.value);
                  const position = names.indexOf(name);
                  [names[0], names[position]] = [names[position], names[0]];
                  setMainauth(name);
                }}
              ></input>
              <input
                placeholder="작가명을 입력해주세요"
                value={data.value}
                onChange={(e) => {
                  const updatedInputs = inputs.map((item) =>
                    item.id === data.id
                      ? { ...item, value: e.target.value }
                      : item
                  );
                  setInputs(updatedInputs);
                  setWork({
                    ...work,
                    author: updatedInputs.map((item) => item.value),
                  });
                  console.log(work);
                }}
              />
            </div>
          ))}
        </div>

        <button onClick={handleAddInput}>+</button>
      </Input>
      {/* 이미지 업로드 */}
      <Input id="imageUrl" style={{ display: "flex" }}>
        <span>
          <RedStar>*</RedStar> 대표 이미지:{" "}
        </span>
        <DragDrop></DragDrop>
      </Input>
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
      <Input id="count">
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
      <Input id="contents">
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
      </Input>
    </>
  );
}
