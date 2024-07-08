import React, { useState } from "react";
import styled from "styled-components";
import Category from "../Asset/Category";
import Megamenu from "../Asset/Megamenu";
import Carousel from "react-bootstrap/Carousel";

const Container = styled.div`
  padding: 20px;
`;

const CategoryBtn = styled.button``;

const SortOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  list-style: none;
  gap: 25px;

  > div {
    margin: 0 10px;
    cursor: pointer;
    color: #666;

    &.active {
      font-weight: bold;
      color: #333;
    }
  }
`;

const Posts = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

const Post = styled.div`
  flex: 0 0 auto;
  width: 150px;
`;

const Home = (props) => {
  const mega = props.mega;
  const setMega = props.setMega;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  //   캐러셀 이미지
  const slides = ["/advertise1.png", "/advertise2.png", "/advertise3.png"];

  // 작품 썸네일
  const posts = [
    { image: "/poster1.png" },
    { image: "/poster2.png" },
    { image: "/poster3.png" },
    { image: "/poster4.png" },
    { image: "/poster5.png" },
  ];

  const [index, setIndex] = useState();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Megamenu mega={mega} />
      <Container>
        <Category />

        <Carousel activeIndex={index} onSelect={handleSelect}>
          {slides.map((img, index) => {
            return (
              <Carousel.Item key={index}>
                <img src={img} style={{ width: "100%" }} />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <SortOptions>
          <CategoryBtn>신규순</CategoryBtn>
          <li>|</li>
          <CategoryBtn>검색순</CategoryBtn>
          <li>|</li>
          <CategoryBtn>분류3</CategoryBtn>
        </SortOptions>

        <Posts>
          {posts.map((post, index) => (
            <Post key={index}>
              <img src={post.image} alt={post.title} />
              <div>{post.title}</div>
            </Post>
          ))}
        </Posts>
      </Container>
    </>
  );
};

export default Home;
