import './Bustbox.css'

function Bustbox({loser, reason, playing}) {

            //CHANGING THE LOCALSTORAGE POT
            /*let pot = parseInt(localStorage.bet * win);
            pot += parseInt(localStorage.pot);
            localStorage.pot = pot;*/
  

  

  return (
    <div id="bustBox" style={{visibility: playing ? "hidden" : "visible"}}>
        {loser} is the loser <br/>
        reason: {reason}
    </div>
  );}

export default Bustbox;
