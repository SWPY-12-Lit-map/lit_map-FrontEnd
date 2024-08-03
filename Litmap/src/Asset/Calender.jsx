import { format, getMonth, getYear } from "date-fns";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const SelectDate = styled.div`
  text-align: center;
  width: 100%;
  & > div {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: unset;
  width: 100%;
  padding: 5px;
  border: 1px solid #575757;
  border-radius: 5px;
`;

const HeaderContainer = styled.div`
  display: flex;
  color: black;
  justify-content: space-evenly;
  align-items: center;
`;
const LeftArrow = styled.div``;
const RightArrow = styled.div``;

export default function Calendar(props) {
  const work = props.work;
  const setWork = props.setWork;
  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 1900 },
    (_, i) => getYear(new Date()) - i
  );
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      className="custom-input"
      onClick={onClick}
      ref={ref}
      style={{ color: "black", width: "100%" }}
    >
      {value}
    </Button>
  ));
  return (
    <>
      <SelectDate>
        <div>출판 / 개봉일자</div>
        <DatePicker
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
          showYearDropdown
          scrollableYearDropdown
          scrollableMonthYearDropdown
          yearDropdownItemNumber={100}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <HeaderContainer className>
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <LeftArrow>◀️</LeftArrow>
              </button>
              <div>
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(+value)}
                >
                  {YEARS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <RightArrow>▶️</RightArrow>
                </button>
              </div>
            </HeaderContainer>
          )}
          dateFormat="yyyy-MM-dd" // 날짜 형태
          shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
          minDate={new Date("1900-01-01")} // minDate 이전 날짜 선택 불가
          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
          selected={props.releaseDate}
          onChange={(date) => {
            const info = {
              ...work,
              publisherDate: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
            };
            setWork(info);
            props.setReleaseDate(date);
            console.log(format(date, "yyyy-MM-dd'T'HH:mm:ss"));
          }}
          customInput={<ExampleCustomInput />}
          showPopperArrow={false}
        />
      </SelectDate>
    </>
  );
}
