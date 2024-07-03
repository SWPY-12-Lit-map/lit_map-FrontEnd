import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CategoryMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    padding-left: 0;
    gap: 15px;
    margin-bottom: 20px;
`;

const CategoryMenuItem = styled.li`
    padding: 0 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const BarsIcon = styled(FontAwesomeIcon)`
    color: #8D8D8D;
`;

function Category() {
    return (
        <CategoryMenu>
            <CategoryMenuItem><BarsIcon icon={faBars} /></CategoryMenuItem>

            <CategoryMenuItem><StyledLink to="/category1">카테고리1</StyledLink></CategoryMenuItem>
            <CategoryMenuItem><StyledLink to="/category2">카테고리2</StyledLink></CategoryMenuItem>
            <CategoryMenuItem><StyledLink to="/category3">카테고리3</StyledLink></CategoryMenuItem>
        </CategoryMenu>
    );
}

export default Category;
