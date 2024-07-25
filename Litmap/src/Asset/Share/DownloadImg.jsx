import React, { useEffect } from "react";
import { useReactFlow, getRectOfNodes, getTransformForBounds } from "reactflow";
import { toPng } from "html-to-image";
import backImg from "../backgroundImg.png";
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
  const { getNodes } = useReactFlow();
  const imageWidth = 1920;
  const imageHeight = 1080;
  const workInfo = props.workInfo;
  const fileType = props.fileType;
  const { imgUrl, setImgUrl } = useStore();

  /* 이미지 다운로드 함수 */
  function downloadImage(dataUrl) {
    const a = document.createElement("a");
    a.setAttribute(
      "download",
      `${workInfo.title} ${workInfo.versions.versionName}.${fileType}`
    );
    a.setAttribute("href", dataUrl);
    a.click();
  }

  /* HTML을 PNG 이미지로 변환하는 함수 */
  function ImgtoPng() {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    // 배경 이미지 렌더링
    const backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.width = imageWidth;
    backgroundCanvas.height = imageHeight;
    const backgroundContext = backgroundCanvas.getContext("2d");
    const backgroundImage = new Image();
    backgroundImage.src = backImg;
    backgroundImage.onload = () => {
      backgroundContext.drawImage(
        backgroundImage,
        0,
        0,
        imageWidth,
        imageHeight
      );

      // React Flow 노드 렌더링
      const nodeCanvas = document.createElement("canvas");
      nodeCanvas.width = imageWidth;
      nodeCanvas.height = imageHeight;
      const nodeContext = nodeCanvas.getContext("2d");
      nodeContext.save();
      nodeContext.translate(-2, 1);
      nodeContext.scale(1, 1);
      toPng(document.querySelector(".react-flow__viewport"), {
        cacheBust: true,
      })
        .then((dataUrl) => {
          const nodeImage = new Image();
          nodeImage.src = dataUrl;
          nodeImage.onload = () => {
            nodeContext.drawImage(nodeImage, 0, 0);
            nodeContext.restore();

            // 배경 이미지와 React Flow 노드 이미지 합성
            const resultCanvas = document.createElement("canvas");
            resultCanvas.width = imageWidth;
            resultCanvas.height = imageHeight;
            const resultContext = resultCanvas.getContext("2d");
            resultContext.drawImage(backgroundCanvas, 0, 0);
            resultContext.drawImage(nodeCanvas, 0, 0);

            // 최종 이미지 URL 생성
            resultCanvas.toBlob((blob) => {
              const dataUrl = URL.createObjectURL(blob);
              setImgUrl(dataUrl);
            });
          };
        })
        .catch((error) => {
          console.error("Image conversion error:", error);
        });
    };
  }

  /* 다운로드 버튼 클릭 시 호출되는 함수 */
  const handleDownload = () => {
    downloadImage(imgUrl);
  };

  /* 컴포넌트가 마운트될 때 한 번 호출 */
  useEffect(() => {
    console.log(workInfo);
    ImgtoPng();
  }, []);

  return (
    <Button className="download-btn" onClick={handleDownload}>
      다운로드
    </Button>
  );
}
