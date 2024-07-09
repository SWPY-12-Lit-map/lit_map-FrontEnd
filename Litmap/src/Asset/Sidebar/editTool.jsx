import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function EditTool(props) {
  const setLine = props.setLine;
  const setEdgetype = props.setEdgetype;
  const edgeType = props.edgeType;
  const lineStyle = props.lineStyle;
  return (
    <p>
      <DropdownButton
        id="dropdown-basic-button"
        title={edgeType ? edgeType : "선을 선택하세요"}
      >
        <Dropdown.Item
          onClick={() => {
            setEdgetype("직선");
          }}
        >
          직선
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setEdgetype("곡선");
          }}
        >
          곡선
        </Dropdown.Item>
      </DropdownButton>

      <DropdownButton
        id="dropdown-basic-button"
        title={lineStyle ? lineStyle : "선을 선택하세요"}
      >
        <Dropdown.Item
          onClick={() => {
            setLine("실선");
          }}
        >
          실선
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setLine("점선");
          }}
        >
          점선
        </Dropdown.Item>
      </DropdownButton>
    </p>
  );
}
