import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import {lazy} from "react";


const Home = lazy(()=> import("./pages/Home.tsx"))
const SingleGame = lazy(()=> import("./pages/SingleGame.tsx"))


function App() {

  return (
    <>
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": "#772fdc",
                    "colorInfo": "#772fdc"
                },

            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/game/:gameId" element={<SingleGame />}></Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>

    </>
  )
}

export default App
