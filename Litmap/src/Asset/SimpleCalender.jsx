import { format, getMonth, getYear } from "date-fns";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const SelectDate = styled.div``;
const HeaderContainer = styled.div`
  display: flex;
  color: black;
  justify-content: space-evenly;
  align-items: center;
`;
const LeftArrow = styled.div``;
const RightArrow = styled.div``;

export default function SimpleCalender({ date, setDate }) {
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
    <button
      className="custom-input"
      onClick={onClick}
      ref={ref}
      style={{
        backgroundColor: "white",
        border: "none",
        width: "120px",
        height: "35px",
        borderRadius: "5px",
      }}
    >
      {value}
    </button>
  ));
  return (
    <>
      <SelectDate>
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
          selected={date}
          onChange={(date) => {
            setDate(format(date, "yyyy-MM-dd"));
          }}
          customInput={<ExampleCustomInput />}
          showPopperArrow={false}
        />
      </SelectDate>
    </>
  );
}
