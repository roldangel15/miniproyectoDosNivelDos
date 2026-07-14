export default function TodayHigh({ isCelcius, weather }) {
  // Clase reutilizable para las 4 tarjetas para no repetir código
  const cardClass = `
    w-full max-w-[328px] h-48 
    bg-white dark:bg-[#1E213A] 
    border border-gray-200 dark:border-gray-700 
    rounded-3xl 
    shadow-lg hover:shadow-2xl 
    hover:-translate-y-2 
    transition-all duration-300 ease-in-out 
    flex flex-col items-center justify-center
  `;

  return (
    <div className="w-full max-w-sm px-5 mt-12 md:w-full md:max-w-none md:m-auto md:flex md:flex-col md:items-center md:justify-center">
      <h2 className="h-7 text-gray-800 dark:text-[#E7E7EB] text-2xl font-bold my-5 md:w-full md:max-w-2xl md:text-left transition-colors duration-300">
        Today's Highlights
      </h2>

      <div className="w-full flex flex-col items-center md:grid md:grid-cols-2 gap-5 md:gap-6 md:max-w-2xl">
        
        {/* Wind status */}
        <div className={cardClass}>
          <h2 className="text-medium text-base text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Wind status
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-gray-800 dark:text-[#E7E7EB] text-6xl font-bold">
              {isCelcius ? weather.current.windSpeed_ms : weather.current.windSpeed_mph}
            </h3>
            <h4 className="text-gray-800 dark:text-[#E7E7EB] text-4xl mb-2 ml-1">
              {isCelcius ? "ms" : "mph"}
            </h4>
          </div>
          <div className="flex items-center text-gray-600 dark:text-[#E7E7EB] text-sm">
            <span className="flex justify-center items-center w-8 h-8 m-3 rounded-full bg-gray-200 dark:bg-[#ffffff4d]">
              <img
                className="invert dark:invert-0"
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

        {/* Humidity */}
        <div className={cardClass}>
          <h2 className="text-medium text-base text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Humidity
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-gray-800 dark:text-[#E7E7EB] text-6xl font-bold">
              {weather.current.humidity}
            </h3>
            <h4 className="text-gray-800 dark:text-[#E7E7EB] text-4xl mb-2 ml-1 text-right">
              %
            </h4>
          </div>
          <div className="w-[70%] font-bold text-xs flex justify-between text-gray-400 dark:text-[#A09FB1]">
            <p>0</p>
            <p>50</p>
            <p>100</p>
          </div>
          <div className="flex items-center w-[70%] h-2 bg-gray-200 dark:bg-[#E7E7EB] rounded-3xl mt-2">
            <div
              className="h-2 bg-[#FFEC65] rounded-3xl m-0 p-0 transition-all duration-500"
              style={{ width: `${weather.current.humidity}%` }}
            ></div>
          </div>
          <div className="w-[70%] text-right font-bold text-gray-400 dark:text-[#A09FB1] mt-1">
            %
          </div>
        </div>

        {/* Visibility */}
        <div className={cardClass}>
          <h2 className="text-medium text-base text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Visibility
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-gray-800 dark:text-[#E7E7EB] text-6xl font-bold">
              {isCelcius ? weather.current.visivility_k : weather.current.visivility_m}
            </h3>
            <h4 className="text-gray-800 dark:text-[#E7E7EB] text-4xl mb-2 ml-1">
              {isCelcius ? "km" : "miles"}
            </h4>
          </div>
        </div>

        {/* Air Pressure */}
        <div className={cardClass}>
          <h2 className="text-medium text-base text-center text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Air Pressure
          </h2>
          <div className="flex items-end h-20 mb-4">
            <h3 className="text-gray-800 dark:text-[#E7E7EB] text-6xl font-bold">
              {weather.current.pressure}
            </h3>
            <h4 className="text-gray-800 dark:text-[#E7E7EB] text-4xl mb-2 ml-1">
              mb
            </h4>
          </div>
        </div>

      </div>

      <footer className="py-5 w-full flex flex-row justify-center items-center text-gray-500 dark:text-[#A09FB1] transition-colors duration-300">
        <h4 className="text-sm font-medium text-center">Created by</h4>
        <h2 className="font-bold text-sm text-center mx-1">Roldangel</h2>
        <h3 className="font-semibold text-sm text-center">
          - devChallenges.io
        </h3>
      </footer>
    </div>
  )
}