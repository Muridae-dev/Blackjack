import React, { useEffect, useState } from 'react';
import './App.css'
import Cardbox from './components/Cardbox';
import Bustbox from './components/Bustbox';
import SHBtnBox from './components/SHBtnBox';
import Potbox from './components/Potbox';
import Button from './components/Button';


let dealer = [{
  hand : [],
  value : 0,
  aceActive : 0
}];

  //PUTTING AN ARRAY INSIDE AN ARRAY IN ORDER TO SAVE DIFFERENT HANDS FOR THE SAME PLAYER[0], SPLITTING ETC
let player = [{
    hand : [],
    value : 0,
    aceActive : 0
}];

function App() {

  const [dealerActive, setDealerActive] = useState(false);
  //DEALER[0] ONLY NEEDS 1 ARRAY


  const [pValue, changePValue] = useState();
  const [dValue, changeDValue] = useState();
  const [loser, changeLoser] = useState();
  const [reason, changeReason] = useState();
  const [playing, changePlaying] = useState(false);
  const [activeButtons, changeActiveButtons] = useState(false)
  const [bet, changeBet] = useState(parseInt(localStorage.bet)) 
  const [pot, changePot] = useState(parseInt(localStorage.pot))


    //--IF THE PLAYER[0] DECIDES TO STAND
  async function standHand () {
    changeActiveButtons(false);
      console.log("standhand is being ran")
      setDealerActive(true);
      
      while(dealer[0].value < 17) {
          dealer = await saveCard(dealer, "dealer");
      }

      checkWinner();
      changeActiveButtons(true);
  }
  

    
  //-------------------------------------------------API STUFF-------------------------------------------------
    //--FETCHING A NEW DECK FROM API
    async function fetchCards() {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      return await response.json();
  }

  //--WE DRAW A CARD FROM THE API AND RETURN SAID CARD AS AN OBJECT
  async function drawCard() {
      //FETCH
      let response = await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.deckID}/draw/?count=1`);
      let handCheck = await response.json();

      //IF WE HAVE 15 OR LESS CARDS RESHUFFLE THE DECK
      console.log(handCheck.remaining)
      if(handCheck.remaining < 15) {
          await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.deckID}/shuffle/`);
          console.log("shuffled");
          response = await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.deckID}/draw/?count=1`);
          handCheck = await response.json();
          console.log(handCheck.remaining);
      }
      
      return handCheck
  }

  
    //--DETERMINE THE NUMERICAL VALUE OF A CARD
    async function checkCardValue(cardName) {
      let cardValue = 0;
      let aceActive = 0;

      //JACK QUEEN OR KING = 10
      if(cardName.match(/^(JACK|QUEEN|KING)$/)) cardValue = 10;

      //ACE = 11 AND ADD TO ACTIVE ACES
      else if(cardName === "ACE") {cardValue = 11; aceActive++;}

      //NUMERICAL VALUES (1-10) GET PARSED TO AN INT
      else { cardValue = parseInt(cardName)}

      //RETURN AS AN ARRAY
      return [cardValue, aceActive];

  }

      //--CHECK WHICH HAND IS THE HIGHEST
      function checkWinner () {
        changePlaying(false)
        //IF DEALER[0] GETS BLACKJACK
        if(dealer[0].value === 21 && dealer[0].hand.length === 2) { changeLoser("player"); changeReason("blackjack")}

        else {
            if(dealer[0].value < player[0].value) {
              changeLoser("dealer");
              changeReason("value");

              changeBet(parseInt(localStorage.bet))
              changePot(parseInt(localStorage.pot)+bet)
              localStorage.pot = parseInt(localStorage.pot)+bet;

            }

            if(dealer[0].value >= player[0].value && dealer[0].value <= 21) {
              changeLoser("player");
              changeReason("value");

              changeBet(parseInt(localStorage.bet))
              changePot(parseInt(localStorage.pot)-bet)
              localStorage.pot = parseInt(localStorage.pot)-bet;
            }
        }

    }

  async function drawHand() {
    setDealerActive(false);
    changeActiveButtons(false);
    console.log("drawhand is being ran")
    resetHand();
    for(var i = 0; i < 4; i++) {
      console.log("loop is being ran" + i)
      if(i%2) {dealer = await saveCard(dealer, "dealer");}
      else {player = await saveCard(player, "player");console.log("PLAYER[0]" + i)}
    }
    changePlaying(true);
    changeActiveButtons(true);

  }
  //--DRAW & SAVE CARDS TO THE PLAYER[0]S HAND
  async function saveCard(thePlayer, playerWho) {
    //DRAW CARD
    thePlayer[0].hand.push(await drawCard());
    let handLength = thePlayer[0].hand.length - 1;

    //CHECK CARD VALUES AND ACTIVE ACES AND ADD THEM TO TEMPORARY VARIABLES
    let [ cardValues, aceActive ] = await checkCardValue(thePlayer[0].hand[handLength].cards[0].value);

    //ADD CHECKED VALUES AND ACTIVE ACES TO THE P1 ARRAY
    thePlayer[0].value += cardValues;
    thePlayer[0].aceActive += aceActive;

    
    //LOSING SCENARIO
    if(thePlayer[0].value > 21 && thePlayer[0].aceActive === 0) {
        changeLoser(playerWho);
        changeReason("BUST")
        changePlaying(false)

        if(playerWho === "dealer") {
          changeBet(parseInt(localStorage.bet))
          changePot(parseInt(localStorage.pot)+bet)
          localStorage.pot = parseInt(localStorage.pot)+bet;
        }

        if(playerWho === "player") {
          changeBet(parseInt(localStorage.bet))
          changePot(parseInt(localStorage.pot)-bet)
          localStorage.pot = parseInt(localStorage.pot)-bet;
        }
        
    }

    //LOSING SCENARIO BUT WITH AN ACTIVE ACE
    if(thePlayer[0].value > 21 && thePlayer[0].aceActive !== 0) {
      thePlayer[0].value -= 10;
      thePlayer[0].aceActive--;
    }

    if(playerWho === "dealer") {changeDValue(thePlayer[0].value)}
    if(playerWho === "player") {changePValue(thePlayer[0].value)}
    console.log(thePlayer)

    return thePlayer;
  }

      //--RESET HAND TO EMPTY
      function resetHand() {
        changeDValue(0);
        changePValue(0);
        dealer = [{
            hand : [],
            value : 0,
            aceActive : 0
        }];

        player = [{
            hand : [],
            value : 0,
            aceActive : 0
        }];
    }
    

  

  useEffect(() => {
    async function init() {
        //IF THERE IS NO DECK ID IN LOCAL STORAGE CREATE ONE
        if(!localStorage.deckID) {
          const hand = await fetchCards();
          localStorage.deckID = hand.deck_id;
      }

      //IF YOU HAVE NO POT CREATE ONE WITH A VALUE OF 1000
      if(!localStorage.pot) {
          localStorage.pot = 1000;
          localStorage.bet = 0;
      }

      console.log("init is being ran")

      changeActiveButtons(true)
    }
    init();
  }, [])

  const func100 = () => {localStorage.bet = parseInt(localStorage.bet)+100; changeBet(parseInt(localStorage.bet))}
  const func500 = () => {localStorage.bet = parseInt(localStorage.bet)+500; changeBet(parseInt(localStorage.bet))}
  const func1000 = () => {localStorage.bet = parseInt(localStorage.bet)+1000; changeBet(parseInt(localStorage.bet))}
  const func10000 = () => {localStorage.bet = parseInt(localStorage.bet)+10000; changeBet(parseInt(localStorage.bet))}

  if(bet > pot) {localStorage.bet = 0; changeBet(0)}

  console.log("DEALER: ", dealer[0]);

  return (
    <div className="App">
      <Cardbox player={dealer[0]} value={dValue} playerName={"dealer"} dealerActive={dealerActive}/>
      <Bustbox loser={loser} reason={reason} playing={playing}/>
      <SHBtnBox standFunc={standHand} hitFunc={() => saveCard(player, "player")} drawFunc={drawHand} playing={playing} active={activeButtons} bet={bet}/>
      <Cardbox player={player[0]} value={pValue} playerName={"player"}/>
      <Potbox bet={bet} pot={pot} func100={() => func100()} func500={() => func500()} 
      func1000={() => func1000()} func10000={() => func10000()}/>
    </div>
  );}

export default App;
