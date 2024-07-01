import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Slider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    position: relative;
`;

const SliderContent = styled.div`
    display: flex;
    transition: transform 0.3s ease-in-out;
    transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const Slide = styled.div`
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s ease-in-out;
`;

const Arrow = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({ direction }) => (direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    z-index: 10;
`;

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const SearchBar = styled.input`
    width: 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SortOptions = styled.div`
    display: flex;
    justify-content: center;
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

const Home = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const slides = [
        '/advertise1.png',
        '/advertise2.png',
        '/advertise3.png',
    ];

    const posts = [
        { image: '/poster1.png' },
        { image: '/poster2.png' },
        { image: '/poster3.png' },
        { image: '/poster4.png' },
        { image: '/poster5.png' },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <Container>
        <Slider>
            <Arrow direction="left" onClick={prevSlide}>❮</Arrow>
            <SliderContent currentIndex={currentIndex}>
            {slides.map((slide, index) => (
                <Slide key={index}>
                <img src={slide} alt={`Slide ${index}`} />
                </Slide>
            ))}
            </SliderContent>
            <Arrow direction="right" onClick={nextSlide}>❯</Arrow>
        </Slider>
    
        <SearchBarContainer>
            <SearchBar placeholder="검색어를 입력해보세요" />
        </SearchBarContainer>
    
        <SortOptions>
            <li>신규순</li>
            <li>|</li>
            <li>검색순</li>
            <li>|</li>
            <li>분류3</li>
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
    );  
};

export default Home;
