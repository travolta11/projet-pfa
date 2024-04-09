import { BrowserRouter, Route, Routes ,useLocation,useParams} from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import { AnimatePresence } from 'framer-motion';
import Monument from "../Pages/Monument";
import Utilisateur from "../Pages/Utilisateur";
import AjouterM from "../Pages/Monument/ajouterMonument";
import ModifierM from "../Pages/Monument/modifierMonument";

function AppRoutes(){

    const location=useLocation();


    return (
        <AnimatePresence>
        <Routes >
          {/* Dashbaord*/}
          <Route path="/" element={<DashBoard />}></Route>

          {/* Monument*/}
          <Route path="/monument" element={<Monument />}></Route>
          <Route path="/monument/ajouterM" element={<AjouterM/>}></Route>
          <Route path="/monument/modifierM" element={<ModifierM />}></Route>

          {/* Utilisateur*/}
          <Route path="/utilisateur" element={<Utilisateur />}></Route>
          </Routes>
        </AnimatePresence>


    );





}


export default AppRoutes;