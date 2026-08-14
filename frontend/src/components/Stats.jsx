import { useEffect, useState } from "react";
import {
    BriefcaseBusiness,
    Building2,
    Users,
    Trophy
} from "lucide-react";

import { getStats } from "../services/statsService";
import "./Stats.css";


function Stats() {

    const [stats, setStats] = useState({

        jobsAvailable: 0,

        companies: 0,

        candidates: 0,

        successRate: 0

    });


    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchStats();

    }, []);


    const fetchStats = async () => {

        try {

            const response = await getStats();

            setStats(
                response.data.stats
            );

        } catch (error) {

            console.log(
                "Get stats error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const statsData = [

        {
            value: stats.jobsAvailable,
            label: "Jobs Available",
            icon: BriefcaseBusiness
        },

        {
            value: stats.companies,
            label: "Companies",
            icon: Building2
        },

        {
            value: stats.candidates,
            label: "Candidates",
            icon: Users
        },

        {
            value: stats.successRate,
            label: "Success Rate",
            icon: Trophy
        }

    ];


    return (

        <section className="stats-section">

            <div className="stats-container">

                {statsData.map(
                    (stat, index) => {

                        const Icon =
                            stat.icon;

                        return (

                            <div
                                className="stat-card"
                                key={index}
                            >

                                <div className="stat-icon">

                                    <Icon
                                        size={26}
                                        strokeWidth={2}
                                    />

                                </div>


                                <h2>

                                    {loading
                                        ? "..."
                                        : `${stat.value}${stat.label === "Success Rate"
                                            ? "%"
                                            : "+"
                                        }`
                                    }

                                </h2>


                                <p>
                                    {stat.label}
                                </p>

                            </div>

                        );

                    }
                )}

            </div>

        </section>

    );

}


export default Stats;