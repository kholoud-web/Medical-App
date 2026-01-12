import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination() {
    return (
        <div className="flex justify-between items-center pt-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-black transition">
                <IoIosArrowBack />
                Previous
            </button>

            <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
                    1
                </button>
                <button className="px-4 py-2 rounded-md border text-gray-600 text-sm">
                    2
                </button>
                <button className="px-4 py-2 rounded-md border text-gray-600 text-sm">
                    3
                </button>
            </div>

            <button className="flex items-center gap-2 text-gray-500 hover:text-black transition">
                Next
                <IoIosArrowForward />
            </button>
        </div>
    );
}

export default Pagination;
