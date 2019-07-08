import React from 'react';
import styled, { css } from 'styled-components';
// import style from './style.css';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => (props.subTitle ? 'red' : 'white')};

  ${props => props.primary && css`
    background: palevioletred;
    color: #fff;
  `}
`;

const Text = styled(Title)`
  font-size: 1em;
`;

const ReverseText = props =>
<p {...props} children={props.children.split('').reverse()}></p>

const App = () => (
  <>
    <Title subTitle>ssss</Title>
    <Text primary as="a" href="#">aiueo</Text>
    <Text primary as={ReverseText} href="#">aiueo</Text>
    {/* <div className={style.outer}>Test</div>
    <div className={style.inner}>Test</div> */}
  </>
);

export default App;
