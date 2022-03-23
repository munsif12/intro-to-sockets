import Navbar from "./components/Navbar";
import Layout from './layout'
import TimeStamp from "./pages/TimeStamp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  // console.log(selectedDays.map(val => obj[val]?.weight));    -----------> What will be the output of this code! <-------------
  // console.log(selectedDays.filter(val => obj[val]?.weight)); -----------> What will be the output of this code! <-------------
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Layout >
            <TimeStamp />
          </Layout >}
          />
          <Route exact path='/test' element={<Layout >
            <div className="Test bg-white w-full">
              {[...Array(100).keys()].map(val => (<p>{`test - val ${val}`}</p>))}</div>
          </Layout >}
          />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;