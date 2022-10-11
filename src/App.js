import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "../img/helmet-1.png" },
  { "src": "../img/potion-1.png" },
  { "src": "../img/ring-1.png" },
  { "src": "../img/scroll-1.png" },
  { "src": "../img/shield-1.png" },
  { "src": "../img/sword-1.png" }
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
      firstChoice.src === secondChoice.src
        ? console.log("Match!")
        : console.log("Not match")

      updateGame()
    }
  }, [firstChoice, secondChoice])

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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
