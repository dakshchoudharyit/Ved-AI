import "../styles/PatientForm.css";

function PatientForm({
  name,
  setName,
  age,
  setAge,
  symptoms,
  setSymptoms,
  onAnalyze,
}) {
  return (
    <div className="patient-form">

      <h2>🩺 Patient Information</h2>

      <div>
        <label>Patient Name</label>

        <input
          type="text"
          placeholder="Enter patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Age</label>

        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div>
        <label>Symptoms</label>

        <textarea
          placeholder="Describe the symptoms in detail..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
      </div>

      <button onClick={onAnalyze}>
        🔍 Analyze Symptoms
      </button>

    </div>
  );
}

export default PatientForm;