import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MegamenuWrapper = styled.div`
  display: flex;
  background-color: black;
  color: white;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  width: 100%;
  position: absolute;
  z-index: 10000;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
  color: white;
`;

const ColumnTitle = styled.h3`
  font-size: 16px;
  border-bottom: 1px solid #555;
  padding-bottom: 10px;
  color: white;
`;

const SubCategory = styled.div`
  margin-top: 15px;
`;

const SubCategoryTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const NavigationItem = styled.li`
  font-size: 12px;
  margin: 5px 0;
  cursor: pointer;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  display: none;

  ${NavigationItem}:hover & {
    display: block;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 35px;
  background: none;
  color: white;
  border: none;
`;

function Megamenu(props) {
  const setMega = props.setMega;
  const mega = props.mega;
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  function getAxios(category, genre) {
    axios
      .get(`https://api.litmap.store/api/board/theme/${category}/${genre}`)
      .then((result) => {
        console.log(...result.data.result);
        setData({
          [`${category}-${genre}`]: result.data.result,
        });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // 장르 가져오기
    axios
      .get("https://api.litmap.store/api/genre")
      .then((result) => {
        console.log(...result.data.result);
        const works = [...data];
        setGenres([...works, ...result.data.result]);
      })
      .catch((error) => {
        console.log(error);
      });
    // 카테고리 가져오기
    axios
      .get("https://api.litmap.store/api/category")
      .then((result) => {
        console.log(...result.data.result);
        const works = [...data];
        setCategory([...works, ...result.data.result]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MegamenuWrapper>
      <CloseBtn
        onClick={() => {
          mega == true ? setMega(false) : null;
        }}
      >
        X
      </CloseBtn>

      {category.map((category) => (
        <Column key={category.name}>
          <ColumnTitle>{category.name}</ColumnTitle>
          {genres.map((genre) => (
            <SubCategory key={genre.name}>
              <SubCategoryTitle
                onClick={() => {
                  getAxios(category.id, genre.id);
                }}
              >
                {genre.name}
              </SubCategoryTitle>
              {data[`${category.id}-${genre.id}`] &&
                data[`${category.id}-${genre.id}`].length > 0 &&
                data[`${category.id}-${genre.id}`].map((item) => (
                  <NavigationItem
                    key={item.workId}
                    id={item.workId}
                    onClick={() => {
                      navigate(`/work/${item.workId}`);
                    }}
                  >
                    {item.workTitle}
                  </NavigationItem>
                ))}
            </SubCategory>
          ))}
        </Column>
      ))}
    </MegamenuWrapper>
  );
}

export default Megamenu;
