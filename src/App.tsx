import "./App.css";
import Nav from "./components/nav";
import { useGetCountries } from "./hooks/useGetCountries";
import Home from "./pages/home";

function App() {
  const { countries, loading, error } = useGetCountries();
  console.log(countries);
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
