import { useParams } from "react-router-dom";
import { Eye4eyeContext } from '../context/Eye4eyeContext';

const Deal = () => {
  const params = useParams();

  const {
    eye4eyeGrant,
    eye4eyeBuyerExecuteSeller,
    eye4eyeSellerExecuteBuyer,
    eye4eyeReleaseDeposit,
    eye4eyeGetDeal,
  } = useContext(Eye4eyeContext);

  const [deal, setDeal] = useState(null);

  const handleGrant = () => {
    eye4eyeGrant(params.dealId);
  };
  const handleBuyerExecuteSeller = () => {
    eye4eyeBuyerExecuteSeller(params.dealId);
  };
  const handleSellerExecuteBuyer = () => {
    eye4eyeSellerExecuteBuyer(params.dealId);
  };
  const handleReleaseDeposit = () => {
    eye4eyeReleaseDeposit(params.dealId);
  };

  useEffect(() => {
  }, []);

  return (
    <div className='mainContainer'>
      <h1 className='title'>Deal Details</h1>
      <p className='subtitle'>Deal ID: {params.dealId}</p>
    </div>
  );
}

export default Deal;
