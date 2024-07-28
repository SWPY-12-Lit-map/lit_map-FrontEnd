import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../Asset/Category";
import Megamenu from "../Asset/Megamenu";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
  width: 100%;
  position: relative;
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

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Post = styled.div`
  width: 80%;
  img {
    width: 100%;
  }
`;

const Foot = styled.div`
  background-color: #fbf9f6;
  width: 100%;
  height: 200px;
  padding: 30px 20px 30px 50px;
`;

const FootNav = styled.div`
  margin-top: 20px;
  & > a {
    text-decoration: none;
    margin: 0 10px;
  }
`;

const Home = ({ mega, setMega, update, view, state, setState }) => {
  const navigate = useNavigate();

  // 캐러셀 이미지
  const slides = ["/advertise1.png", "/advertise2.png", "/advertise3.png"];

  const [index, setIndex] = useState();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Container>
        {/* 카테고리 */}
        <Category setMega={setMega} mega={mega} />
        {/* 배너 캐러셀 */}
        <Banner activeIndex={index} onSelect={handleSelect}>
          {slides.map((img, index) => (
            <Carousel.Item key={index}>
              <div style={{ display: "flex" }}>
                <img src={img} style={{ width: "100%" }} />
              </div>
            </Carousel.Item>
          ))}
        </Banner>
        <SortOptions>
          <CategoryBtn
            onClick={() => {
              setState(false);
            }}
            style={{
              color: state ? "gray" : "black",
            }}
          >
            업데이트순
          </CategoryBtn>
          <li>|</li>
          <CategoryBtn
            onClick={() => {
              setState(true);
            }}
            style={{
              color: state ? "black" : "gray",
            }}
          >
            조회순
          </CategoryBtn>
        </SortOptions>
        <div>
          <Posts>
            {!state
              ? update.map((post, index) => (
                  <Post
                    key={index}
                    onClick={() => {
                      navigate(`/work/${post.workId}`);
                    }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      onClick={() => {
                        navigate("/work");
                      }}
                    />
                    <div>{post.title}</div>
                  </Post>
                ))
              : view.map((post, index) => (
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
        </div>
      </Container>

      <Foot>
        <FootNav>
          <Link to="/개인정보처리방침" style={{ color: "#454545" }}>
            개인정보처리방침
          </Link>
          <span style={{ color: "#9F9F9F" }}>|</span>
          <Link to="/이용약관" style={{ color: "#9F9F9F" }}>
            이용약관
          </Link>
        </FootNav>
        <div style={{ color: "#9F9F9F", marginTop: "20px" }}>
          Copyright 2024. Lit Map(릿맵). All rights reserved.
        </div>
      </Foot>
    </>
  );
};

export default Home;
