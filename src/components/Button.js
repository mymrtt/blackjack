// Libs
import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  margin-right: .5rem;
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  width: ${(props) => props.width ? props.width : '18rem'};
  height: ${(props) => props.height ? props.height : '4rem'};
  color: ${(props) => props.color ? props.color : '#fff'};
  font-family: 'Overpass', Bold;
  font-size: .9rem;
  font-weight: ${(props) => props.fontWeight ? props.fontWeight : '800'};
  border-radius: 8px;
  border: none;
  border-bottom: ${(props) => props.borderBottom};
  background: ${(props) => props.bg ? props.bg : '#20bf55'};
  cursor: pointer;

  @media(max-width: 648px) {
    margin: 0;
    margin: .5rem;
    width: 16rem;
  }
`;

const Button = (props) => (
  <Container
    marginTop={props.marginTop}
    marginLeft={props.marginLeft}
    width={props.width}
    height={props.height}
    color={props.color}
    bg={props.bg}
    borderBottom={props.borderBottom}
    fontWeight={props.fontWeight}
    onClick={props.onClick}
  >
    {props.text}
  </Container>
);


export default Button;
