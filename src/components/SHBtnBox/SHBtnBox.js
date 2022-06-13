import './SHBtnBox.css'
import Button from '../Button';
import React, { useEffect, useState } from 'react';

function SHBtnBox({standFunc, hitFunc, drawFunc, playing, active, bet}) {

    const startGameButtons = <div><Button theEvent={() => {standFunc();}} label={`Stand`} active={active}/> <Button theEvent={hitFunc} label={`Hit`} active={active}/></div>;


    const endGameButtons = <Button theEvent={() => {drawFunc();}} label={`Bet ${bet}`} givenID={"betButton"} active={active}/>;



  return (
    <div id="buttonContainer">
        {playing ? startGameButtons : endGameButtons}
    </div>
  );}

export default SHBtnBox;
