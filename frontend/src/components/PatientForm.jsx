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
      <h2>Patient Information</h2>

      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <label>Symptoms</label>
      <textarea
        rows="6"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Describe symptoms..."
      />

      <button onClick={onAnalyze}>
        Analyze Symptoms
      </button>
    </div>
  );
}

export default PatientForm;