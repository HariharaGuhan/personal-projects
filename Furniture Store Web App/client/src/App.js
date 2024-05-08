import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import TopNav from './component/navbar/TopNav';
import Home from './component/pages/home';
import Footer from './component/pages/footer';
import Chair from './component/pages/p_chair';
import Sofa from './component/pages/p_sofa';
import Tables from './component/pages/p_tables';
import Jsondata from './component/pages/p_view';
import ShoppingCart from './component/pages/shopingCart';
import Contactus from './component/pages/contactus';


function App() {
  return (
   <>
   
   <BrowserRouter>
      <Routes>
        <Route path="/" element={[<TopNav />,<Home/>,<Footer/>]}/>
          <Route path="/home"element={[<TopNav/>,<Home/>,<Footer/>]} />
           <Route path="/addcart" element={[<TopNav/>,<ShoppingCart/>,<Footer/>]} />
          <Route path="/chair" element={[<TopNav/>,<Chair/>,<Footer/>]}/>
          <Route path="/favorites" element={[<TopNav/>,<Chair/>,<Footer/>]}/>
          <Route path="/sofa" element={[<TopNav/>,<Sofa/>,<Footer/>]}/>
          <Route path="/table" element={[<TopNav/>,<Tables/>,<Footer/>]}/>
          <Route path="/product" element={[<TopNav/>,<Chair/>,<Sofa/>,<Tables/>,<Footer/>]}/>
          <Route path="/details/:id" element={[<TopNav/>, <Jsondata/>,<Footer/>]} />
          <Route path="/contact" element={[<TopNav/>, <Contactus/>,<Footer/>]} />
          


      </Routes>
    </BrowserRouter>
   </>
  );
}


export default App;