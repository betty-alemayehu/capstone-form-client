//CollectionsPage.jsx
import { useState, useEffect } from "react";
import { getUserProgressionsWithMedia } from "../services/api";
import "./CollectionsPage.scss";
import SearchBar from "../components/SearchBar";

const recommendationsData = [
  { relatedPose: "Boat", recommendation: "V-Sit (Calisthenics)" },
  { relatedPose: "Bridge", recommendation: "Glute Bridge (Fitness)" },
  { relatedPose: "Crow", recommendation: "Handstand Prep (Gymnastics)" },
  { relatedPose: "Camel", recommendation: "Backbend (Gymnastics)" },
  { relatedPose: "Tree", recommendation: "Single-Leg Balance (Dance)" },
  { relatedPose: "Plank", recommendation: "Push-Up (Calisthenics)" },
  { relatedPose: "Half-Moon", recommendation: "Side Plank (Calisthenics)" },
  {
    relatedPose: "Downward-Facing Dog",
    recommendation: "Mountain Climber (Calisthenics)",
  },
  { relatedPose: "Warrior Two", recommendation: "Lunge (Fitness)" },
  { relatedPose: "Child's Pose", recommendation: "Resting Stretch (Dance)" },
  {
    relatedPose: "Standing Forward Bend",
    recommendation: "Hamstring Stretch (Fitness)",
  },
  {
    relatedPose: "Corpse",
    recommendation: "Body Scan Meditation (Mindfulness)",
  },
  { relatedPose: "Bow", recommendation: "Superman (Fitness)" },
  { relatedPose: "Lotus", recommendation: "Seated Meditation (Mindfulness)" },
  {
    relatedPose: "Extended Hand to Toe",
    recommendation: "Pistol Squat (Calisthenics)",
  },
];

const CollectionsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedProgressions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.user_id;

        let completedPoseNames = [];

        if (userId) {
          const response = await getUserProgressionsWithMedia(userId);

          // Extract completed poses
          completedPoseNames = response.data
            .filter((progression) => progression.status === "Completed")
            .map((progression) => progression.english_name);
        }

        // Create workout cards:
        const formattedWorkouts = recommendationsData.map((rec) => ({
          title: rec.relatedPose,
          category: rec.recommendation,
          icon: "/assets/icons/image-placeholder.png", // Placeholder icon
          highlight: completedPoseNames.includes(rec.relatedPose), // Highlight if completed
        }));

        // Sort alphabetically by the 'category' (recommendation) field
        formattedWorkouts.sort((a, b) => a.category.localeCompare(b.category));

        setWorkouts(formattedWorkouts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching completed progressions:", error);
        setIsLoading(false);
      }
    };

    fetchCompletedProgressions();
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
        // <p className="collections-page__loading">Loading recommendations...</p>
        <p className="collections-page__loading"></p>
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
