import React, { useState } from "react";
import "./CollectionsPage.scss";
import SearchBar from "../components/SearchBar"; // Import the new SearchBar component

const workoutData = [
  {
    title: "Move Freely",
    category: "Animal Flow",
    icon: "/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Graceful Movements",
    category: "Ballet",
    icon: "/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Master Form",
    category: "Calisthenics",
    icon: "/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Explosive Power",
    category: "CrossFit",
    icon: "/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Modern Movements",
    category: "Jazz",
    icon: "/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Mind and Body",
    category: "Yoga",
    icon: "/assets/icons/image-placeholder.png",
    highlight: true,
  },
];

const CollectionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter workouts based on the search query
  const filteredWorkouts = workoutData.filter(
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
                alt={`${workout.category} icon`}
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
    </main>
  );
};

export default CollectionsPage;
