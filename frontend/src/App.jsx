import { useState, useEffect } from "react";
import PatientForm from "./components/PatientForm";
import AnalysisCard from "./components/AnalysisCard";
import ReportHistory from "./components/ReportHistory";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/reports"
      );

      const data = await res.json();

      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const analyzeSymptoms = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            age: Number(age),
            symptoms,
          }),
        }
      );

      const data = await res.json();

      setAnalysis(data.analysis);
      setContext(data.context);

      fetchReports();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <h1>
        🏥 Medical AI Assistant
      </h1>

      <div className="stats-card">
        Total Reports: {reports.length}
      </div>

      <div className="dashboard">

        <ReportHistory
          reports={reports}
          onSelect={(report) => {
            setName(report.patient_name);
            setAge(report.age);
            setSymptoms(report.symptoms);
            setAnalysis(report.analysis);
          }}
        />

        <PatientForm
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          onAnalyze={analyzeSymptoms}
        />

        <AnalysisCard
          analysis={analysis}
          loading={loading}
          context={context}
        />

      </div>

    </div>
  );
}

export default App;