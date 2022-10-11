import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "../img/helmet-1.png", matched: false },
  { "src": "../img/potion-1.png", matched: false },
  { "src": "../img/ring-1.png", matched: false },
  { "src": "../img/scroll-1.png", matched: false },
  { "src": "../img/shield-1.png", matched: false },
  { "src": "../img/sword-1.png", matched: false }
]



function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)

    // initialize turns
    setTurns(0);
  }

  // handle choices
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.src === secondChoice.src) {
        console.log("Match!")
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      } else {
        console.log("Not match")
      }

      setTimeout(() => updateGame(), 1000)
    }
  }, [firstChoice, secondChoice])

  console.log(cards)

  // reset card choices and update turn info
  const updateGame = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurn => prevTurn + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice
              || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
