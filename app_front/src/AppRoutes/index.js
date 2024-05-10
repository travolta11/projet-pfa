import { BrowserRouter, Route, Routes ,useLocation,useParams} from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import { AnimatePresence } from 'framer-motion';
import Monument from "../Pages/Monument";
import Utilisateur from "../Pages/Utilisateur";
import AjouterM from "../Pages/Monument/ajouterMonument";
import ModifierM from "../Pages/Monument/modifierMonument";
import VoirMonument from "../Pages/Monument/voirMonument";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Login";
import Createur from "../Pages/Createur";
import AjouterCreateur from "../Pages/Createur/ajouterCreateur";
import ModifierCreateur from "../Pages/Createur/modifierCreateur";
import VoirCreateur from "../Pages/Createur/voirCreateur";

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
          <Route path="/monument/ajouterMonument" element={<AjouterM/>} />
          <Route path="/monument/modifierMonument/:id" element={<ModifierM />} />
          <Route path="/monument/voirMonument/:id" element={<VoirMonument />} />


            {/* Createur*/}
            <Route path="/createur" element={<Createur />} />
          <Route path="/createur/ajouterCreateur" element={<AjouterCreateur/>} />
          <Route path="/createur/modifierCreateur/:id" element={<ModifierCreateur />} />
          <Route path="/createur/voirCreateur/:id" element={<VoirCreateur />} />

          {/* Utilisateur*/}
          <Route path="/utilisateur" element={<Utilisateur />} />
          </Route>
          </Routes>
        </AnimatePresence>


    );





}


export default AppRoutes;