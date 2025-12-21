import React, { useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiLock,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";

const profileAvatar =
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80";

function Toggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-5 w-9 rounded-full border transition ${
        enabled
          ? "border-primary-blue bg-primary-blue"
          : "border-neutral-300 bg-neutral-200"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow transition ${
          enabled ? "right-[2px]" : "left-[2px]"
        }`}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 text-lg font-semibold text-neutral-800">
      <Icon className="text-primary-blue" size={18} />
      <span>{title}</span>
    </div>
  );
}

function SettingRow({ title, description, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-xl bg-white px-3 py-2">
      <div>
        <p className="text-sm font-semibold text-neutral-800">{title}</p>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Modal({
  open,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel,
  cancelLabel = "Cancel",
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-primary-blue/30 bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary-blue/10">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <button
            type="button"
            className="text-neutral-500 hover:text-neutral-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX size={18} />
          </button>
        </div>
        <div className="space-y-3 px-5 py-4">{children}</div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-primary-blue/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            {cancelLabel}
          </button>
          <PrimButton
            className="px-4 py-2 text-sm shadow-sm hover:shadow-md"
            onClick={onSubmit}
          >
            {submitLabel}
          </PrimButton>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const { t, language, setLanguage } = useLocale();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-5xl px-4 lg:px-6 py-10 space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-neutral-900">
            {t("settings.title")}
          </h1>
          <p className="text-sm text-neutral-500">{t("settings.subtitle")}</p>
        </div>

        <Card classname="w-full p-5 lg:p-6 space-y-4 border border-primary-blue/30 bg-[#f8f9fc]">
          <SectionHeader icon={FiUser} title={t("settings.profile.title")} />
          <div className="flex items-center gap-3">
            <img
              src={profileAvatar}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border border-primary-blue/20"
            />
            <div className="text-sm text-neutral-700">
              <p className="font-semibold">{t("settings.profile.title")}</p>
              <p className="text-xs text-neutral-500">
                {t("settings.profile.description")}
              </p>
            </div>
            <div className="ml-auto">
              <PrimButton
                className="px-4 py-2 text-sm shadow-sm hover:shadow-md"
                onClick={() => setShowProfileModal(true)}
              >
                {t("settings.profile.button")}
              </PrimButton>
            </div>
          </div>
        </Card>

        <Card classname="w-full p-5 lg:p-6 space-y-4 border border-primary-blue/30 bg-[#f8f9fc]">
          <SectionHeader icon={FiShield} title={t("settings.security.title")} />
          <SettingRow
            title={t("settings.security.passwordTitle")}
            description={t("settings.security.passwordDesc")}
            action={
              <PrimButton
                className="px-4 py-2 text-sm shadow-sm hover:shadow-md"
                onClick={() => setShowPasswordModal(true)}
              >
                {t("settings.security.passwordButton")}
              </PrimButton>
            }
          />
          <SettingRow
            title={t("settings.security.2faTitle")}
            description={t("settings.security.2faDesc")}
            action={
              <Toggle
                label={t("settings.security.2faTitle")}
                enabled={smsNotif}
                onChange={setSmsNotif}
              />
            }
          />
        </Card>

        <Card classname="w-full p-5 lg:p-6 space-y-4 border border-primary-blue/30 bg-[#f8f9fc]">
          <SectionHeader
            icon={FiBell}
            title={t("settings.notifications.title")}
          />
          <SettingRow
            title={t("settings.notifications.emailTitle")}
            description={t("settings.notifications.emailDesc")}
            action={
              <Toggle
                label={t("settings.notifications.emailTitle")}
                enabled={emailNotif}
                onChange={setEmailNotif}
              />
            }
          />
          <SettingRow
            title={t("settings.notifications.smsTitle")}
            description={t("settings.notifications.smsDesc")}
            action={
              <Toggle
                label={t("settings.notifications.smsTitle")}
                enabled={smsNotif}
                onChange={setSmsNotif}
              />
            }
          />
        </Card>

        <Card classname="w-full p-5 lg:p-6 space-y-4 border border-primary-blue/30 bg-[#f8f9fc]">
          <SectionHeader icon={FiLock} title={t("settings.general.title")} />
          <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
            <div>
              <p className="text-sm font-semibold text-neutral-800">
                {t("settings.general.language")}
              </p>
              <p className="text-xs text-neutral-500">
                {t("settings.general.languageDesc")}
              </p>
            </div>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none rounded-lg border border-primary-blue/30 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none pr-7"
              >
                <option value="en">{t("settings.general.english")}</option>
                <option value="ar">{t("settings.general.arabic")}</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500">
                <FiChevronDown size={14} />
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        open={showProfileModal}
        title={t("modal.profile.title")}
        onClose={() => setShowProfileModal(false)}
        onSubmit={() => setShowProfileModal(false)}
        submitLabel={t("modal.profile.save")}
        cancelLabel={t("modal.cancel")}
      >
        <input
          type="text"
          placeholder={t("modal.profile.name")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
          defaultValue="Ahmed Sameh"
        />
        <input
          type="email"
          placeholder={t("modal.profile.email")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
          defaultValue="Ahmed.Sameh@gmail.com"
        />
        <input
          type="tel"
          placeholder={t("modal.profile.phone")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
          defaultValue="01067771283"
        />
      </Modal>

      <Modal
        open={showPasswordModal}
        title={t("modal.password.title")}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={() => setShowPasswordModal(false)}
        submitLabel={t("modal.password.save")}
        cancelLabel={t("modal.cancel")}
      >
        <input
          type="password"
          placeholder={t("modal.password.current")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        />
        <input
          type="password"
          placeholder={t("modal.password.new")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        />
        <input
          type="password"
          placeholder={t("modal.password.confirm")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        />
      </Modal>
    </div>
  );
}
