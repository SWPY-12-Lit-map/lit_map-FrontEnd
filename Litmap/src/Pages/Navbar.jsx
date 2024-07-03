import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`;

const NavLogo = styled(Link)`
    display: flex;
    font-size: 24px;
    margin-right: 10px;

    @media all and (max-width: 960px) {
        font-size: 16px;
    }
`;

const LogoImg = styled.img`
    display: flex;
    width: 80px;
    height: auto;
    margin-left: 10px;
`;

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    position: relative;
`;

const SearchBar = styled.input`
    width: 500px;
    padding: 8px;
    padding-left: 35px;
    border: 1px solid #EDEDED;
    border-radius: 30px;
    color: #8D8D8D;
    box-shadow: 0 6px 6px -2px rgba(0, 0, 0, 0.3);
`;

const SearchIcon = styled(FontAwesomeIcon)`
    width: 20px;
    position: absolute;
    left: 10px;
    color: #8D8D8D;
`;

const Profile = styled.div`
    display: flex;
    font-size: 24px;
    margin-right: 10px;
`;

const ProfileImg = styled.img`
    display: flex;
    width: 40px;
    height: auto;
    margin-right: 10px;
`;

function Navbar() {
    return (
        <Nav>
            <NavLogo to="/">
                <LogoImg src="/Logo.png" alt="로고" />
            </NavLogo>

            <SearchBarContainer>
                <SearchIcon icon={faMagnifyingGlass} />
                <SearchBar placeholder="검색어를 입력해보세요" />
            </SearchBarContainer>

            <Profile>
                <ProfileImg src="profile.png" alt="프로필"/>
            </Profile>
        </Nav>
    );
}

export default Navbar;
