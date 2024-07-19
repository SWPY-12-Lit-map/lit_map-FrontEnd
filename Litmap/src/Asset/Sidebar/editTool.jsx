import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import { useColor, ColorPicker } from "react-color-palette";
import "react-color-palette/css";

const SelectBackground = styled.div``;

export default function EditTool(props) {
  const {
    setLine,
    setEdgetype,
    edgeType,
    lineStyle,
    setBackImg,
    setBackground,
    backgroundType,
  } = props;

  const fileTypes = ["JPG", "PNG", "JPEG"];

  // 이미지 업로드
  function DragDrop() {
    const handleChange = (file) => {
      setBackImg(URL.createObjectURL(file));
    };
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
        <div id="dropzone">Click or drag file to this area to upload</div>
      </FileUploader>
    );
  }

  // 색깔 고르기
  const ColorPick = () => {
    const [color, setColor] = useColor("#123123");

    const onChangeComplete = (color) => {
      localStorage.setItem("color", color.hex);
    };

    return (
      <ColorPicker
        hideInput={["rgb", "hsv"]}
        color={color}
        onChange={setColor}
        onChangeComplete={onChangeComplete}
      />
    );
  };

  useEffect(() => {
    localStorage.setItem("color", []);
  }, []);

  return (
    <div>
      <SelectBackground>
        <div>
          <>
            <input
              type="radio"
              name="select"
              onClick={() => {
                setBackground(true);
              }}
              defaultChecked
            />
            <span>이미지</span>
            <input
              type="radio"
              name="select"
              onClick={() => {
                setBackground(false);
              }}
            />{" "}
            <span>단색</span>
          </>
          {backgroundType ? <DragDrop /> : <ColorPick />}
        </div>
      </SelectBackground>
      <DropdownButton
        id="dropdown-basic-button"
        title={edgeType ? edgeType : "선을 선택하세요"}
      >
        <Dropdown.Item onClick={() => setEdgetype("직선")}>직선</Dropdown.Item>
        <Dropdown.Item onClick={() => setEdgetype("곡선")}>곡선</Dropdown.Item>
      </DropdownButton>

      <DropdownButton
        id="dropdown-basic-button"
        title={lineStyle ? lineStyle : "선을 선택하세요"}
      >
        <Dropdown.Item onClick={() => setLine("실선")}>실선</Dropdown.Item>
        <Dropdown.Item onClick={() => setLine("점선")}>점선</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
