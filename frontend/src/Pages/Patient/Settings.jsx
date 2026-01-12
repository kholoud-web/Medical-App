import React, { useState, useEffect } from "react";
import {
  FiBell,
  FiChevronDown,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import Card from "@/components/Common/Card";
import PrimButton from "@/components/Common/PrimButton";
import { useLocale } from "@/context/LocaleContext";
import {
  getProfile,
  updateProfile,
  getUserSettings,
  updateUserSettings,
  changePassword,
} from "../../Api/settingsApi";




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
    <div className="flex items-center gap-3 text-xl font-semibold text-neutral-800">
      <Icon className="text-primary-blue" size={18} />
      <span>{title}</span>
    </div>
  );
}

function SettingRow({ title, description, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-white px-4 py-3">
      <div>
        <p className="text-base font-semibold text-neutral-800">{title}</p>
        <p className="text-sm text-neutral-500">{description}</p>
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

  const [passwordError, setPasswordError] = useState("");
const [passwordSuccess, setPasswordSuccess] = useState("");

   const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });


  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData((prev) => ({
    ...prev,
    [name]: value,
  }));
};



  useEffect(() => {
    const fetchData = async () => {
      const profileRes = await getProfile();
      setProfileData(profileRes.data);

      const settingsRes = await getUserSettings();
      setEmailNotif(settingsRes.data.emailNotifications);
      setSmsNotif(settingsRes.data.smsNotifications);
      setLanguage(settingsRes.data.language);
    };

    fetchData();
  }, []);


  useEffect(() => {
  if (emailNotif === null || smsNotif === null) return;

  updateUserSettings({
    receiveEmailNotifications: emailNotif,
    twoFactorEnabled: smsNotif,
  });
}, [emailNotif, smsNotif]);




    const handleSaveProfile = async () => {
    await updateProfile(profileData);
    setShowProfileModal(false);
  };



const handleSubmitPassword = async () => {
  setPasswordError("");
  setPasswordSuccess("");

  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    setPasswordError("كلمة المرور الجديدة غير متطابقة");
    return;
  }

  try {
    await changePassword({
       CurrentPassword: passwordData.currentPassword,
      NewPassword: passwordData.newPassword,
      ConfirmNewPassword: passwordData.confirmNewPassword,
    });

    setPasswordSuccess("تم تغيير كلمة المرور بنجاح");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess("");
    }, 1500);
  } catch (err) {
  console.log(err.response?.data);

  if (err.response?.data?.errors) {
    // أخطاء بتجى من السيرفر
    const firstError = Object.values(err.response.data.errors)[0][0];
    setPasswordError(firstError);
  } else if (err.response?.data?.message) {
    setPasswordError(err.response.data.message);
  } else {
    setPasswordError("حدث خطأ أثناء تغيير كلمة المرور");
  }
}

};


  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-800 flex justify-center">
      <div className="w-full max-w-6xl px-4 lg:px-6 py-10 space-y-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-neutral-900">
            {t("settings.title")}
          </h1>
          <p className="text-sm text-neutral-500">{t("settings.subtitle")}</p>
        </div>

        <Card classname="w-full p-7 lg:p-10 border border-primary-blue/30 bg-[#f8f9fc]">
          <div className="space-y-6">
            <div className="space-y-4 border-b border-primary-blue/15 pb-6">
              <SectionHeader icon={FiUser} title={t("settings.profile.title")} />
              <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={profileAvatar}
                    alt="Profile"
                    className="h-14 w-14 rounded-full object-cover border border-primary-blue/20"
                  />
                  <div className="text-base text-neutral-700">
                    <p className="font-semibold">{t("settings.profile.title")}</p>
                    <p className="text-sm text-neutral-500">
                      {t("settings.profile.description")}
                    </p>
                  </div>
                </div>
                <PrimButton
                  className="px-5 py-2.5 text-base shadow-sm hover:shadow-md"
                  onClick={() => setShowProfileModal(true)}
                >
                  {t("settings.profile.button")}
                </PrimButton>
              </div>
            </div>

            <div className="space-y-4 border-b border-primary-blue/15 pb-6">
              <SectionHeader
                icon={FiShield}
                title={t("settings.security.title")}
              />
              <SettingRow
                title={t("settings.security.passwordTitle")}
                description={t("settings.security.passwordDesc")}
                action={
                  <PrimButton
                    className="px-5 py-2.5 text-base shadow-sm hover:shadow-md"
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
            </div>

            <div className="space-y-4 border-b border-primary-blue/15 pb-6">
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
            </div>

            <div className="space-y-4">
              <SectionHeader
                icon={FiSettings}
                title={t("settings.general.title")}
              />
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                <div>
                  <p className="text-base font-semibold text-neutral-800">
                    {t("settings.general.language")}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {t("settings.general.languageDesc")}
                  </p>
                </div>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="appearance-none rounded-lg border border-primary-blue/30 bg-white px-3 py-2 text-base font-semibold text-neutral-700 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none pr-7"
                  >
                    <option value="en">{t("settings.general.english")}</option>
                    <option value="ar">{t("settings.general.arabic")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500">
                    <FiChevronDown size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        open={showProfileModal}
        title={t("modal.profile.title")}
        onClose={() => setShowProfileModal(false)}
        onSubmit={handleSaveProfile}
        submitLabel={t("modal.profile.save")}
        cancelLabel={t("modal.cancel")}
      >
        <input
          type="text"
          placeholder={t("modal.profile.name")}
           value={profileData.fullName}
    onChange={(e) =>
      setProfileData({ ...profileData, fullName: e.target.value })
    }
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        
        />
        <input
          type="email"
          placeholder={t("modal.profile.email")}
             value={profileData.email}
    onChange={(e) =>
      setProfileData({ ...profileData, email: e.target.value })
    }
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        
        />
        <input
          type="tel"
          placeholder={t("modal.profile.phone")}
            value={profileData.phoneNumber}
    onChange={(e) =>
      setProfileData({ ...profileData, phoneNumber: e.target.value })
    }
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        
        />
      </Modal>

      <Modal
        open={showPasswordModal}
        title={t("modal.password.title")}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handleSubmitPassword}
        submitLabel={t("modal.password.save")}
        cancelLabel={t("modal.cancel")}
      >

{passwordError && (
    <p className="text-sm text-red-500">{passwordError}</p>
  )}
  {passwordSuccess && (
    <p className="text-sm text-green-600">{passwordSuccess}</p>
  )}


        <input
          type="password"
          placeholder={t("modal.password.current")}
         name="currentPassword"
    value={passwordData.currentPassword}
    onChange={handlePasswordChange}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        />
        <input
          type="password"
          placeholder={t("modal.password.new")}
              name="newPassword"
    value={passwordData.newPassword}
    onChange={handlePasswordChange}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        />
        <input
          type="password"
           name="confirmNewPassword"
    value={passwordData.confirmNewPassword}
    onChange={handlePasswordChange}
          placeholder={t("modal.password.confirm")}
          className="w-full h-10 rounded-lg border border-primary-blue/30 px-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/40 outline-none"
        />
      </Modal>
    </div>
  );
}