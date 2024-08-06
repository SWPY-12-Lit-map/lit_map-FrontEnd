import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CustomButton = styled(Button)`
  width: 45%;
  background-color: unset;
  color: #8d2741;
  border-color: #8d2741;
  &:hover,
  :active {
    background-color: #8d2741;
    color: white;
    border-color: #8d2741;
  }
`;

export default function MyVerticallyCenteredModal(props) {
  const work = props.work;
  const setWork = props.setWork;
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          작품 등록 완료
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>작품이 등록 완료되었습니다!</p>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          style={{ border: "solid 1px black" }}
          onClick={() => {
            navigate("/");
          }}
        >
          홈 바로가기
        </CustomButton>
        <CustomButton
          onClick={() => {
            navigate(`/category2`);
          }}
        >
          마이페이지 바로가기
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
}
