import React, { useState } from "react";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";

const faqItems = [
  { id: 1, questionKey: "help.page.faq1.q", answerKey: "help.page.faq1.a" },
  { id: 2, questionKey: "help.page.faq2.q", answerKey: "help.page.faq2.a" },
  { id: 3, questionKey: "help.page.faq3.q", answerKey: "help.page.faq3.a" },
];

export default function PatientHelp() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);

  const queryValue = query.trim().toLowerCase();
  const filteredFaqItems = faqItems.filter((item) =>
    t(item.questionKey).toLowerCase().includes(queryValue)
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-4xl px-4 lg:px-6 py-10">
        <div className="bg-white border border-primary-blue/20 rounded-[20px] shadow-sm p-6 lg:p-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <FiHelpCircle className="text-primary-blue" />
            <span>{t("help.page.title")}</span>
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("help.page.searchPlaceholder")}
              className="w-full rounded-lg border border-primary-blue/30 bg-white pl-9 pr-3 py-2 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 outline-none"
            />
          </div>

          <div className="space-y-2">
            {filteredFaqItems.length ? (
              filteredFaqItems.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-neutral-300 px-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between text-left text-sm text-neutral-700"
                    >
                      <span>{t(item.questionKey)}</span>
                      <span className="text-xs font-semibold text-primary-blue">
                        {isOpen ? t("help.page.hide") : t("help.page.show")}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs text-neutral-500">
                        {t(item.answerKey)}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-neutral-400">
                {t("help.page.noResults")}
              </p>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 space-y-2">
            <p className="text-sm font-semibold text-neutral-700">
              {t("help.page.contactTitle")}
            </p>
            <p className="text-xs text-neutral-500">
              {t("help.page.contactSubtitle")}
            </p>
            <PrimButton className="px-4 py-2 text-xs rounded-lg shadow-sm hover:shadow-md">
              {t("help.page.contactButton")}
            </PrimButton>
          </div>
        </div>
      </div>
    </div>
  );
}
