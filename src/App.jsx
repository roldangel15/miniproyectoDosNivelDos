import useWeather from "./hooks/useWeather";
import { useState } from "react";
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
console.log(cities);

  const [searchLocationVal, setSearchLocationVal] = useState('');

    const onChangeSearchLocation = (event) => {

        setSearchLocationVal(event.target.value);
}


  if (loading) return <h1>Cargando tu ubicación...</h1>;



  return (
    <>
      <div className="bg-[#1E213A] w-screen  min-h-screen flex flex-col items-center md:flex-row">
        {/* LADO IZQUIERDO */}

      <SideLeft 
                getAccurateWeather={getAccurateWeather}
                weather={weather}
                setIsNavOpen={setIsNavOpen}
                isCelcius={isCelcius}
                loading = {loading}
        />
        {/* FIN LADO IZQUIERDO */}


        {/* LADO DERECHO */}
        <div className="w-full h-fit min-h-screen flex flex-col items-center bg-[#100E1D] md:w-[70%] md:min-w-[580px] md:max-h-screen">
          {/* BOTONES FAREN A CELSIUS */}
           <ButonCelFar 
              isCelcius={isCelcius}
              setIsCelcius={setIsCelcius}
              /> 

          {/* FIN BOTONES FAREN A CELSIUS */}
        <Forecast 
          loading ={loading}
          weather = {weather}
          isCelcius = {isCelcius}
        
        /> 
          
         <TodayHigh
           isCelcius ={isCelcius}
           weather ={weather}

         /> 

          
        </div>
        {/* FIN LADO DERECHO */}
      </div>

      {/* MENÚ LATERAL (NAV) */}
      
      <SearchCity
          isNavOpen={isNavOpen}
          setIsNavOpen = {setIsNavOpen}
          searchLocationVal = {searchLocationVal}
          onChangeSearchLocation = {onChangeSearchLocation}
          getCities = {getCities}
          cities = {cities}
          getCityWeather= {getCityWeather}
        
      /> 

      
    </>
  );
}

export default App;
