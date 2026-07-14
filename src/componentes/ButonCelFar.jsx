export default function ButonCelFar({ isCelcius, setIsCelcius }) {
  return (
    <div className="flex justify-end items-end h-20 w-64 gap-5 md:max-w-2xl md:w-full">
      <button
        className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full transition-colors duration-300 ${
          isCelcius 
            ? "text-white dark:text-[#110E3C] bg-gray-800 dark:bg-[#E7E7EB]" 
            : "text-gray-600 dark:text-[#E7E7EB] bg-gray-300 dark:bg-[#585676]"
        }`}
        onClick={() => setIsCelcius(true)}
      >
        °C
      </button>

      <button
        className={`w-10 h-10 pr-1 pt-1 text-center text-xl font-bold rounded-full transition-colors duration-300 ${
          !isCelcius 
            ? "text-white dark:text-[#110E3C] bg-gray-800 dark:bg-[#E7E7EB]" 
            : "text-gray-600 dark:text-[#E7E7EB] bg-gray-300 dark:bg-[#585676]"
        }`}
        onClick={() => setIsCelcius(false)}
      >
        °F
      </button>
    </div>
  )
}