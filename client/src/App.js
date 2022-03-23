import Navbar from "./components/Navbar";
import Layout from './layout'
import TimeStamp from "./pages/TimeStamp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LiveChart from "./pages/LiveChart";
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
          <Route exact path='/livechart' element={<Layout >
            <LiveChart />
          </Layout >}
          />
          <Route exact path='*' element={<Layout >
            <div className="notFound h-[100%] flex justify-center items-center">
              <h1 className="text-white text-[7rem]">404 Not Found :( </h1>
            </div>
          </Layout >}
          />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;