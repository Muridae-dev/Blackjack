import './Card.css'

function Card({picURL, player, cardNr, dealerActive}) {
    console.log("CARD DRAW:", player, cardNr, dealerActive)
    let yPos = cardNr;
    if(yPos > 3) yPos = yPos - 4;
    /*if(cardNr === 1 && dealerActive === false) {
        picURL = "./cardback.svg"
        console.log("dealer just got his second card")
    }*/
    return (
      <div className="playingCard" style={{top:30*yPos + 'px', left:`calc(50% + ${30*cardNr}px`}}>
          <img src={dealerActive === false && cardNr === 1 ? "./cardback.svg" : `${picURL}`} style={{height:"100%", width:"auto"}} alt={"this is my"}></img>
      </div>
    );}
  
  export default Card;
  