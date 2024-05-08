import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navuser from './component/navbar/userNav';
import Carousel from './component/navbar/pages/carousel';
import SignUpForm from './component/navbar/pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navuser />
                <Carousel />  
              </>
            }
          />
          <Route path='/up' element={[<Navuser />,<SignUpForm />]}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
