import { useState, useEffect } from "react";
import PatientForm from "../components/PatientForm";
import AnalysisCard from "../components/AnalysisCard";
import ReportHistory from "../components/ReportHistory";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../App.css";

function Dashboard() {

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

      const res = await api.get("/reports");

      setReports(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  const analyzeSymptoms = async () => {

    try {

      setLoading(true);

      const res = await api.post("/analyze", {
        name,
        age: Number(age),
        symptoms,
      });

      setAnalysis(res.data.analysis);
      setContext(res.data.context);

      fetchReports();

    } catch (err) {

    console.error(err);

    if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
    }

    alert("Analyze Failed");
    }finally {
      setLoading(false);
    }

  };

  return (
    <div className="app">

      <Navbar />

      <div className="heading">

        <h1>🏥 Medical AI Assistant</h1>

        <p>
          AI Powered Healthcare Assistant
        </p>

      </div>

      <div className="stats-card">
        Total Reports: {reports.length}
      </div>

      <div className="dashboard">

        <ReportHistory
          reports={reports}
          onSelect={(report) => {
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

export default Dashboard;