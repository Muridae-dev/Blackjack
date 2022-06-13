import './Button.css'

function Button({theEvent, label, givenID, active}) {
  if(active === undefined) {active = true}
  return (
    <button className="standDrawButton" id={givenID} onClick={theEvent} disabled={active ? false : true}>{label}</button>
  );}

export default Button;
