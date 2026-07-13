import useWeather from "./hooks/useWeather";
import { useState } from "react";
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
        <section className="bg-[#1E213A] flex flex-col w-screen h-screen overflow-hidden md:w-[30%] md:min-w-[380px] md:m-auto">
          <header className="flex justify-around items-end h-16">
            <input
              className="w-44 h-9 bg-[#6E707A] text-[#E7E7EB] cursor-pointer text-center"
              type="button"
              value="Search for Places"
              onClick={() => {
                setIsNavOpen(true);
              }}
            />

            <div
              className="flex items-center justify-center w-10 h-10 bg-[#ffffff33] rounded-full cursor-pointer"
              onClick={getAccurateWeather}
            >
              <img
                src="/location.svg"
                width={25}
                height={25}
                alt="location icon"
              />
            </div>
          </header>

          {!loading && weather.current && (
           <div className="flex flex-col items-center w-full h-[90vh]">
            <div className="flex flex-col items-center justify-center w-full h-[45%] relative overflow-hidden after:bg-clouds-bg after:absolute after:w-full after:h-full after:bg-[length:150%_110%] after:bg-no-repeat after:opacity-5 after:bg-[bottom_center]">
              <div className="flex items-center justify-center w-2/5 absolute">
                <img
                  className="w-full object-contain"
                  src={`/weather/${weather.current.icon}.png`}
                  width={300}
                  height={300}
                  alt={"condition"}
                />
              </div>
            </div>

            <div className="flex items-center">
              <h2 className="font-medium text-9xl text-[#E7E7EB] my-8">
                {isCelcius ? weather.current.temp_c : weather.current.temp_f}
              </h2>
              <h3 className="mt-6 text-6xl text-[#A09FB1] font-medium">
                {isCelcius ? "°C" : "°f"}
              </h3>
            </div>

            <h2 className="capitalize pt-6 pb-12 text-3xl text-[#A09FB1] font-semibold">
              {weather.current.condition}
            </h2>

            <p className="text-sm text-[#88869D] font-medium mb-6">
              Today &nbsp;&nbsp; . &nbsp;&nbsp; {weather.current.date}
            </p>

            <pre className="flex items-center gap-2 text-sm text-[#88869D] h-10 bottom-0 font-semibold mb-2">
              <img
                className="mb-2"
                src="/location_on.svg"
                width={20}
                height={20}
                alt="location on icon"
              />
              {weather.current.location}
            </pre>
          </div>
          )}

        
        </section>
        {/* FIN LADO IZQUIERDO */}

        {/* LADO DERECHO */}
        <div className="w-full h-fit min-h-screen flex flex-col items-center bg-[#100E1D] md:w-[70%] md:min-w-[580px] md:max-h-screen">
          {/* BOTONES FAREN A CELSIUS */}
          <div className="flex justify-end items-end h-20 w-64 gap-5 md:max-w-2xl md:w-full">
            <button
              className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full ${isCelcius ? "text-[#110E3C] bg-[#E7E7EB]" : "text-[#E7E7EB] bg-[#585676]"}`}
              onClick={() => {
                setIsCelcius(true);
              }}
            >
              °C
            </button>

            <button
              className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full ${!isCelcius ? "text-[#110E3C] bg-[#E7E7EB]" : "text-[#E7E7EB] bg-[#585676]"}`}
              onClick={() => {
                setIsCelcius(false);
              }}
            >
              °F
            </button>
          </div>
          {/* FIN BOTONES FAREN A CELSIUS */}

          <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit">
            {!loading &&
              weather.forecast &&
              weather.forecast.map((day) => (
                <li
                  key={day.date}
                  className="w-[7.5rem] h-40 bg-[#1E213A] flex flex-col items-center justify-center text-[#E7E7EB] text-base font-medium"
                >
                  <h3 className="mb-2"> {day.date} </h3>
                  <span className="flex items-center justify-center w-14 h-16">
                    <img
                      className="w-full h-full object-contain"
                      src={`/weather/${day.icon || weather.icon}.png`}
                      width={56}
                      height={64}
                      alt="condition"
                    />
                  </span>
                  <div className="flex gap-2 mt-2">
                    <p>{isCelcius ? `${day.max_c}` : `${day.max_f}`}</p>
                    <p className="text-[#A09FB1]">
                      {isCelcius ? `${day.min_c}` : `${day.min_f}`}
                    </p>
                  </div>
                </li>
              ))}
          </ul>

          <div className="w-full max-w-sm px-5 mt-12 md:w-full md:max-w-none md:m-auto md:flex md:flex-col md:items-center md:justify-center">
            <h2 className="h-7 text-[#E7E7EB] text-2xl font-bold my-5 md:w-full md:max-w-2xl md:text-left">
              Today`s Hightlights
            </h2>

            <div className="w-full flex flex-col items-center md:grid md:grid-cols-2 gap-5 md:gap-6 md:max-w-2xl">
              <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                <h2 className="text-medium text-base text-center text-[#E7E7EB]">
                  Wind status
                </h2>

                <div className="flex items-end h-20 mb-4">
                  <h3 className="text-[#E7E7EB] text-6xl font-bold">
                    {isCelcius ? weather.current.windSpeed_ms : weather.current.windSpeed_mph}
                  </h3>
                  <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">
                    {isCelcius ? "ms" : "mph"}
                  </h4>
                </div>

                <div className="flex items-center text-[#E7E7EB] text-sm">
                  <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-[#ffffff4d]">
                    <img
                      style={{ rotate: `${weather.current.windDirection}deg` }}
                      src={"/navigation.svg"}
                      width={18}
                      height={18}
                      alt="Navigation Icon"
                    />
                  </span>
                  {weather.current.windDirString}
                </div>
              </div>

              <div className="w-full max-w-[328px] h-48 bg-[#1E213A] flex flex-col items-center justify-center">
                <h2 className="text-medium text-base text-center text-[#E7E7EB]">
                  Humidity
                </h2>

                <div className="flex items-end h-20 mb-4">
                  <h3 className="text-[#E7E7EB] text-6xl font-bold">
                    {weather.current.humidity}
                  </h3>
                  <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1 text-right">
                    %
                  </h4>
                </div>

                <div className="w-[70%] font-bold text-xs flex justify-between text-[#A09FB1]">
                  <p>0</p>
                  <p>50</p>
                  <p>100</p>
                </div>

                <div className="flex items-center w-[70%] h-2 bg-[#E7E7EB] rounded-3xl">
                  <div
                    className="h-2 bg-[#FFEC65] rounded-3xl m-0 p-0"
                    style={{ width: `${weather.current.humidity}%` }}
                  ></div>
                </div>

                <div className="w-[70%] text-right font-bold text-[#A09FB1]">
                  %
                </div>
              </div>

              <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] py-4">
                <h2 className="text-medium text-base text-center text-[#E7E7EB]">
                  Visibility
                </h2>

                <div className="flex items-end h-20 mb-4">
                  <h3 className="text-[#E7E7EB] text-6xl font-bold">
                    {isCelcius ? weather.current.visivility_k : weather.current.visivility_m}
                  </h3>
                  <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">
                    {isCelcius ? "km" : "miles"}
                  </h4>
                </div>
              </div>

              <div className="w-full max-w-[328px] flex flex-col items-center justify-center bg-[#1E213A] p-4">
                <h2 className="text-medium text-base text-center text-[#E7E7EB]">
                  Air Pressure
                </h2>

                <div className="flex items-end h-20 mb-4">
                  <h3 className="text-[#E7E7EB] text-6xl font-bold">
                    {weather.current.pressure}
                  </h3>
                  <h4 className="text-[#E7E7EB] text-4xl mb-2 ml-1">mb</h4>
                </div>
              </div>
            </div>

            <footer className="py-5 w-full flex flex-row justify-center items-center text-[#A09FB1]">
              <h4 className="text-sm font-medium text-center">Created by</h4>
              <h2 className="font-bold text-sm text-center mx-1">Roldangel</h2>
              <h3 className="font-semibold text-sm text-center">
                - devChallenges.io
              </h3>
            </footer>
          </div>
        </div>
        {/* FIN LADO DERECHO */}
      </div>

      {/* MENÚ LATERAL (NAV) */}
      {isNavOpen && (
        <section className="w-screen h-screen max-h-screen bg-[#1E213A] absolute top-0 left-0 md:w-[30vw] md:min-w-[380px]">
          <nav className="w-full h-24 flex items-end justify-around">
            <span
              className="absolute right-10 top-6 cursor-pointer"
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <img
                className="hover:w-7 hover:h-7"
                src="/close.svg"
                width={25}
                height={25}
                alt="close icon"
              />
            </span>

            <div className="flex items-center w-[55%] max-w-[268px] h-9 bg-transparent border border-[#E7E7EB] font-medium text-base text-[#616475]">
              <img
                className="mx-2"
                src="/search.svg"
                width={24}
                height={24}
                alt="Search Icon"
              />
              <input
                className="bg-transparent outline-none w-[233px] h-8 pr-1"
                type="text"
                placeholder="search location"
                value={searchLocationVal}
                onChange={onChangeSearchLocation}
              />
            </div>

            <button
              className="w-20 h-9 bg-[#3C47E9] px-1 font-semibold text-base text-[#E7E7EB] hover:text-[#def341]"
              onClick={() => getCities(searchLocationVal.toLocaleLowerCase())}
            >
              Search
            </button>
          </nav>

          <ul className="flex flex-col items-center w-full h-fit mt-[80px] pb-5">


              {cities && cities.map((city, i) => (
                <li
                  key={i} // <- Aquí añades la clave única
                  className="flex justify-between w-[70%] max-w-[367px] h-14 pl-2 text-base font-medium cursor-pointer text-[#E7E7EB] hover:border border-[#616475] mt-6 hover:after:bg-arrow-bg hover:after:bg-contain hover:after:bg-no-repeat hover:after:p-2 hover:after:mt-5 hover:after:mr-5"
                  onClick={() => getCityWeather(city.lat, city.lon, city.name,city.state)}
                >
                  <p className="flex items-center text-lg ml-2">
                    {city.name},&nbsp;&nbsp;{city.state}&nbsp;&nbsp;{city.country}
                  </p>
                </li>
              ))}

            


           
          </ul>

        </section>
      )}
    </>
  );
}

export default App;
