import "./App.css";
import Nav from "./components/nav";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Nav />
      <div className="pt-[104px] md:pt-[128px]">
        <Home />
      </div>
    </>
  );
}

export default App;
