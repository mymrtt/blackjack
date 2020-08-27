import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-right: 1rem;
  width: 8rem;
  height: 12rem;
  border: 1px solid;
  border-radius: 8px;
  background: #fff;
  font-family: 'Overpass', Regular;

  @media(max-width: 648px) {
    margin-bottom: 1rem;
  }
`; 

const Value = styled.p`
  position: absolute;
  top: ${(props) => props.first && '0'};
  right: ${(props) => !props.first && '.5rem'};
  left: ${(props) => props.first && '.5rem'};
  bottom: ${(props) => !props.first && '0'};
  color: ${(props) => props.suitColor ? 'red' : '#000'}
`;

const Suit = styled.p`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: ${(props) => props.suitColor ? 'red' : '#000'}
`;

function Card(props) {

  const { card } = props;

  const handleSuit = () => {
    switch(card.suit) {
      case "copas":
        return '♥'
      case "paus":
        return '♣'
      case "espadas":
        return '♠'
      case "ouros":
        return '♦'
      default: return ''
    }
  }

  const suit = card.suit !== 'paus' && card.suit !== 'espadas';

  return (
    <Container>
      <Value
        first
        suitColor={suit}
      >
        {card.label}
      </Value>
      <Suit
        suitColor={suit}
      >
        {handleSuit()}
      </Suit>
      <Value
        suitColor={suit}
      >
        {card.label}
      </Value>
    </Container>
  );
}

export default Card;
