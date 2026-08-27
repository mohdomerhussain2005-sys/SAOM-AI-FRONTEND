const stats = [
  {
    value: "24/7",
    label: "Threat Monitoring",
  },
  {
    value: "99.9%",
    label: "Detection Accuracy",
  },
  {
    value: "< 3s",
    label: "Alert Response",
  },
  {
    value: "AI",
    label: "Powered Analysis",
  },
];

export default function Stats() {
  return (
    <section className="stats-section">

      <div className="stats-container">

        {stats.map((stat, index) => (
          <div
            className={`stat-item ${
              index !== stats.length - 1 ? "stat-bordered" : ""
            }`}
            key={stat.value}
          >

            <div className="stat-value">
              {stat.value}
            </div>

            <div className="stat-label">
              {stat.label}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}