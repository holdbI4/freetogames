import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {ConfigProvider} from "antd";
import {SingleGame} from "./pages/SingleGame.tsx";

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
