import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CollectionsPage.scss";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const CollectionsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch workout categories from the API
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          "https://yoga-api-nzy4.onrender.com/v1/categories"
        );

        // Map API data to match the structure of `workoutData`
        const formattedWorkouts = response.data.map((category) => ({
          title: category.category_name,
          category: category.category_description,
          icon: "/assets/icons/image-placeholder.png", // Placeholder icon
          highlight: true, // Default set to true
        }));

        setWorkouts(formattedWorkouts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Filter workouts based on the search query
  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="collections-page">
      {/* Use the SearchBar component */}
      <SearchBar
        placeholder="Search fitness collections"
        onSearch={setSearchQuery}
      />

      {isLoading ? (
        <p className="collections-page__loading">Loading workouts...</p>
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
