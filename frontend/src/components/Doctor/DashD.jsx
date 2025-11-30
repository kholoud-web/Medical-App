import React, { useMemo, useState } from "react";
import './DashD.css';

const earnings = [
  { title: "Total Earnings", value: "$25,800", growth: "+10.2% vs last month", color: "blue" },
  { title: "Monthly Growth", value: "+23.4%", growth: "+5.2% vs last month", color: "green" },
  { title: "Pending", value: "Withdrawals $3,420", growth: "2 requests vs 1 last month", color: "yellow" },
  { title: "Monthly Growth", value: "+23.4%", growth: "+5.2% vs last month", color: "pink" },
];

const sessionTypes = ["Emergency", "Specialist", "Follow-up", "Consultation"];
const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const baseLineSeries = [2000, 2600, 2400, 3000, 2800, 3600];

const initialAppointments = [
  { id: "TXN-2024-1141", patient: "Mohamed", session: "Emergency", amount: 250, date: "Feb 12, 2024", month: "Feb", status: "Pending", paymentMethod: "Credit Card" },
  { id: "TXN-2024-1142", patient: "Mohamed", session: "Specialist", amount: 250, date: "Mar 18, 2024", month: "Mar", status: "Pending", paymentMethod: "Bank" },
  { id: "TXN-2024-1143", patient: "Mohamed", session: "Follow-up", amount: 250, date: "Apr 05, 2024", month: "Apr", status: "Pending", paymentMethod: "Credit Card" },
  { id: "TXN-2024-1144", patient: "Mohamed", session: "Consultation", amount: 250, date: "May 21, 2024", month: "May", status: "Pending", paymentMethod: "Bank" },
  { id: "TXN-2024-1145", patient: "Mohamed", session: "Consultation", amount: 250, date: "Jun 18, 2024", month: "Jun", status: "Pending", paymentMethod: "Credit Card" },
];

const formatCurrency = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

const DashD = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const barAxisLabels = [6000, 4000, 2000, 0];
  const barData = useMemo(() => {
    return sessionTypes.map((type) => {
      const total = appointments
        .filter((app) => app.session === type && app.status !== "Cancelled")
        .reduce((sum, app) => sum + app.amount, 0);
      return { name: type, value: total };
    });
  }, [appointments]);
  const maxBarValue = Math.max(...barAxisLabels);

  const monthlyEarnings = useMemo(() => {
    return months.map((month, idx) => {
      const completed = appointments.filter((app) => app.month === month && app.status === "Completed").length;
      const cancelled = appointments.filter((app) => app.month === month && app.status === "Cancelled").length;
      return baseLineSeries[idx] + completed * 220 - cancelled * 160;
    });
  }, [appointments]);
  const maxLineValue = Math.max(...monthlyEarnings, 1);
  const linePoints = monthlyEarnings
    .map((value, idx) => {
      const x = idx * 48;
      const normalized = value / maxLineValue;
      const y = 110 - normalized * 90;
      return `${x},${y}`;
    })
    .join(" ");

  const handleStatusChange = (id, nextStatus) => {
    setAppointments((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
    );
  };

  const totalPayments = appointments.length || 1;
  const creditPayments = appointments.filter((app) => app.paymentMethod === "Credit Card").length;
  const creditPercent = Math.round((creditPayments / totalPayments) * 100);
  const bankPercent = 100 - creditPercent;

  return (
    <main className="dashboard-bg">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Finance dashboard</h1>
            <p className="dashboard-desc">Monitor your earnings and financial performance</p>
          </div>
          <button className="dashboard-btn">Request withdrawal</button>
        </div>

        <div className="dashboard-cards">
          {earnings.map((item, i) => (
            <div key={i} className="dashboard-card">
              <span className="dashboard-card-title">{item.title}</span>
              <span className="dashboard-card-value">{item.value}</span>
              <span className={`dashboard-card-growth dashboard-growth-${item.color}`}>{item.growth}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-row">
          <div className="dashboard-bar">
            <div className="dashboard-section-title"><b>Revenue per Session Type</b></div>
            <div className="chart-wrapper">
              <div className="chart-axis">
                {barAxisLabels.map((label) => (
                  <span key={label}>{label.toLocaleString()}</span>
                ))}
              </div>
              <div className="chart-bars">
                {barData.map((d, i) => {
                  const height = maxBarValue ? (Math.min(d.value, maxBarValue) / maxBarValue) * 150 : 0;
                  return (
                    <div key={d.name} className="chart-bar">
                      <div
                        className={`chart-bar-rect chart-bar-rect-${i}`}
                        style={{ height: `${height}px` }}
                      />
                      <span className="chart-bar-label">{d.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="dashboard-line">
            <div className="dashboard-section-title"><b>Monthly Earnings</b></div>
            <div className="chart-wrapper line-chart-wrapper">
              <div className="chart-axis">
                {barAxisLabels.map((label) => (
                  <span key={label}>{label.toLocaleString()}</span>
                ))}
              </div>
              <svg width="290" height="120" viewBox="0 0 290 120">
                <polyline
                  fill="none"
                  stroke="#4099ff"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  points={linePoints}
                />
                {linePoints.split(" ").map((point, idx) => {
                  const [cx, cy] = point.split(",").map(Number);
                  return <circle key={idx} cx={cx} cy={cy} r="4.5" fill="#4099ff" stroke="#fff" strokeWidth="2" />;
                })}
              </svg>
            </div>
            <div className="line-chart-months">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>

          <div className="dashboard-payments">
            <div className="dashboard-section-title"><b>Payment Methods</b></div>
            <div
              className="payment-circle"
              style={{
                background: `conic-gradient(#4099ff ${creditPercent * 3.6}deg, #e8edff ${creditPercent * 3.6}deg 360deg)`
              }}
            >
              <div className="payment-circle-inner">
                <span className="payment-value">{creditPercent}%</span>
                <span className="payment-label">Credit Card</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-table-wrap">
          <div className="dashboard-table-header">
            <div className="dashboard-section-title">Recent Transactions</div>
            <div className="dashboard-status-badges">
              <span className="status-pill filled">Completed</span>
              <span className="status-pill">Pending</span>
              <span className="status-pill">Cancelled</span>
            </div>
          </div>
          <div className="dashboard-table-scroll">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Patient</th>
                  <th>Session Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.patient}</td>
                    <td>{t.session}</td>
                    <td>{formatCurrency(t.amount)}</td>
                    <td>{t.date}</td>
                    <td>
                      <span className={`status-badge status-badge-${t.status.toLowerCase()}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashD;