import './Potbox.css'
import Button from '../Button';

function Potbox({bet, pot, func100, func500, func1000, func10000, resetBet}) {

    function checkBetButtons() {
        /*if((parseInt(localStorage.pot) - parseInt(localStorage.bet)) < 100) {document.getElementById("betBtn100").disabled = true}
        if((parseInt(localStorage.pot) - parseInt(localStorage.bet)) < 500) {document.getElementById("betBtn500").disabled = true}
        if((parseInt(localStorage.pot) - parseInt(localStorage.bet)) < 1000) {document.getElementById("betBtn1000").disabled = true}
        if((parseInt(localStorage.pot) - parseInt(localStorage.bet)) < 10000) {document.getElementById("betBtn10000").disabled = true}*/

        if(pot - bet < 100) {document.getElementById("betBtn100").disabled = true} else {document.getElementById("betBtn100").disabled = false}
        if(pot - bet < 500) {document.getElementById("betBtn500").disabled = true} else {document.getElementById("betBtn500").disabled = false}
        if(pot - bet < 1000) {document.getElementById("betBtn1000").disabled = true} else {document.getElementById("betBtn1000").disabled = false} 
        if(pot - bet < 10000) {document.getElementById("betBtn10000").disabled = true} else {document.getElementById("betBtn10000").disabled = false}
    }
      
      if(document.getElementById("betBtn100")) {checkBetButtons();}
      console.log(bet)
      console.log(pot)
      return (
        <div id="potBox">
          CURRENT POT: {pot} <br/>
          <Button theEvent={() => {func100(); checkBetButtons();}}  label={"+100"} givenID={"betBtn100"}/>
          <Button theEvent={() => {func500(); checkBetButtons();}}  label={"+500"} givenID={"betBtn500"}/>
          <Button theEvent={() => {func1000(); checkBetButtons();}}  label={"+1000"} givenID={"betBtn1000"}/>
          <Button theEvent={() => {func10000(); checkBetButtons();}}  label={"+10 000"} givenID={"betBtn10000"}/>
          
        </div>
      )

}



export default Potbox;
