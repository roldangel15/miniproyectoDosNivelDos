export default function Forecast({ loading, weather, isCelcius }) {
  return (
    <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit"> 
      {!loading && weather.forecast && weather.forecast.map((day) => (
        <li
          key={day.date}
          className="w-[7.5rem] h-40 bg-white dark:bg-[#1E213A] flex flex-col items-center justify-center text-gray-800 dark:text-[#E7E7EB] text-base font-medium transition-colors duration-300"
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
            <p className="text-gray-500 dark:text-[#A09FB1] transition-colors duration-300">
              {isCelcius ? `${day.min_c}` : `${day.min_f}`}
            </p>
          </div>
        </li>
      ))}
    </ul>       
  )
}