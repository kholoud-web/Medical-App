import apiClient from "./apiClient";

export const createDiagnosis = async ({
  doctorId,
  symptoms,
  description,
  files = [],
}) => {
  const formData = new FormData();

  if (doctorId) {
    formData.append("doctorId", String(doctorId));
  }
  if (symptoms) {
    formData.append("symptoms", symptoms);
  }
  if (description) {
    formData.append("description", description);
  }
  if (Array.isArray(files)) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const { data } = await apiClient.post(
    "/DiagnosisModule/create-daignosis",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};
