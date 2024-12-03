//CollectionsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProgressionsWithMedia } from "../services/api";
import "./CollectionsPage.scss";
import SearchBar from "../components/SearchBar";
import { recommendationsData } from "../utils/recommendationsData";

const CollectionsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.user_id;

        let posesData = [];
        const baseURL = import.meta.env.VITE_API_URL;

        if (userId) {
          const response = await getUserProgressionsWithMedia(userId);
          posesData = response.data.map((progression) => ({
            id: progression.pose_id,
            title: progression.english_name,
            relatedPose: progression.english_name, // Include relatedPose for filtering
            category: "Yoga",
            description: progression.pose_description || "",
            image: progression.media_url.startsWith("/")
              ? `${baseURL}${progression.media_url}`
              : progression.media_url,
            highlight: progression.status === "Completed",
          }));
        }

        const formattedRecommendations = recommendationsData.map((rec) => ({
          id: rec.id,
          title: rec.recommendation,
          relatedPose: rec.relatedPose,
          category: rec.category,
          description: rec.description || "",
          image: rec.image,
          highlight: false,
        }));

        const combinedData = [...posesData, ...formattedRecommendations];
        combinedData.sort((a, b) => a.title.localeCompare(b.title));

        setWorkouts(combinedData);
      } catch (error) {
        console.error("Error fetching combined data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCombinedData();
  }, []);

  const filteredWorkouts = workouts.filter((workout) =>
    Object.values(workout).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <main className="collections-page">
      <SearchBar
        placeholder="Search fitness collections"
        onSearch={setSearchQuery}
      />
      {isLoading ? (
        <p className="collections-page__loading">Loading recommendations...</p>
      ) : (
        <section className="collections-page__grid">
          {filteredWorkouts.map((workout, index) => (
            <Link
              key={index}
              to={workout.id ? `/pose-card/${workout.id}` : "#"}
              className={`collections-page__card ${
                workout.highlight ? "collections-page__card--highlight" : ""
              }`}
            >
              <div
                className={`collections-page__image-container ${
                  workout.highlight
                    ? "collections-page__image-container--highlight"
                    : ""
                }`}
              >
                <img
                  src={workout.image}
                  alt={`${workout.title} image`}
                  className="collections-page__image"
                />
              </div>
              <div className="collections-page__content">
                <h3 className="collections-page__title">{workout.title}</h3>
                <p className="collections-page__category">{workout.category}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default CollectionsPage;
