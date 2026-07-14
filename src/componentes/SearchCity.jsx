

export default function SearchCity({
    isNavOpen,
    setIsNavOpen,
    searchLocationVal,
    onChangeSearchLocation,
    getCities,
    cities,
    getCityWeather
}) {
  return (
    <div>
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
                  key={i} 
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


    </div>
  )
}
