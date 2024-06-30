import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`;

const NavLogo = styled.div`
    display: flex;
    font-size: 24px;
    margin-right: 20px;

    @media all and (max-width: 960px) {
        font-size: 16px;
    }
`;

const LogoImg = styled.img`
    display: flex;
    width: 50px;
    height: auto;
    margin-left: 20px;
    margin-bottom: 15px;
`;

const NavMenu = styled.ul`
    display: flex;
    list-style: none;
    padding-left: 0;
    margin-right: auto;
`;

const NavMenuItem = styled.li`
    padding: 20px 15px;

    &:hover {
        border-radius: 4px;
    }
`;

const NavLogin = styled.ul`
    display: flex;
    color: #000;
    list-style: none;
    padding-left: 0;
`;

const NavLoginItem = styled.li`
    padding: 20px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const LoginButton = styled(StyledLink)`
    background-color: #D9D9D9;
    border-radius: 10px;
    width: 100px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

function Navbar() {
    return (
        <Nav>
            <NavLogo>
                <LogoImg src="/litmap.png" alt="로고" />
            </NavLogo>
            <NavMenu>
                <NavMenuItem>홈</NavMenuItem>
                <NavMenuItem>카테고리1</NavMenuItem>
                <NavMenuItem>카테고리2</NavMenuItem>
            </NavMenu>
            <NavLogin>
                <NavLoginItem><StyledLink to="/signup">가입하기</StyledLink></NavLoginItem>
                <NavLoginItem>
                    <LoginButton>로그인하기</LoginButton>
                </NavLoginItem>
            </NavLogin>
        </Nav>
    );
}

export default Navbar;
