
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home  from './Home';
import PolicyMaster from './components/PolicyMaster';
import List from './components/List';
import Edit from './components/Edit';
//import Edit from './components/Edit';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='components/PolicyMaster' element={<PolicyMaster/>} ></Route>
        <Route path='/List' element={<List/>} ></Route>
        {/* <Route path='/Edit' element={<Edit/>} ></Route> */}
        <Route path='/Edit' element={<Edit/>} ></Route>
        

        


      </Routes>
      </BrowserRouter>
   
  );
}

export default App;
