function AnalysisCard({
  analysis,
  loading,
  context
}) {
  return (
    <div className="analysis-card">

      <h2>AI Medical Analysis</h2>

      {loading ? (
        <p>🔄 Analyzing symptoms...</p>
      ) : (
        <>
          <p>{analysis}</p>

          <hr />

          <h3>Retrieved Medical Knowledge</h3>

          <pre className="context-box">
            {context}
          </pre>
        </>
      )}

    </div>
  );
}

export default AnalysisCard;