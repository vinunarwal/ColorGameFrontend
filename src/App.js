import "./App.css";
import ColorPicker from "./components/ColorPicker";
import Footer from "./components/Footer";
// import GameRecord from "./components/GameRecord";
import Home from "./components/Home";
import MidHeader from "./components/MidHeader";

function App() {
  return (
    <>
      <Home />
      <MidHeader />
      <ColorPicker />
      {/* <GameRecord /> */}
      <Footer />
    </>
  );
}

export default App;
