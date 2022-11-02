import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update';


function App() {
 


  return (
    <BrowserRouter>
    <div className="App" >
     <header className="primary-header">
      <h1 className="text-neutral-100 font-size-500">Milk-Shakes</h1>
      <nav className="primary-navigation">
       <ul className="nav-list">
         <li><Link to="/">Home</Link></li>
         <li><Link to="/create">Create New Smoothies</Link></li>
       </ul>
      </nav>
     </header>
   
     <Routes>
     
      <Route path="/" element={<Home h1tag={"Home"}  />}></Route>
      <Route path="/create" element={<Create h1tag={"Create"}/>}></Route>
      <Route path="/:id" element={<Update h1tag={"Update"}/>}></Route>
    
     </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
