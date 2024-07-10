import { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from "styled-components";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

const ShareBtn = styled.button`
  background-color: #8d2741;
  border: solid 1px #8d2741;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default function KakaoShare(props) {
  // 배포한 자신의 사이트
  const realUrl = "http://localhost:5173/";
  // 로컬 주소 (localhost 3000 같은거)
  const imgUrl = props.imgUrl;

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_KAKAO_KEY);
    Kakao.isInitialized();
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "인물관계도 확인해보기",
        description: "인물 관계도 확인해보세요",
        imageUrl: "", // 이미지는  800 x 400이 적당
        link: {
          webUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "사이트로 이동하기",
          link: {
            mobileWebUrl: realUrl,
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
