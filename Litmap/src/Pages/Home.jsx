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

const Home = ({ mega, setMega }) => {
  const navigate = useNavigate();
  const [view, setView] = useState(false); // false = 업데이트순 , true = 조회순
  const [a, b] = useState([]);

  // 캐러셀 이미지
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

  const viewOrder = () => {
    axios
      .get("https://api.litmap.store/api/board/view?pn=2")
      .then((result) => {
        console.log(result);
        // data의 result의 last값이 true가 될때까지 pn=[]값을 올리기
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateOrder = () => {
    axios
      .get("https://api.litmap.store/api/board/updateList?pn=0")
      .then((result) => {
        console.log(result.data.result);
        // data의 result의 last값이 true가 될때까지 pn=[]값을 올리기
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 최신순, 조회순에 필요할 듯
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      b((prevA) => {
        const newA = [...prevA, i];
        console.log(newA);
        return newA;
      });
    }
  }, []);

  useEffect(() => {
    // viewOrder();
    // updateOrder();
  }, []);

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
                  <img src={img} style={{ width: "100%" }} />
                </div>
              </Carousel.Item>
            );
          })}
        </Banner>

        <SortOptions>
          <CategoryBtn
            onClick={() => {
              setView(false);
            }}
            style={{
              color: view ? "gray" : "black",
            }}
          >
            업데이트순
          </CategoryBtn>
          <li>|</li>
          <CategoryBtn
            onClick={() => {
              setView(true);
            }}
            style={{
              color: view ? "black" : "gray",
            }}
          >
            조회순
          </CategoryBtn>
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
        <FootNav>
          <Link to="/개인정보처리방침" style={{ color: "#454545" }}>
            개인정보처리방침
          </Link>
          <span
            style={{
              color: "#9F9F9F",
            }}
          >
            |
          </span>
          <Link
            to="/이용약관"
            style={{
              color: "#9F9F9F",
            }}
          >
            이용약관
          </Link>
        </FootNav>
        <div
          style={{
            color: "#9F9F9F",
            marginTop: "20px",
          }}
        >
          Copyright 2024. Lit Map(릿맵). All rights reserved.
        </div>
      </Foot>
    </>
  );
};

export default Home;
