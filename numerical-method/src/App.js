//import logo from './logo.svg';
import './App.css';

// import { Home,Bisection,FalsePosition,OnePoint,NewtonRaphson,Secant } from './Element';
import Home from './Element/Home';
import ApexChart from './Element/ApexChart';
// 1
import Bisection from './Element/Bisection';
import FalsePosition from './Element/FalsePosition';
import OnePoint from './Element/OnePoint';
import NewtonRaphson from './Element/NewtonRaphson';
import Secant from './Element/Secant';
// 2
import Cramer from './Element/Cramer';
import GaussEliminate from './Element/GaussEliminate';
import GaussJordan from './Element/GaussJordan';
import Invertion from './Element/Invertion';
import LUdecom from './Element/LUdecom';
// 3
import NewtonDiff from './Element/NewtonDiff';
import Lagrange from './Element/Lagrange';
import LeastSquareRegresstion from './Element/LeastSquareRegresstion';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Navigbar } from './navigatBar';

//math js
// import { create, all } from 'mathjs'
// const math = create(all)

//อย่าลืมไปทำ icon home href ={'/'} ด้วยนะทีหลัง

const CornerS = {
  width: "39%",
  height: "100%",
  // border: "1px groove #748DA6",
  borderRadius:"30px",
  boxShadow: "0px 0px 10px 10px #E4E1EB",
  padding: "1%",
  margin: "1% auto",
}

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Navigbar/>
        <div style={CornerS}>
          <Routes>
            <Route path="/" element={<Home/> } />  
            <Route path="/ApexChart" element={ <ApexChart/> } />
             {/* 1 */}
            <Route path="/Bisection" element={ <Bisection/> } />
            <Route path="/FalsePosition" element={ <FalsePosition/> } />
            <Route path="/OnePoint" element={ <OnePoint/> } />
            <Route path="/NewtonRaphson" element={ <NewtonRaphson/> } />
            <Route path="/Secant" element={ <Secant/> } />
            {/* 2 */}
            <Route path="/Cramer" element={ <Cramer/> } />
            <Route path="/GaussEliminate" element={ <GaussEliminate/> } />
            <Route path="/GaussJordan" element={ <GaussJordan/> } />
            <Route path="/Invertion" element={ <Invertion/> } />
            <Route path="/LUdecom" element={ <LUdecom/> } />
            {/* 3 */}
            <Route path="/NewtonDiff" element={ <NewtonDiff/> } />
            <Route path="/Lagrange" element={ <Lagrange/> } />
            <Route path="/LeastSquareRegresstion" element={ <LeastSquareRegresstion/> } />


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;