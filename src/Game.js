
import React, {useEffect, useState} from "react";
import './styles/App.css';
import SingleCard from "./components/SingleCard";
import {useLocation} from "react-router";
import firebase from "./firebase";

const cardImages = [
    {"src": "/img/king-one.jpg", matched: false},
    {"src": "/img/power-one.png", matched: false},
    {"src": "/img/warrior-one.jpg", matched: false},
    {"src": "/img/weapon-one.jpg", matched: false},
    {"src": "/img/health-one.jpg", matched: false},
    {"src": "/img/protector-one.jpg", matched: false}
]

const Game = () => {

    const db = firebase.firestore();
    const [cards, setCards] = useState([])
    //eslint-disable-next-line
    const [turns, setTurns] = useState(0)
    const [token, setToken] = useState(400)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [balance, setBalance] = useState(0)

    const location = useLocation();
    const address = location.state;

    console.log("USer Data:", address)

    function getInfo() {
        db.collection("users")
            .doc(address)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // console.log("User Data", documentSnapshot.data());
                    // setUserData(documentSnapshot.data());
                    setBalance(documentSnapshot.data().balance);

                } else {
                    console.log("none");
                }
            })
            }
    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random()}))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
        setToken(400)
    }
    // handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    //compare 2 selected cards
    useEffect(() => {
        getInfo()
        if(choiceOne && choiceTwo) {
            setDisabled(true)
            if(choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src) {
                            return {...card, matched: true}
                        }else {
                            return card
                        }
                    })
                })
                resetTurn()
            }else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
        // eslint-disable-next-line
    }, [choiceOne, choiceTwo])

    //reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns +1)
        setToken(prevToken => prevToken -20)
        setDisabled(false);
    }

    //start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className="body">
            <div className="App">
                <div className="row">
                    <div className="col-3">
                        <h5>Balance: {balance ? balance : "0"} DFTOKEN</h5>
                    </div>
                    <div className="col-6">
                        <h3> Dragon Magic Match</h3>
                        <button onClick={shuffleCards}>New Game</button>
                    </div>
                    <div className="col-3">

                    </div>
                </div>

                <div className="card-grid">
                    {cards.map(card => (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card === choiceTwo || card.matched}
                            disabled={disabled}
                        />
                    ))}
                </div>
                <div className="turns">
                    <ul>
                        <li>Turns: {turns}</li>
                        <li>DFTOKEN: {turns < 18 ? token : "0"}</li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default Game;
