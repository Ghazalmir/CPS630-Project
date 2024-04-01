import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./style.css";

function ReportedAds() {
  const [reportedAds, setReportedAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdData = async () => {
        try {
            let apiUrl = 'http://localhost:8080/api/admin/reported-ads';
            const response = await axios.get(apiUrl);
            setReportedAds(response.data.rows);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching ad data:', error);
            setIsLoading(false);
        }
    };

    fetchAdData();
}, []);

  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading reported ads: {error}</p>;
  if (!reportedAds || reportedAds.length === 0) return <p>No reported ads found.</p>; // Add this for empty response

  const handleDelete = (adId) => {
    fetch(`http://localhost:8080/api/admin/reported-ads/${adId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete ad");
        }
        setReportedAds(reportedAds.filter((ad) => ad.id !== adId));
      })
      .catch((error) => {
        console.error("Delete error:", error);
        setError(error.toString());
      });
  };
  return (
    <div>
      <main>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="./style.css" />

        <section className="links">
          <a href="./ReportedAds" className="active">
            Reported Ads
          </a>
          <a href="./ReportedUsers">Reported Users</a>
          <a href="./ManageUsers">Manage Users</a>
        </section>
        <section>
          {reportedAds.map((ad) => (
            <article key={ad.id}>
              <p>
                Reported For: <span>{ad.reason}</span>
              </p>
              <div className="img-stacked-btn">
                <img src={ad.image_url} alt={ad.title} />
                <button onClick={() => handleDelete(ad.id)}>Delete</button>
              </div>
              <p>${ad.price}</p>
              <h3>{ad.title}</h3>
              <p>{ad.location}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ReportedAds;


