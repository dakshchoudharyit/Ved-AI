import "../styles/ReportHistory.css";

function ReportHistory({
    reports,
    onSelect,
}) {

    return (

        <div className="report-history">

            <h2>📋 Previous Reports</h2>

            {

                reports.length === 0 ?

                (

                    <div className="no-report">

                        No reports generated yet.

                    </div>

                )

                :

                reports.map((report)=>(

                    <div

                        key={report.id}

                        className="report-card"

                        onClick={()=>onSelect(report)}

                    >

                        <h3>

                            🩺 Report #{report.id}

                        </h3>

                        <div className="report-date">

                            {new Date(
                                report.created_at
                            ).toLocaleString()}

                        </div>

                        <div className="report-preview">

                            {

                                report.symptoms.length > 70

                                ?

                                report.symptoms.substring(0,70)+"..."

                                :

                                report.symptoms

                            }

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default ReportHistory;