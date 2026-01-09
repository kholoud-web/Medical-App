import StatsChart from "@/components/Doctor/Dashborad/StatsChart";

const normalizeMetrics = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) {
    return payload
      .map((item, index) => {
        if (item == null) return null;
        if (typeof item === "number" || typeof item === "string") {
          const value = Number(item);
          return {
            label: `Item ${index + 1}`,
            value: Number.isNaN(value) ? 0 : value,
          };
        }
        if (typeof item === "object") {
          const label =
            item.label ||
            item.name ||
            item.symptom ||
            item.symptomName ||
            item.day ||
            item.date ||
            `Item ${index + 1}`;
          const rawValue =
            item.value ||
            item.count ||
            item.total ||
            item.number ||
            item.amount ||
            0;
          const value = Number(rawValue);
          return {
            label: String(label),
            value: Number.isNaN(value) ? 0 : value,
          };
        }
        return null;
      })
      .filter(Boolean);
  }
  if (typeof payload === "object") {
    return Object.entries(payload).map(([key, value]) => ({
      label: String(key),
      value: Number(value) || 0,
    }));
  }
  return [];
};

function ChartsSection({
  symptomCounts = [],
  topSymptoms = [],
  loading = false,
  error = "",
}) {
  const countMetrics = normalizeMetrics(symptomCounts);
  const topMetrics = normalizeMetrics(topSymptoms);
  const barItems = countMetrics.slice(0, 6);
  const topItems = topMetrics.slice(0, 6);
  const maxValue = Math.max(
    ...barItems.map((item) => item.value),
    0
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-2">Treatment Progress Overview</h3>
        <p className="text-sm text-gray-500 mb-4">Last 6 Months</p>
        <div className="h-64">
          <StatsChart />
        </div>
      </div>

      <div className="bg-treat-bg-Gray p-4 rounded-xl border border-primary-blue/50">
        <h3 className="font-semibold mb-2">Symptom Severity Trends</h3>
        <p className="text-sm text-gray-500 mb-4">
          {error ? "Failed to load chart data" : loading ? "Loading..." : "Current Week"}
        </p>
        <div className="min-h-[12rem] space-y-3">
          {loading ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : barItems.length > 0 ? (
            barItems.map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-600 truncate">
                  {item.label}
                </div>
                <div className="flex-1 h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary-blue"
                    style={{
                      width: `${maxValue ? (item.value / maxValue) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="w-10 text-right text-sm font-semibold text-gray-700">
                  {item.value}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-400">No data yet</div>
          )}
        </div>
        {!loading && !error && topItems.length > 0 && (
          <>
            <div className="mt-4 text-sm font-semibold text-gray-700">
              Top symptoms
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {topItems.map((item, index) => (
                <span
                  key={`${item.label}-${index}`}
                  className="rounded-full bg-primary-blue/10 px-3 py-1 text-xs font-semibold text-primary-blue"
                >
                  {item.label}
                  {item.value > 0 ? ` (${item.value})` : ""}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChartsSection;
