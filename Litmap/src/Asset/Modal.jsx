import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
export default function MyVerticallyCenteredModal(props) {
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
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
