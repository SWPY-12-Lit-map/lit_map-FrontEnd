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
  const infos = props.infos;
  const setInfos = props.setInfos;

  /* 이미지 업로드 */
  const UploadImg = ({ index }) => {
    const fileUpload = (e) => {
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file);

      const updatedInfos = infos.map((info, i) =>
        i === index ? { ...info, img: imgUrl } : info
      );
      setInfos(updatedInfos);
    };

    return (
      <div>
        <Image
          src={infos[index].img || basicImg}
          style={{ width: "100px", height: "100px" }}
          roundedCircle
        />
        <input
          title="프로필 업로드"
          type="file"
          accept="image/*"
          onChange={fileUpload}
        />
      </div>
    );
  };

  function ChangeDrop(e, key, index) {
    const updatedInfos = infos.map((info, i) =>
      i === index ? { ...info, [key]: e.target.text } : info
    );
    setInfos(updatedInfos);
  }

  const inputChange = (e, data, index) => {
    const updatedInfos = infos.map((info, i) =>
      i === index ? { ...info, [data]: e.target.value } : info
    );
    setInfos(updatedInfos);
    console.log(infos);
  };

  return (
    <EditInfo>
      {infos.map((info, i) => (
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
              title={info.species || "인간/동물/사물 중 선택하세요"}
              variant="none"
            >
              {["인간", "동물", "사물"].map((data, j) => (
                <Dropdown.Item
                  key={j}
                  onClick={(e) => {
                    ChangeDrop(e, "species", i);
                  }}
                >
                  {data}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <DropdownButton
              id={`main${i}`}
              title={info.main || "주/조연 선택"}
              variant="none"
            >
              {["주연", "조연"].map((data, j) => (
                <Dropdown.Item
                  key={j}
                  onClick={(e) => {
                    ChangeDrop(e, "main", i);
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
              onChange={(e) => inputChange(e, "personality", i)}
            />
            <input
              placeholder="그 외 정보"
              value={info.otherInfo}
              onChange={(e) => inputChange(e, "otherInfo", i)}
            />
          </Card.Body>
          <Button
            variant="danger"
            onClick={() => {
              const datas = [...infos];
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

      <Card infos={infos} style={{ display: "none" }}></Card>
    </EditInfo>
  );
}
