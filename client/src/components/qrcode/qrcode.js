import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';



export const QRGenerator = (game_id) =>{
    
    ReactDOM.render(
        <QRCodeSVG value="https://reactjs.org/" />, // change to game player with game id
        document.getElementById('mountNode')
    );
};