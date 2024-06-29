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
      <button onClick={share}>네이버로 공유하기</button>
    </>
  );
}
