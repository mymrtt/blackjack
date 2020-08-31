// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Card from './components/Card';
import Button from './components/Button';

// Images
import CasinoBg from './assets/casino-table.jpg';
import MenuIcon from './assets/menu.svg';

// Styles
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url(${CasinoBg});
  font-family: 'Overpass', Bold;

  @media(max-width: 648px) {
    background-position-x: center;
    background-position-y: center;
  }
`;

const Points = styled.div`
  img {
    display: none;
  }

  @media(max-width: 648px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    img {
      margin: .5rem;
      width: 2rem;
      display: flex;
    }
  }
`;

const Title = styled.h1`
  color: #fff;
  font-weight: 800;

  @media(max-width: 648px) {
    font-size: 1.5rem;
  }
`;

const ContainerCards = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media(max-width: 648px) {
    margin: 1rem;
    justify-content: center;
  }
`;

const ContainerButtons = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContainerPoints = styled.div`
  position: relative;
  z-index: 2;
`;

const ContainerPointsArrow = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;

  @media(max-width: 648px) {
    top: 3rem;
    right: 1rem;
  }
`;

const WrapperPoints = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  z-index: 2;

  @media(max-width: 648px) {
    top: 3.8rem;
  }
`;

const TextPoints = styled.p`
  color: #000;
  font-size: 1rem;

  @media(max-width: 648px) {
    width: max-content;
  }
`;

const FinalMessage = styled.p`
  color: #fff;
  font-size: 1.3rem;

  @media(max-width: 648px) {
    margin-top: 12rem;
    text-align: center;
  }
`;

class App extends Component {
  state = {
    cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    suits: ["paus", "copas", "espadas", "ouros"],
    deck: [],
    userCards: [],
    result: undefined,
    points: 0,
    finalMessage: undefined,
    isRenderPoints: false,
    sominha: 0,
  }

  componentDidMount() {
    this.createCard();
  }

  // Verificar o valor da carta
  getCardValue = (card) => {
    if (card === 'A') {
      return 1;
    }

    if (card === 'J' || card === 'Q' || card === 'K') {
      return 10;
    }

    return Number(card);
  }

  // Criar uma carta e enviar para a lista deck
  createCard = () => {
    const { cards, suits, deck } = this.state;

    cards.forEach((card) => {
      suits.forEach((suit) => {
        deck.push({
          label: card,
          value: this.getCardValue(card),
          suit
        })
      })
    })

    this.setState({
      deck,
    });
  }

  // Gerar uma carta aleatória
  handleGetCard = () => {
    const { deck } = this.state;

    const index = Math.floor(Math.random() * (51 - 0 + 1)) + 0;

    return deck[index];
  }

  // Gerar uma nova carta
  handleNewCard = () => {
    const { userCards, points, sominha } = this.state;

    let card = this.handleGetCard();

    let list = userCards.concat(card);

    this.setState({
      userCards: list,
    });

    if (userCards.length > 0) {
      const values = list.map((card) => card.value);
      let sum = values.reduce((a, b) => {return a + b}, 0);

      // Para atrasar sum
      this.setState({
        sominha: sum,
      });

      if (sominha > 21) {
        this.setState({
          sominha: sominha,
          finalMessage: 'Você perdeu :('
        })

        return;
      } 
  
      if (sominha === 21) {
        this.setState({
          points: points + 1,
          finalMessage: 'Você ganhou!!! Jogue novamente!'
        })
        return;
      }
    }
  }

  handleNewGame = () => {
    this.setState({
      userCards: [], 
      sominha: 0,
      finalMessage: false,
    });
  }

  handlePoints = () => {
    this.setState({
      isRenderPoints: !this.state.isRenderPoints,
    });
  }

  renderPoints = () => {
    const { points } = this.state;

    return (
      <ContainerPoints>
        <ContainerPointsArrow />
        <WrapperPoints>
          <TextPoints>{points} é a sua pontuação até o momento.</TextPoints>
          <TextPoints>{points > 0 ? 'Continue testando' : 'Teste'} a sua sorte!</TextPoints>
        </WrapperPoints>
      </ContainerPoints>
    )
  }

  // Renderizar o jogo
  renderCardGame = () => {
    const { userCards, finalMessage } = this.state;

    return (
      <>
        {!finalMessage ? (
          <ContainerCards>
            {userCards.map((card) => (
              <div key={card}>
                <Card card={card} />
              </div>
            ))}
          </ContainerCards>
        ) : <FinalMessage>{finalMessage}</FinalMessage>}
        <ContainerButtons>
          <Button
            text='Nova Carta'
            onClick={this.handleNewCard}
            bg={finalMessage && '#00000026'}
            blockedCursor={finalMessage}
          />
          <Button
            bg='red'
            text='Novo jogo'
            onClick={this.handleNewGame} 
          />
        </ContainerButtons>
      </>
    )
  }

  render() {
    const { isRenderPoints } = this.state;

    return (
      <Container onClick={() => isRenderPoints && this.setState({ isRenderPoints: false })}>
        <Points>
          <Button
            marginTop='1rem'
            marginLeft='70rem'
            color='#fff'
            bg='transparent'
            borderBottom='1px solid'
            width='auto'
            height='auto'
            fontWeight='600'
            text='Pontuação +'
            mobDisplay='none'
            onClick={this.handlePoints}
          />
          <img src={MenuIcon} alt="menu" onClick={this.handlePoints} />
          {isRenderPoints && this.renderPoints()}
        </Points>
        <Title>Jogue agora 21!</Title>
        {/* <Title>{this.state.sominha}</Title> */}
        {this.renderCardGame()}
      </Container>
    );
  }
}

export default App;
