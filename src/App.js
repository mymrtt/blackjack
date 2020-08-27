// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Card from './components/Card';
import Button from './components/Button';

// Styles
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: darkgreen;
`;

const Points = styled.div`
  @media(max-width: 648px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: #fff;
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
`;

const TextPoints = styled.p`
  color: #000;
  font-family: 'Overpass', Bold;
  font-size: 1rem;
`;

const FinalMessage = styled.p`
  color: #fff;
  font-size: 1.3rem;
  font-family: 'Overpass', Bold;

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
    const { userCards, points } = this.state;

    let card = this.handleGetCard();

    let list = userCards.concat(card);

    this.setState({
      userCards: list,
    });

    if (userCards.length > 0) {
      const values = list.map((card) => card.value);

      let sum = values.reduce((a, b) => {return a + b}, 0);

      this.setState({
        sum,
      })

      if (sum > 21) {
        this.setState({
          finalMessage: 'Você perdeu :('
        })

        return;
      } 
  
      if (sum === 21) {
        this.setState({
          points: points + 1,
          finalMessage: 'Você ganhou!!! Teste novamente a sua sorte!'
        })
      }
    }
  }

  handleNewGame = () => {
    this.setState({
      userCards: [], 
      sum: 0,
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
          <TextPoints>Continue testando a sua sorte!</TextPoints>
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
            onClick={this.handlePoints}
          />
          {isRenderPoints && this.renderPoints()}
        </Points>
        <Title>Jogue agora 21!</Title>
        {this.renderCardGame()}
      </Container>
    );
  }
}

export default App;
