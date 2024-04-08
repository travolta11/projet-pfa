import { BrowserRouter, Route, Routes ,useLocation} from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Monument from "../Pages/Monument";
import Utilisateur from "../Pages/Utilisateur";

function AppRoutes(){

    const location=useLocation();


    return (
        <AnimatePresence>
        <Routes >
          {/* Dashbaord*/}
          <Route path="/" element={<DashBoard />}></Route>
          <Route path="/monument" element={<Monument />}></Route>
          <Route path="/utilisateur" element={<Utilisateur />}></Route>
          </Routes>
        </AnimatePresence>


    );





}


export default AppRoutes;