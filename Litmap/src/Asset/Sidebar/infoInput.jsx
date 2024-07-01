import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function InfoInput(props) {
  const count = props.count;
  const setCount = props.setCount;
  const work = props.work;
  const setWork = props.setWork;
  const personInfo = props.personInfo;
  const setInfo = props.setInfo;

  if (count > 30) {
    setCount(30);
    alert("30명 이상 금지");
  } else if (count <= 0) {
    setCount(1);
    alert("그래도 등장인물이 있어야죠...");
  }

  function ChangeDrop(e) {
    document.querySelector("#dropdown-basic-button").innerHTML = e.target.text;
    const info = { ...work, genre: e.target.text };
    setWork(info);
  }
  return (
    <>
      {/* 제목입력 */}
      <h3>제목을 입력하세요</h3>
      <input
        value={work.title}
        onChange={(e) => {
          const info = { ...work, title: e.target.value };
          setWork(info);
        }}
      ></input>
      {/* 버전등록 */}
      <h3>버전등록</h3>
      <input
        value={work.version}
        onChange={(e) => {
          const info = { ...work };
          info.version = e.target.value;
          console.log(info);
          setWork(info);
        }}
      ></input>
      {/* 등장인물 수 */}
      <h3>등장인물은 몇명인가요?</h3>
      <input
        value={count}
        onChange={(e) => {
          setCount(Number(e.target.value));
        }}
        type="number"
      ></input>
      <h3>장르</h3>

      <DropdownButton id="dropdown-basic-button" title="장르를 선택하세요">
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
    </>
  );
}
