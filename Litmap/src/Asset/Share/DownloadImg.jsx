import React, { useEffect } from "react";
import { useReactFlow } from "reactflow";
import { toPng } from "html-to-image";
import { useStore } from "../store";
import styled from "styled-components";

const Button = styled.button`
  background-color: unset;
  border-color: #8d2741;
  border-radius: 10px;
  color: #8d2741;
  width: 50%;
  padding: 10px;
`;

/* 로고 스타일 */
const logoStyle = {
  position: "absolute",
  right: "10px",
  bottom: "10px",
  width: "100px",
  height: "auto",
  zIndex: 1000,
};

export default function DownloadImg(props) {
  const { fitView } = useReactFlow();
  const fileType = props.fileType;
  const { imgUrl, setImgUrl, backgroundColor } = useStore();

  /* 이미지 다운로드 함수 */
  function downloadImage(dataUrl) {
    const a = document.createElement("a");
    a.setAttribute("download", `test.${fileType}`);
    a.setAttribute("href", dataUrl);
    a.click();
  }

  /* HTML을 PNG 이미지로 변환하는 함수 */
  function ImgtoPng() {
    const viewport = document.querySelector(".react-flow__viewport");

    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = viewport.offsetWidth + "px";
    container.style.height = viewport.offsetHeight + "px";

    const clonedViewport = viewport.cloneNode(true);

    const viewportStyles = getComputedStyle(viewport);
    clonedViewport.style.backgroundImage = viewportStyles.backgroundImage;
    clonedViewport.style.backgroundColor = viewportStyles.backgroundColor;

    container.appendChild(clonedViewport);
    const logo = document.createElement("img");
    logo.src = "/Logo.png";
    Object.assign(logo.style, logoStyle);
    container.appendChild(logo);
    document.body.appendChild(container);

    toPng(container, {
      cacheBust: true,
      backgroundColor: backgroundColor == "" ? "white" : backgroundColor,
    })
      .then((dataUrl) => {
        setImgUrl(dataUrl);
        downloadImage(dataUrl);
        document.body.removeChild(container);
      })
      .catch((error) => {
        console.error("Image conversion error:", error);
        document.body.removeChild(container);
      });
  }

  /* 다운로드 버튼 클릭 시 호출되는 함수 */
  const handleDownload = () => {
    ImgtoPng();
  };

  useEffect(() => {
    fitView();
  }, [fitView]);

  return (
    <Button className="download-btn" onClick={handleDownload}>
      다운로드
    </Button>
  );
}
