export default function SideLeft({ 
  getAccurateWeather,
  weather,
  setIsNavOpen,
  isCelcius,
  loading
}) {
   

  return (
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
  )
}
