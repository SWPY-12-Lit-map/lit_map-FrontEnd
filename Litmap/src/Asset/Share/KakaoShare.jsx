import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

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
      <button
        className="grey-btn"
        onClick={() => {
          shareKakao();
        }}
      >
        {" "}
        카카오톡 공유하기{" "}
      </button>
    </>
  );
}
