import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import Calendar from "../Calender";
import axios from "axios";
import { IoFolderOpenOutline } from "react-icons/io5";
import { BsPaperclip } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";

const Input = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  color: #575757;
`;

const AuthorAddBtn = styled.button`
  background-color: unset;
  border: none;
  position: relative;
  top: 5px;
  left: -10px;
  width: 50%;
  color: inherit;
  &:hover {
    color: #8b0024;
  }
  > svg {
    font-size: 20px;
  }
`;

const Radio = styled.input`
  position: absolute;
  left: 27%;
`;
const RadioLabel = styled.label`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 24px;
    margin-right: 5px;
    color: ${({ checked }) => (checked ? "#8B0024" : "gray")};
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
    &:hover,
    &:active,
    &:focus {
      border-color: black;
      background-color: unset !important;
      color: inherit !important;
    }
  }
  > div {
    width: 100%;
  }
`;

const CustomDropItem = styled(Dropdown.Item)`
  &:active,
  &.active,
  &:hover,
  &:focus {
    border-color: black;
    background-color: #8b0024 !important;
    color: white !important;
  }
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

const TextInput = styled.input`
  background-color: unset;
  width: 100%;
  padding: 5px;
  border: 1px solid #575757;
  border-radius: 5px;
  ::placeholder {
    color: #7d7d7d;
  }
`;

const TextAreaInput = styled.textarea`
  border: 1px solid #7d7d7d;
  background-color: unset;
  border-radius: 10px;
  height: 100px;
  resize: none;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: #7d7d7d;

  & > button:first-of-type {
    position: absolute;
    left: 70px;
    background-color: unset;
    border: none;
    color: #7d7d7d;
  }

  & > button:last-of-type {
    position: absolute;
    right: 70px;
    background-color: unset;
    border: none;
    color: #7d7d7d;
  }
`;

const HumanInput = styled(TextInput)`
  text-align: center;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
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
  const [imageFile, setFile] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

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
      console.log(file.name);
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
          {work.thumbnail ? (
            "Dropped!"
          ) : (
            <IoFolderOpenOutline
              style={{ fontSize: "100px", color: "#C5C5C5" }}
            />
          )}
        </Dropzone>
        <Filename>
          <BsPaperclip />
          {imageFile.name}
        </Filename>
      </FileUploader>
    );
  }

  // 작가 수에 따라 input 추가
  const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { id: Date.now(), value: "" }]);
  };

  // 라디오 기능
  const radioChange = (index) => {
    const updatedInputs = [...inputs];
    const selectedInput = updatedInputs.splice(index, 1)[0];
    updatedInputs.unshift(selectedInput);
    setInputs(updatedInputs);
    setSelectedOptions(
      updatedInputs.map((_, i) =>
        i === 0 ? { checked: true } : { checked: false }
      )
    );
    setWork({
      ...work,
      author: updatedInputs.map((item) => item.value),
    });
    setMainauth(updatedInputs[0].value);
  };

  const isChecked = (index) => {
    return selectedOptions[index] && selectedOptions[index].checked;
  };

  // 빈값 확인
  const CheckInputs = () => {
    const works = Object.values(work);
    const found = works.find((a) => a === "");
    if (found === undefined) {
      setNext(true);
    }
  };

  // 장르 복수 선택
  const handleGenreSelection = (data) => {
    let updatedGenres = [...work.genre];
    if (updatedGenres.includes(data)) {
      updatedGenres = updatedGenres.filter((g) => g !== data);
    } else {
      if (updatedGenres.length >= 2) {
        updatedGenres.shift(); // 가장 오래된 선택된 항목 제거
      }
      updatedGenres.push(data);
    }
    setWork({ ...work, genre: updatedGenres });
  };

  useEffect(() => {
    CheckInputs();
  }, [work, setWork]);

  // 장르 가져오기
  useEffect(() => {
    axios
      .get("https://api.litmap.store/api/genre")
      .then((result) => {
        setGenre(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 카테고리 가져오기
  useEffect(() => {
    axios
      .get("https://api.litmap.store/api/category")
      .then((result) => {
        setCategory(result.data.result);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* 제목입력 */}
      <Input id="title">
        <div>작품명 </div>
        <TextInput
          placeholder="작품명을 입력해주세요"
          value={work.title}
          onChange={(e) => {
            const info = { ...work, title: e.target.value };
            setWork(info);
          }}
        ></TextInput>
      </Input>
      {/* 작가 이름 */}
      <Input id="author">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 5px",
          }}
        >
          작가
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "#8B0024",
              fontSize: "14px",
            }}
          >
            <span className="material-symbols-outlined">check</span>대표작가
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {inputs.map((data, index) => (
            <div
              key={data.id}
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                marginBottom: "10px",
              }}
            >
              <RadioLabel checked={isChecked(index)}>
                <Radio
                  type="radio"
                  name="mainAuthor"
                  id={data.id}
                  value={data.value}
                  checked={isChecked(index)}
                  onChange={() => radioChange(index)}
                />
                <span className="material-symbols-outlined">check</span>
              </RadioLabel>
              <TextInput
                placeholder="작가를 입력해주세요"
                value={work.author[index]}
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
                }}
              />
            </div>
          ))}
        </div>

        <AuthorAddBtn onClick={handleAddInput}>
          <CiCirclePlus /> 작가 추가하기
        </AuthorAddBtn>
      </Input>
      {/* 사용자 임의 버전등록 */}
      <Input id="versionName">
        <span>버전명: </span>
        <TextInput
          placeholder="버전명을 입력해주세요"
          value={work.versionName}
          onChange={(e) => {
            const info = { ...work, versionName: e.target.value };
            setWork(info);
          }}
        ></TextInput>
      </Input>
      {/* 카테고리 */}
      <Input id="category">
        <div>카테고리</div>
        <CustomDropdownButton
          id="카테고리"
          title={work.category == "" ? work.category : "카테고리 (필수)"}
        >
          {getCategory.map((category, i) => {
            return (
              <CustomDropItem
                key={i}
                onClick={() => {
                  ChangeDrop("카테고리", "category", category.name);
                  console.log(work.category);
                }}
              >
                {category.name}
              </CustomDropItem>
            );
          })}
        </CustomDropdownButton>
      </Input>{" "}
      {/* 장르입력 */}
      <Input id="genre">
        <CustomDropdownButton
          id="장르"
          title={work.genre.length > 0 ? work.genre.join(", ") : "장르 (필수)"}
        >
          {getGenres.map((data, i) => (
            <CustomDropItem
              key={i}
              onClick={() => handleGenreSelection(data.name)}
              active={work.genre.includes(data.name)}
            >
              {data.name}
            </CustomDropItem>
          ))}
        </CustomDropdownButton>
      </Input>
      {/* 출판일 선택 */}
      <Calendar
        setReleaseDate={setReleaseDate}
        releaseDate={releaseDate}
        work={work}
        setWork={setWork}
      ></Calendar>
      {/* 이미지 업로드 */}
      <Input id="imageUrl" style={{ display: "flex", width: " 100%" }}>
        <span>대표 이미지: </span>
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
      {/* 작품 설명 */}
      <Input id="contents">
        {" "}
        설명:{" "}
        <TextAreaInput
          id="text"
          placeholder="작품 설명을 입력해주세요"
          value={work.contents}
          onChange={(e) => {
            const info = { ...work, contents: e.target.value };
            setWork(info);
          }}
        ></TextAreaInput>
      </Input>
      {/* 등장인물 수 */}
      <Input id="count">
        <span>
          등장인물 수 설정{" "}
          <span
            style={{
              margin: "0 21px",
              color: "red",
              fontSize: "10px",
            }}
          >
            1명 이하로 설정할 수 없습니다.
          </span>
        </span>{" "}
        <InputArea>
          <button
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button>
          <HumanInput
            value={count}
            onChange={(e) => {
              setCount(e.target.value);
              console.log(work);
            }}
            type="number"
          ></HumanInput>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </InputArea>
      </Input>
    </>
  );
}
