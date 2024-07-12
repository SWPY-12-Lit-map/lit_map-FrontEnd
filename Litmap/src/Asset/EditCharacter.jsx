import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AiOutlineUpload } from "react-icons/ai";
import basicImg from "./blank-profile-picture-973460_1280.png";

const EditInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  & > div {
    width: 300px;
    height: 500px;
    margin: 0 10px;
    flex-shrink: 0;
    flex-grow: 0;
  }
`;

const Btnstyle = styled.div`
  border: solid 1px black;
  width: 45%;
  padding: 5px 10px;
  :hover {
    cursor: pointer;
  }
  label {
    width: 100%;
    display: flex;
    align-items: center;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default function EditCharacter(props) {
  const count = props.count;
  const setCount = props.setCount;
  const characterInfos = props.characterInfos;
  const setInfos = props.setInfos;
  const work = props.work;

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
        <Image
          src={characterInfos[index].imageUrl || basicImg}
          style={{ width: "100px", height: "100px" }}
          roundedCircle
        />
        <Btnstyle>
          {characterInfos[index].imageUrl ? (
            <>
              <button
                onClick={() => {
                  const updatedInfos = characterInfos.map((info, i) =>
                    i === index ? { ...info, imageUrl: "" } : info
                  );
                  setInfos(updatedInfos);
                }}
              >
                식제
              </button>
            </>
          ) : (
            <>
              <label htmlFor={`imgUpload${index}`}>
                {" "}
                <AiOutlineUpload />
                이미지업로드
              </label>
              <input
                title="프로필 업로드"
                id={`imgUpload${index}`}
                type="file"
                accept="image/*"
                onChange={fileUpload}
              />
            </>
          )}
        </Btnstyle>
      </>
    );
  };

  function ChangeDrop(e, key, index) {
    const updatedInfos = characterInfos.map((info, i) =>
      i === index ? { ...info, [key]: e.target.text } : info
    );
    setInfos(updatedInfos);
  }

  const inputChange = (e, data, index) => {
    const updatedInfos = characterInfos.map((info, i) =>
      i === index ? { ...info, [data]: e.target.value } : info
    );
    setInfos(updatedInfos);
    console.log(work);
  };

  return (
    <EditInfo>
      {characterInfos.map((info, i) => (
        <Card key={i} id={info.id}>
          <UploadImg index={i} />
          <Card.Body>
            <Card.Title>캐릭터 정보를 입력하세요</Card.Title>
            <input
              type="text"
              placeholder="이름"
              value={info.name}
              onChange={(e) => inputChange(e, "name", i)}
            />

            <DropdownButton
              id={`species${i}`}
              title={info.type || "인간/동물/사물 중 선택하세요"}
              variant="none"
            >
              {["인간", "동물", "사물"].map((data, j) => (
                <Dropdown.Item
                  key={j}
                  onClick={(e) => {
                    ChangeDrop(e, "type", i);
                  }}
                >
                  {data}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <DropdownButton
              id={`main${i}`}
              title={info.role || "주/조연 선택"}
              variant="none"
            >
              {["주연", "조연"].map((data, j) => (
                <Dropdown.Item
                  key={j}
                  onClick={(e) => {
                    ChangeDrop(e, "role", i);
                  }}
                >
                  {data}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <DropdownButton
              id={`gender${i}`}
              title={info.gender || "성별"}
              variant="none"
            >
              {["남성", "여성"].map((data, j) => (
                <Dropdown.Item
                  key={j}
                  onClick={(e) => {
                    ChangeDrop(e, "gender", i);
                  }}
                >
                  {data}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <input
              placeholder="나이"
              value={info.age}
              onChange={(e) => inputChange(e, "age", i)}
            />
            <input
              placeholder="성격(MBTI 입력)"
              value={info.personality}
              onChange={(e) => inputChange(e, "mbti", i)}
            />
            <input
              placeholder="그 외 정보"
              value={info.otherInfo}
              onChange={(e) => inputChange(e, "contents", i)}
            />
          </Card.Body>
          <Button
            variant="danger"
            onClick={() => {
              const datas = [...characterInfos];
              if (count > 1) {
                datas.forEach((data, index) => {
                  if (data.id == info.id) {
                    datas.splice(index, 1);
                  }
                });
                setInfos(datas);
                setCount(count - 1);
              }
            }}
          >
            캐릭터 삭제하기
          </Button>
        </Card>
      ))}

      <Button
        variant="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        캐릭터 추가하기
      </Button>
    </EditInfo>
  );
}
