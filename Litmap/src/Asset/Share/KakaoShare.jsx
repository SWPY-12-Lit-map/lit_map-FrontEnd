import { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from "styled-components";
import { useStore } from "../store";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;
import thumbnailImg from "/thumbnail.png";
import { useParams } from "react-router-dom";

const ShareBtn = styled.button`
  background-color: #8d2741;
  border: solid 1px #8d2741;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export default function KakaoShare() {
  // 배포한 자신의 사이트

  const realUrl = window.location.href;
  // 로컬 주소 (localhost 3000 같은거)

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init("8fc283d3e9d008abbc54a3ec1c5087ed");
    Kakao.isInitialized();
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "인물관계도를 확인해보기",
        description: "릿맵에서 인물관계도를 확인해보세요",
        imageUrl:
          " https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihaTcLucEeuEHMOv1WsTKoocrKsCSwhF4tWPg2xu4XrfBI0UyJ98Q3HtBcPRm3SX4RX460CvOaRzGP4Q55g3Xaq9Uvs3ex4Fvpo=w3160-h2048-rw-v1", // 이미지는  800 x 400이 적당
        imageWidth: 800,
        imageHeight: 400,
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "사이트로 이동하기",
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <>
      <ShareBtn
        className="grey-btn"
        onClick={() => {
          shareKakao();
        }}
      >
        <RiKakaoTalkFill color="white" size={"60px"} />
      </ShareBtn>
    </>
  );
}
