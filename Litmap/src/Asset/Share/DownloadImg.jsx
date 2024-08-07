import React, { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
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
  const { imgUrl, setImgUrl, backgroundColor, backgroundImg } = useStore();

  useEffect(() => {
    fitView(); // 컴포넌트가 마운트될 때 호출
  }, [fitView]);

  /* 이미지 다운로드 함수 */
  function downloadImage(dataUrl) {
    const a = document.createElement("a");
    a.setAttribute("download", `test.${fileType}`);
    a.setAttribute("href", dataUrl);
    a.click();
  }

  /* HTML을 PNG 이미지로 변환하는 함수 */
  async function ImgtoPng() {
    const viewport = document.querySelector(".react-flow__viewport");
    if (!viewport) {
      console.error("Viewport not found");
      return;
    }

    try {
      const viewportDataUrl = await toPng(viewport, {
        cacheBust: true,
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = viewportDataUrl;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (backgroundImg) {
          const bgImg = new Image();
          bgImg.src = backgroundImg;
          bgImg.onload = () => {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            // 로고 추가
            const logo = new Image();
            logo.src = "/Logo.png";
            logo.onload = () => {
              ctx.drawImage(logo, img.width - 170, img.height - 80, 120, 50);

              // 최종 이미지 다운로드
              const finalDataUrl = canvas.toDataURL();
              setImgUrl(finalDataUrl);
              downloadImage(finalDataUrl);
            };

            logo.onerror = (error) => {
              console.error("Logo image failed to load", error);
            };
          };

          bgImg.onerror = (error) => {
            console.error("Background image failed to load", error);
          };
        } else {
          // 배경색 설정
          ctx.fillStyle = backgroundColor || "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(img, 0, 0);

          // 로고 추가
          const logo = new Image();
          logo.src = "/Logo.png";
          logo.onload = () => {
            ctx.drawImage(logo, img.width - 170, img.height - 80, 120, 50);

            // 최종 이미지 다운로드
            const finalDataUrl = canvas.toDataURL();
            setImgUrl(finalDataUrl);
            downloadImage(finalDataUrl);
          };

          logo.onerror = (error) => {
            console.error("Logo image failed to load", error);
          };
        }
      };

      img.onerror = (error) => {
        console.error("Viewport image failed to load", error);
      };
    } catch (error) {
      console.error("Failed to generate PNG", error);
    }
  }

  /* 다운로드 버튼 클릭 시 호출되는 함수 */
  const handleDownload = () => {
    ImgtoPng();
  };

  return (
    <Button className="download-btn" onClick={handleDownload}>
      다운로드
    </Button>
  );
}
