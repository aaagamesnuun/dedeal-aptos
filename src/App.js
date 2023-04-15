import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from './components/Navbar';
import Main from "./components/Main";
import Deal from './components/Deal';
import NotFound from "./components/NotFound";


const App = () => {

  console.log("1");

  
    return (
    <BrowserRouter>
    <div className="App">
      
      <Navbar/>

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/deal" element={<Deal />} >
          <Route path=':dealId' element={<Deal />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
    </BrowserRouter>
  );
}

// const Deal = () => {
//   const params = useParams();

//   return(
//     <div className="App">
//       <p>dealId:{params.dealId}</p>
//     </div>
//   )
// }

export default App;
