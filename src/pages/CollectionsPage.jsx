//CollectionsPage.jsx
import { useState, useEffect } from "react";
import { getUserProgressionsWithMedia } from "../services/api";
import "./CollectionsPage.scss";
import SearchBar from "../components/SearchBar";

const recommendationsData = [
  {
    relatedPose: "Boat",
    recommendation: "V-Sit (Calisthenics)",
    icon: "https://www.withinmvmnt.com/wp-content/uploads/2021/10/how-to-combine-yoga-and-calisthenics.jpg",
  },
  {
    relatedPose: "Half-Moon",
    recommendation: "Arabesque (Ballet)",
    icon: "https://media.istockphoto.com/id/183811427/hu/fot%C3%B3/balett-t%C3%A1ncos-arabesque.jpg?s=612x612&w=0&k=20&c=sW_K_llJ_iE6YuNrSeTTLZ-t4WXJM1ZrIRLDs5QJRb4=",
  },
  {
    relatedPose: "Warrior Two",
    recommendation: "Lunge (Fitness)",
    icon: "https://www.wikihow.com/images/thumb/d/dd/Do-Lunges-Step-8-Version-5.jpg/v4-460px-Do-Lunges-Step-8-Version-5.jpg",
  },
  {
    relatedPose: "Bow",
    recommendation: "Superman (Fitness)",
    icon: "https://www.artofliving.org/sites/www.artofliving.org/files/styles/original_image/public/unity2/blog_image/Superman%20pose%20%282%29.jpeg",
  },
  {
    relatedPose: "Lotus",
    recommendation: "Seated Meditation (Mindfulness)",
    icon: "https://www.thetappingsolution.com/blog/wp-content/uploads/2020/11/meditation-image.png",
  },
  {
    relatedPose: "Extended Hand to Toe",
    recommendation: "Pistol Squat (Calisthenics)",
    icon: "https://hips.hearstapps.com/hmg-prod/images/pistol-squat-regular-pistol-squat-233-1654102650.jpg?crop=0.744xw:0.558xh;0.120xw,0.397xh&resize=1200:*",
  },
];

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

          console.log("Fetched Progressions Data:", response.data);

          // Build items with user media
          posesData = response.data.map((progression) => {
            const mediaUrl = progression.media_url.startsWith("/")
              ? `${baseURL}${progression.media_url}` // Prepend baseURL to relative media_url
              : progression.media_url;

            return {
              title: progression.english_name,
              category: progression.pose_benefits || "Yoga Pose",
              icon: mediaUrl || progression.url_png, // Use media_url or fallback to url_png
              highlight: progression.status === "Completed",
            };
          });
        }

        // Combine user poses with recommendations
        const formattedRecommendations = recommendationsData.map((rec) => ({
          title: rec.relatedPose,
          category: rec.recommendation,
          icon: rec.icon,
          highlight: false, // Recommendations are not automatically completed
        }));

        const combinedData = [...posesData, ...formattedRecommendations];
        combinedData.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically

        setWorkouts(combinedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching combined data:", error);
        setIsLoading(false);
      }
    };

    fetchCombinedData();
  }, []);

  // Filter workouts based on the search query
  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchQuery.toLowerCase())
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
        <section className="workout-grid">
          {filteredWorkouts.map((workout, index) => (
            <article
              key={index}
              className={`workout-card ${
                workout.highlight ? "workout-card--highlight" : ""
              }`}
            >
              <div
                className={`workout-card__icon-container ${
                  workout.highlight
                    ? "workout-card__icon-container--highlight"
                    : ""
                }`}
              >
                <img
                  src={workout.icon}
                  alt={`${workout.title} icon`}
                  className="workout-card__icon"
                />
              </div>
              <div className="workout-card__content">
                <h3 className="workout-card__title">{workout.title}</h3>
                <p className="workout-card__category">{workout.category}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default CollectionsPage;
