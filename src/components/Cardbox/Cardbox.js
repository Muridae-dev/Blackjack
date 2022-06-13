import './Cardbox.css'
import Card from '../Card';

function Cardbox({player, value, playerName, dealerActive}) {
    let cardNr = 0;
    let handItems = player.hand.map((hand) =>
    <div>
        <Card player={player} picURL={hand.cards[0].images.png} cardNr={cardNr++} dealerActive={dealerActive}/>
    </div>
);


  return (
    <div className="cardBox" id={`${playerName}Hand`}>
        <div className="cardValue" id={`${playerName}CardValue`}>
            <div className="centeredBox">{playerName === "dealer" && dealerActive === false ? "" : value}</div>
        </div>
        {handItems}

    </div>
  );}

export default Cardbox;
