
export default function ButonCelFar({isCelcius,setIsCelcius}) {
  return (
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
  )
}
