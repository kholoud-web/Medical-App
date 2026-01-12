import IconBox from "./Icons/imgbox.svg";

export default function Filters() {
  return (
    <div className="border border-blue-300 rounded-xl p-4 h-fit shadow-xl hover:shadow-md">
      <h3 className="font-semibold text-gray-400 mb-4">Filters</h3>

     
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">
          Minimum Rating
        </label>
        <select className="w-full border border-blue-500 text-blue-500 rounded-lg px-4 py-1 pl-2">
          <option>All Ratings</option>
          <option>4+</option>
          <option>4.5+</option>
        </select>
      </div>

    
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Gender</p>

        <div className="flex flex-col gap-2 text-blue-500 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <img src={IconBox} alt="checkbox" className="w-4 h-4" />
            Male
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <img src={IconBox} alt="checkbox" className="w-4 h-4" />
            Female
          </label>
        </div>
      </div>

<div className="border-t border-blue-200 my-3"></div>

    
      <label className="flex items-center gap-2 text-sm  text-blue-500 cursor-pointer">
        <img src={IconBox} alt="checkbox" className="w-4 h-4" />
        Available today
      </label>
    </div>
  );
}
