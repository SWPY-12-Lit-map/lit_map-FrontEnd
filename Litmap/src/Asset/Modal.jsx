import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
export default function MyVerticallyCenteredModal(props) {
  const work = props.work;
  const setWork = props.setWork;
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          작품 등록 완료
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          인물관계도 작성 완료! <br />
          제출하시겠습니까?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="Light"
          style={{ border: "solid 1px black" }}
          onClick={props.onHide}
        >
          취소
        </Button>
        <Button
          onClick={() => {
            navigate("/category1/postdone");

            const setSaveState = { ...work, confirmCheck: true };
            setWork(setSaveState);
            console.log(work);
            axios
              .post("http://43.200.133.58:8080/api/work", work)
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
