import useWeather from "./hooks/useWeather";
import { useState, useEffect } from "react"; 
import SideLeft from "./componentes/SideLeft";
import ButonCelFar from "./componentes/ButonCelFar";
import Forecast from "./componentes/Forecast";
import TodayHigh from "./componentes/TodayHigh";
import SearchCity from "./componentes/SearchCity";

function App() {
  const {
    isNavOpen,
    setIsNavOpen,
    isCelcius,
    setIsCelcius,
    loading,
    weather,
    getAccurateWeather,
    getCities,
    cities,
    getCityWeather,
  } = useWeather();

  const [searchLocationVal, setSearchLocationVal] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode por defecto

  // <-- AGREGA ESTE useEffect: Aplica o remueve la clase 'dark' en la etiqueta <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const onChangeSearchLocation = (event) => {
    setSearchLocationVal(event.target.value);
  };

  if (loading) return <h1 className="text-gray-800 dark:text-[#E7E7EB]">Cargando tu ubicación...</h1>;

  return (
    // Ya no necesitamos el wrapper con la clase condicional, el useEffect lo maneja globalmente
    <div className="bg-white dark:bg-[#1E213A] w-screen min-h-screen flex flex-col items-center md:flex-row transition-colors duration-300">
      
      <SideLeft 
        getAccurateWeather={getAccurateWeather}
        weather={weather}
        setIsNavOpen={setIsNavOpen}
        isCelcius={isCelcius}
        loading={loading}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="w-full h-fit min-h-screen flex flex-col items-center bg-gray-100 dark:bg-[#100E1D] md:w-[70%] md:min-w-[580px] md:max-h-screen transition-colors duration-300">
        <ButonCelFar 
          isCelcius={isCelcius}
          setIsCelcius={setIsCelcius}
        /> 

        <Forecast 
          loading={loading}
          weather={weather}
          isCelcius={isCelcius}
        /> 
        
        <TodayHigh
          isCelcius={isCelcius}
          weather={weather}
        /> 
      </div>

      <SearchCity
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        searchLocationVal={searchLocationVal}
        onChangeSearchLocation={onChangeSearchLocation}
        getCities={getCities}
        cities={cities}
        getCityWeather={getCityWeather}
      /> 
    </div>
  );
}

export default App;