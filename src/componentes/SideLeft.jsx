export default function SideLeft({ 
  getAccurateWeather,
  weather,
  setIsNavOpen,
  isCelcius,
  loading,
  isDarkMode,
  setIsDarkMode
}) {
  return (
    <section className="bg-white dark:bg-[#1E213A] flex flex-col w-screen h-screen overflow-hidden md:w-[30%] md:min-w-[380px] md:m-auto transition-colors duration-300">
      <header className="flex justify-around items-end h-16">
        <input
          className="w-44 h-9 bg-gray-200 dark:bg-[#6E707A] text-gray-800 dark:text-[#E7E7EB] cursor-pointer text-center transition-colors duration-300"
          type="button"
          value="Search for Places"
          onClick={() => setIsNavOpen(true)}
        />

        <div
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-[#ffffff33] rounded-full cursor-pointer transition-colors duration-300"
          onClick={getAccurateWeather}
        >
          <img
            className="invert dark:invert-0"
            src="/location.svg"
            width={25}
            height={25}
            alt="location icon"
          />
        </div>

        {/* BOTÓN DE CAMBIO DE TEMA */}
        <div
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-[#ffffff33] rounded-full cursor-pointer transition-colors duration-300"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-[#E7E7EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-[#E7E7EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </div>
      </header>

      {!loading && weather.current && (
        <div className="flex flex-col items-center w-full h-[90vh]">
          <div className="flex flex-col items-center justify-center w-full h-[45%] relative overflow-hidden after:bg-clouds-bg after:absolute after:w-full after:h-full after:bg-[length:150%_110%] after:bg-no-repeat after:opacity-10 dark:after:opacity-5 after:bg-[bottom_center]">
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
            <h2 className="font-medium text-9xl text-gray-800 dark:text-[#E7E7EB] my-8 transition-colors duration-300">
              {isCelcius ? weather.current.temp_c : weather.current.temp_f}
            </h2>
            <h3 className="mt-6 text-6xl text-gray-500 dark:text-[#A09FB1] font-medium transition-colors duration-300">
              {isCelcius ? "°C" : "°F"}
            </h3>
          </div>

          <h2 className="capitalize pt-6 pb-12 text-3xl text-gray-500 dark:text-[#A09FB1] font-semibold transition-colors duration-300">
            {weather.current.condition}
          </h2>

          <p className="text-sm text-gray-400 dark:text-[#88869D] font-medium mb-6 transition-colors duration-300">
            Today &nbsp;&nbsp; . &nbsp;&nbsp; {weather.current.date}
          </p>

          <pre className="flex items-center gap-2 text-sm text-gray-400 dark:text-[#88869D] h-10 bottom-0 font-semibold mb-2 transition-colors duration-300">
            <img
              className="mb-2 invert dark:invert-0"
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
  )
}