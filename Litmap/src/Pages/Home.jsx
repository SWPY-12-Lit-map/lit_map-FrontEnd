import React, { useState } from "react";
import styled from "styled-components";
import Category from "../Asset/Category";
import Megamenu from "../Asset/Megamenu";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
`;

const Banner = styled(Carousel)`
  height: 350px;
  & > div {
    height: 100%;

    > div {
      height: 100%;
      > div {
        height: 100%;

        > img {
          object-fit: contain;
        }
      }
    }
  }
`;

const CategoryBtn = styled.button`
  background: none;
  border: none;
`;

const SortOptions = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
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
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  gap: 50px 0px;
  padding: 0 140px;
`;

const Post = styled.div`
  width: 80%;
  img {
    width: 100%;
  }
`;

const Foot = styled.div`
  background-color: #d9d9d9;
  width: 100%;
  height: 350px;
  padding: 30px 20px 30px 50px;
`;

const Foot_Head = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    margin: 0 12px;
    text-decoration: none;
    color: #424242;
    font-weight: 600;
  }
`;
const LogoImg = styled.img`
  width: 70px;
  height: auto;
`;
const Right = styled.div``;
const Foot_Body = styled.div`
  margin-top: 50px;
  color: #7f7f7f;
  a {
    text-decoration: none;
    color: #424242;
    font-weight: 600;
    margin-right: 12px;
  }
`;
const Foot_Foot = styled.div`
  color: #424242;
  margin-top: 50px;
`;

const Home = (props) => {
  const mega = props.mega;
  const setMega = props.setMega;
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  //   캐러셀 이미지
  const slides = ["/advertise1.png", "/advertise2.png", "/advertise3.png"];

  // 작품 썸네일
  const posts = [
    { image: "/poster1.png" },
    { image: "/poster2.png" },
    { image: "/poster3.png" },
    { image: "/poster4.png" },
    { image: "/poster5.png" },
    { image: "/poster1.png" },
    { image: "/poster2.png" },
    { image: "/poster3.png" },
    { image: "/poster4.png" },
    { image: "/poster5.png" },
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
      {mega == true ? <Megamenu mega={mega} setMega={setMega} /> : null}
      <Container>
        {/* 카테고리 */}
        <Category setMega={setMega} />
        {/* 배너 캐러셀 */}
        <Banner activeIndex={index} onSelect={handleSelect}>
          {slides.map((img, index) => {
            return (
              <Carousel.Item key={index}>
                <div style={{ display: "flex" }}>
                  {title ? (
                    <div
                      style={{
                        width: title ? "60%" : null,
                        backgroundColor: "white",
                      }}
                    >
                      {index}
                    </div>
                  ) : null}
                  <img src={img} style={{ width: title ? "40%" : "100%" }} />
                </div>
              </Carousel.Item>
            );
          })}
        </Banner>

        <SortOptions>
          <CategoryBtn>신규순</CategoryBtn>
          <li>|</li>
          <CategoryBtn>조회순</CategoryBtn>
        </SortOptions>

        <Posts>
          {posts.map((post, index) => (
            <Post key={index}>
              <img
                src={post.image}
                alt={post.title}
                onClick={() => {
                  navigate("/work");
                }}
              />
              <div>{post.title}</div>
            </Post>
          ))}
        </Posts>
      </Container>
      <Foot>
        <Foot_Head>
          <LogoImg src="/Logo.png" alt="로고" />
          <Right>
            <a href="">기업소개</a>
            <a href="">광고문의</a>
            <a href="">고객센터</a>
            <a href="">이용약관</a>
            <a href="">블로그</a>
            <a href="">개인정보 처리방침</a>
          </Right>
        </Foot_Head>
        <Foot_Body>
          <p>(주)릿맵 | 대표이사</p>
          <p>
            시물특별시 송파구 올림픽로 300. 롯데월드EI워 35춤 전화번호:
            02-539-7118
          </p>
          <p>
            사업자듬록번호: 299-86-00021 통신판매번호: 2020-서올송따-3147
            유료직업소개사업등록번호: (국내) 제2020-3230259-14-5-00018호
          </p>
          <div>
            <a href="">기업문의</a>
            <a href="">광고문의</a>
            <a href="">문의</a>
          </div>
        </Foot_Body>
        <Foot_Foot>@ 2024 LITMAP, lnc.</Foot_Foot>
      </Foot>
    </>
  );
};

export default Home;
