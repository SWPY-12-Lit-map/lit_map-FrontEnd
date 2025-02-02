import { SiNaver } from "react-icons/si";
import styled from "styled-components";

const ShareBtn = styled.button`
  background-color: #8d2741;
  border: solid 1px #8d2741;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const NaverIcon = styled(SiNaver)`
  padding: 5px;
`;

export default function NaverShare() {
  function share() {
    var url = encodeURI(encodeURIComponent("http://localhost:5173/"));
    var title = encodeURI("릿맵");
    var shareURL =
      "https://share.naver.com/web/shareView?url=" + url + "&title=" + title;
    window.open(shareURL);
  }
  return (
    <>
      <ShareBtn onClick={share}>
        <NaverIcon color="white" size={"50px"} />
      </ShareBtn>
    </>
  );
}
