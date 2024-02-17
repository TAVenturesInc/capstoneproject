import ReactDOM from 'react-dom';
import QRCode from 'qrcode.react';



const QRGenerator = ({ value }) =>{
    return(
        <div>
            <QRCode value={ value } />
        </div>
    );
};

export default QRGenerator;