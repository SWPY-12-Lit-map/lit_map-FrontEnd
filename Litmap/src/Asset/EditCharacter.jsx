import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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

export default function EditCharacter(props) {
  const count = props.count;
  const setCount = props.setCount;
  const nextId = useRef(0);
  const [infos, setInfo] = useState({
    name: "",
    // species,
  });

  const [data, setData] = useState([{}]);

  /* 이미지 업로드 */
  const UploadImg = () => {
    const [img, setImg] = useState(null);

    const fileUpload = (e) => {
      const file = e.target.files[0]; // 첫번째 업로드 한 사진 불러오기
      const imgUrl = URL.createObjectURL(file);
      setImg(imgUrl);
    };

    return (
      <div>
        {img == null ? (
          <Image
            src={basicImg}
            style={{ width: "100px", height: "100px" }}
            roundedCircle
          />
        ) : (
          <Image
            src={img}
            style={{ width: "100px", height: "100px" }}
            roundedCircle
          />
        )}
        <input
          title="프로필 업로드"
          type="file"
          accept="image/*"
          onChange={fileUpload}
        />
      </div>
    );
  };

  function ChangeDrop(e, a) {
    document.querySelector(`#${a}`).innerHTML = e.target.text;
  }

  return (
    <EditInfo>
      {[...Array(parseInt(count))].map((n, i) => {
        return (
          <Card key={i} id={i}>
            <UploadImg index={i}></UploadImg>
            <Card.Body>
              <Card.Title>캐릭터 정보를 입력하세요</Card.Title>
              <input placeholder="이름"></input>
              <DropdownButton
                id="species"
                title="인간/동물/사물 중 선택하세요"
                variant="none"
              >
                {["인간", "동물", "사물"].map((selected, i) => {
                  return (
                    <Dropdown.Item
                      key={i}
                      onClick={(e) => {
                        ChangeDrop(e, "species");
                      }}
                    >
                      {selected}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <DropdownButton id="main" title="주/조연 선택" variant="none">
                {["주연", "조연"].map((main, i) => {
                  return (
                    <Dropdown.Item
                      key={i}
                      onClick={(e) => {
                        ChangeDrop(e, "main");
                      }}
                    >
                      {main}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <DropdownButton id="gender" title="성별" variant="none">
                {["남성", "여성"].map((main, i) => {
                  return (
                    <Dropdown.Item
                      key={i}
                      onClick={(e) => {
                        ChangeDrop(e, "gender");
                      }}
                    >
                      {main}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <input placeholder="나이"></input>
              <input placeholder="성격(MBTI 입력)"></input>
              <input placeholder="그 외 정보"></input>
            </Card.Body>
          </Card>
        );
      })}
    </EditInfo>
  );
}
