import QRCode from "qrcode.react";
import { useParams } from "react-router";

import appURL from "../../appURL";

const QRGenerator = () => {
  const { id } = useParams();

  return (
    <div>
      <QRCode value={`${appURL()}/game/${id}`} />
    </div>
  );
};

export default QRGenerator;
