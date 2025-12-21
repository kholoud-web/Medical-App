import React from "react";
import dayjs from "dayjs";
import { useLocale } from "@/context/LocaleContext";

function Header() {
  const { t } = useLocale();
  const date = dayjs().format("dddd, MMMM D, YYYY");
  return (
    <>
      <div className="w-screen flex gap-1 px-7 bg-white drop-shadow-lg z-[10000]">
        <div className="flex gap-20">
          <div>
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold text-neutral-700">
              {t("header.greeting")}
            </h1>
            <p className="text-lg font-normal text-neutral-600">{date}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
