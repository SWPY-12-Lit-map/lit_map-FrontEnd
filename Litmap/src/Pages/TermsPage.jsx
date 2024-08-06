import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  background-color: #fbf9f6;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #575757;
`;

const Content = styled.div`
  white-space: pre-wrap;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #8b0024;
  padding: 5px 10px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    color: #e7c6ce;
  }
`;

const TermsPage = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/termsofservice.txt')
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Failed to load terms:', error));
  }, []);

  return (
    <PageContainer>
      <CloseButton onClick={() => navigate(-1)}>×</CloseButton>
      <Title>이용약관</Title>
      <Content>{content}</Content>
    </PageContainer>
  );
};

export default TermsPage;
