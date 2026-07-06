import "../styles/AnalysisCard.css";

function AnalysisCard({
    analysis,
    loading,
    context,
}) {

    return (

        <div className="analysis-card">

            <h2>🤖 AI Medical Analysis</h2>

            {

                loading ?

                (

                    <div className="loading">

                        Analyzing Symptoms...

                    </div>

                )

                :

                analysis ?

                (

                    <div className="analysis-content">

                        {analysis}

                    </div>

                )

                :

                (

                    <div className="analysis-placeholder">

                        🩺

                        <br /><br />

                        Enter symptoms and click

                        <br />

                        <strong>Analyze Symptoms</strong>

                    </div>

                )

            }

            {

                context &&

                (

                    <div className="context">

                        <h3>Medical Knowledge Used</h3>

                        {context}

                    </div>

                )

            }

        </div>

    );

}

export default AnalysisCard;