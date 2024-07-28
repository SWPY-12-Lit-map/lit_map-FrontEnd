import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const MegamenuWrapper = styled.div`
  display: flex;
  background-color: #fbf9f6;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  width: 90%;
  position: absolute;
  top: 0%;
  z-index: 10000;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
  color: white;
`;

const ColumnTitle = styled.h3`
  font-size: 16px;
  border-bottom: 1px solid #dadada;
  padding-bottom: 10px;
  color: #7d7d7d;
  font-weight: bold;
`;

const SubCategory = styled.div`
  margin-top: 15px;
`;

const SubCategoryTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #7d7d7d;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NavigationItem = styled.li`
  font-size: 12px;
  margin: 5px 0;
  cursor: pointer;
  color: #7d7d7d;

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
  top: 0;
  right: 2%;
  background: none;
  color: black;
  border: none;
  font-size: 30px;
`;

function Megamenu(props) {
  const setMega = props.setMega;
  const mega = props.mega;
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeGenre, setActiveGenre] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState({});

  const navigate = useNavigate();

  function getAxios(categoryId, genreId) {
    axios
      .get(`https://api.litmap.store/api/board/theme/${categoryId}/${genreId}`)
      .then((result) => {
        setData((prevData) => ({
          ...prevData,
          [`${categoryId}-${genreId}`]: result.data.result,
        }));
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
        setGenres(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
    // 카테고리 가져오기
    axios
      .get("https://api.litmap.store/api/category")
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubCategoryClick = (categoryId, genreId) => {
    const key = `${categoryId}-${genreId}`;
    if (openSubCategory[key]) {
      setOpenSubCategory((prev) => ({
        ...prev,
        [key]: false,
      }));
      setActiveCategory(null);
      setActiveGenre(null);
    } else {
      setOpenSubCategory((prev) => ({
        ...prev,
        [key]: true,
      }));
      setActiveCategory(categoryId);
      setActiveGenre(genreId);
      getAxios(categoryId, genreId);
    }
  };

  return (
    <MegamenuWrapper>
      <CloseBtn
        onClick={() => {
          mega === true ? setMega(false) : null;
        }}
      >
        <IoClose />
      </CloseBtn>

      {category.map((category) => (
        <Column key={category.id}>
          <ColumnTitle
            style={{
              color: activeCategory === category.id ? "#8B0024" : "#7d7d7d",
            }}
          >
            {category.name}
          </ColumnTitle>
          {genres.map((genre, i) => {
            const key = `${category.id}-${genre.id}`;
            const isOpen = openSubCategory[key];
            return (
              <SubCategory key={i}>
                <SubCategoryTitle
                  style={{
                    color:
                      activeGenre === genre.id && activeCategory === category.id
                        ? "#8B0024"
                        : "#7d7d7d",
                  }}
                  onClick={() => handleSubCategoryClick(category.id, genre.id)}
                >
                  {genre.name}
                  {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </SubCategoryTitle>
                {isOpen && data[key] && data[key].length > 0 && (
                  <div>
                    {data[key].map((item) => (
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
                  </div>
                )}
              </SubCategory>
            );
          })}
        </Column>
      ))}
    </MegamenuWrapper>
  );
}

export default Megamenu;
