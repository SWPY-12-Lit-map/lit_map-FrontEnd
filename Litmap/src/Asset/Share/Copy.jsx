import { copyImageToClipboard } from "copy-image-clipboard";

export default function Copy(props) {
  const imgUrl = props.imgUrl;
  const pngCopy = () => {
    copyImageToClipboard(imgUrl)
      .then(() => {
        alert("완료!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <button onClick={pngCopy}>클립보드에 복사하기</button>
    </div>
  );
}
