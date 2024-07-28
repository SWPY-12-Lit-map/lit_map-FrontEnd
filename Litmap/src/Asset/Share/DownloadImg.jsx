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

export default function DownloadImg(props) {
  const { fitView } = useReactFlow();
  const fileType = props.fileType;
  const { imgUrl, setImgUrl } = useStore();

  /* 이미지 다운로드 함수 */
  function downloadImage(dataUrl) {
    const a = document.createElement("a");
    a.setAttribute(
      "download",
      // `${workInfo.title} ${workInfo.versions.versionName}.${fileType}`
      `test.${fileType}`
    );
    a.setAttribute("href", dataUrl);
    a.click();
    // console.log(dataUrl);
  }

  /* HTML을 PNG 이미지로 변환하는 함수 */
  function ImgtoPng() {
    toPng(document.querySelector(".react-flow__viewport"), {
      cacheBust: true,
      backgroundColor: null,
    })
      .then((dataUrl) => {
        setImgUrl(dataUrl);
      })
      .catch((error) => {
        console.error("Image conversion error:", error);
      });
  }

  /* 다운로드 버튼 클릭 시 호출되는 함수 */
  const handleDownload = () => {
    downloadImage(imgUrl);
  };

  useEffect(() => {
    fitView();
    setTimeout(ImgtoPng, 100);
  }, []);

  return (
    <Button className="download-btn" onClick={handleDownload}>
      다운로드
    </Button>
  );
}
