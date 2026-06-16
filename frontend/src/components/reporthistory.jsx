function ReportHistory({
  reports,
  onSelect,
}) {
  return (
    <div className="history-card">
      <h2>
        Previous Reports
      </h2>

      {reports.map((report) => (
        <div
          key={report.id}
          className="history-item"
          onClick={() =>
            onSelect(report)
          }
        >
          <strong>
            {report.patient_name}
          </strong>

          <p>
            {report.symptoms}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportHistory;