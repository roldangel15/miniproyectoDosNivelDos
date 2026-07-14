export default function Forecast({ loading, weather, isCelcius }) {
  return (
    <ul className="grid grid-cols-2 w-fit mx-auto gap-5 mt-5 md:max-w-2xl md:flex md:flex-row md:flex-wrap md:gap-4 md:w-fit"> 
      {!loading && weather.forecast && weather.forecast.map((day) => (
        <li
          key={day.date}
          className="
            w-[7.5rem] h-40 
            bg-white dark:bg-[#1E213A] 
            border border-gray-200 dark:border-gray-700 
            rounded-2xl 
            shadow-md hover:shadow-xl 
            hover:-translate-y-2 
            transition-all duration-300 ease-in-out 
            flex flex-col items-center justify-center 
            text-gray-800 dark:text-[#E7E7EB] text-base font-medium
          "
        >
          <h3 className="mb-2 font-semibold"> {day.date} </h3>
          <span className="flex items-center justify-center w-14 h-16">
            <img
              className="w-full h-full object-contain drop-shadow-md"
              src={`/weather/${day.icon || weather.icon}.png`}
              width={56}
              height={64}
              alt="condition"
            />
          </span>
          <div className="flex gap-2 mt-2">
            <p className="font-bold">{isCelcius ? `${day.max_c}` : `${day.max_f}`}</p>
            <p className="text-gray-500 dark:text-[#A09FB1]">
              {isCelcius ? `${day.min_c}` : `${day.min_f}`}
            </p>
          </div>
        </li>
      ))}
    </ul>       
  )
}