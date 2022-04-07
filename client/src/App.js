import Navbar from "./components/Navbar";
import Layout from './layout'
import TimeStamp from "./pages/TimeStamp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LiveChart from "./pages/LiveChart";
import RealtimeChat from "./pages/RealtimeChat";
import RealtimeChatLogin from "./pages/RealtimeChatLogin";

import Socket from 'socket.io-client'
const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/";
const socket = Socket(ENDPOINT);
function App() {

  // console.log(selectedDays.map(val => obj[val]?.weight));    -----------> What will be the output of this code! <-------------
  // console.log(selectedDays.filter(val => obj[val]?.weight)); -----------> What will be the output of this code! <-------------
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' onLeave={() => alert('u sure')} element={<Layout >
            <TimeStamp socket={socket} />
          </Layout >}
          />
          <Route exact path='/livechart' element={<Layout >
            <LiveChart socket={socket} />
          </Layout >}
          />
          <Route exact path='/realtime-chat' element={<Layout >
            <RealtimeChat />
          </Layout >}
          />
          <Route exact path='/login' element={<Layout >
            <RealtimeChatLogin />
          </Layout >}
          />
          <Route exact path='*' element={<Layout >
            <div className="notFound h-[100%] flex justify-center items-center">
              <h1 className="text-white text-[7rem]">404 Not Found :( </h1>
            </div>
          </Layout >
          }
          />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;