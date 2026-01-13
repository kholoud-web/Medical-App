import { useEffect, useState } from "react";
import { API } from "@/Api/Api";
import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartsSection";
import InquiriesTable from "./components/Inquiries";

const getAuthToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("authToken") ||
  sessionStorage.getItem("token") ||
  sessionStorage.getItem("accessToken") ||
  sessionStorage.getItem("authToken");

const unwrapPayload = (payload) => {
  if (payload && typeof payload === "object") {
    if ("data" in payload) return payload.data;
    if ("result" in payload) return payload.result;
    if ("value" in payload) return payload.value;
  }
  return payload;
};

const parsePendingCount = (payload) => {
  const value = unwrapPayload(payload);
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (value && typeof value === "object") {
    const candidate = value.count ?? value.pending ?? value.total ?? value.value;
    const parsed = Number(candidate);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const getDoctorName = (item) => {
  const direct =
    item?.doctorName ||
    item?.doctor ||
    item?.doctorFullName ||
    item?.physicianName ||
    item?.doctor?.name ||
    item?.doctor?.fullName;
  if (typeof direct === "string") return direct;
  if (direct && typeof direct === "object") {
    return direct.name || direct.fullName || "-";
  }
  return "-";
};

const formatDateTime = (dateValue, timeValue) => {
  const timeText = timeValue ? String(timeValue) : "";
  if (!dateValue) {
    return { date: "-", time: timeText || "-" };
  }
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return { date: String(dateValue), time: timeText || "-" };
  }
  return {
    date: parsed.toLocaleDateString("en-CA"),
    time:
      timeText ||
      parsed.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
  };
};

const normalizeInquiries = (payload) => {
  const raw = unwrapPayload(payload);
  const list = Array.isArray(raw)
    ? raw
    : raw?.items || raw?.results || raw?.data || [];
  if (!Array.isArray(list)) return [];
  return list.map((item) => {
    if (!item || typeof item !== "object") {
      return {
        doctor: "-",
        subject: "-",
        date: "-",
        time: "-",
        status: "pending",
      };
    }
    const doctor = getDoctorName(item);
    const subject =
      item.subject ||
      item.title ||
      item.topic ||
      item.reason ||
      item.complaint ||
      "-";
    const status =
      item.status ||
      item.state ||
      item.requestStatus ||
      item.inquiryStatus ||
      "pending";
    const dateValue =
      item.date ||
      item.createdAt ||
      item.createdDate ||
      item.createdOn ||
      item.dateTime ||
      item.timestamp;
    const timeValue = item.time || item.timeSlot || item.slotTime;
    const { date, time } = formatDateTime(dateValue, timeValue);

    return {
      doctor: String(doctor),
      subject: String(subject),
      date,
      time,
      status: String(status),
    };
  });
};

export default function PatientDashboard() {
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [symptomCounts, setSymptomCounts] = useState([]);
  const [topSymptoms, setTopSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchJson = async (url) => {
      const response = await fetch(url, {
        headers,
        signal: controller.signal,
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || "Request failed");
      }
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    };

    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const [
          recentPayload,
          pendingPayload,
          symptomPayload,
          topPayload,
        ] = await Promise.all([
          fetchJson(API.GetRecentInquiries),
          fetchJson(API.GetPendingInquiriesCount),
          fetchJson(API.GetSymptomCountThisWeek),
          fetchJson(API.GetTopSymptomsThisWeek),
        ]);

        if (controller.signal.aborted) return;
        setRecentInquiries(normalizeInquiries(recentPayload));
        setPendingCount(parsePendingCount(pendingPayload));
        setSymptomCounts(unwrapPayload(symptomPayload) || []);
        setTopSymptoms(unwrapPayload(topPayload) || []);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError("Failed to load dashboard data.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-6">
      <SummaryCards pendingCount={pendingCount} loading={loading} />
      <ChartsSection
        symptomCounts={symptomCounts}
        topSymptoms={topSymptoms}
        loading={loading}
        error={error}
      />
      <InquiriesTable
        items={recentInquiries}
        loading={loading}
        error={error}
      />
    </div>
  );
}
