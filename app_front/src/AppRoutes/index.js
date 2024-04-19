import { BrowserRouter, Route, Routes ,useLocation,useParams} from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import { AnimatePresence } from 'framer-motion';
import Monument from "../Pages/Monument";
import Utilisateur from "../Pages/Utilisateur";
import AjouterM from "../Pages/Monument/ajouterMonument";
import ModifierM from "../Pages/Monument/modifierMonument";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Login";
import VoirMonument from "../Pages/Monument/voirMonument";
function AppRoutes(){

    const location=useLocation();


    return (
        <AnimatePresence>
        <Routes >
        <Route path="/login" element={<Login />} />

          {/* Dashbaord*/}
          <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashBoard />}/>

          {/* Monument*/}
          <Route path="/monument" element={<Monument />} />
          <Route path="/monument/ajouterM" element={<AjouterM/>} />
          <Route path="/monument/modifierM" element={<ModifierM />} />
          <Route path="/monument/voirMonument" element={<VoirMonument />} />

          {/* Utilisateur*/}
          <Route path="/utilisateur" element={<Utilisateur />} />
          </Route>
          </Routes>
        </AnimatePresence>


    );





}


export default AppRoutes;