import "./CollectionsPage.scss";

const workoutData = [
  {
    title: "Move Freely",
    category: "Animal Flow",
    icon: "public/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Graceful Movements",
    category: "Ballet",
    icon: "public/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Master Form",
    category: "Calisthenics",
    icon: "public/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Explosive Power",
    category: "CrossFit",
    icon: "public/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Modern Movements",
    category: "Jazz",
    icon: "public/assets/icons/image-placeholder.png",
    highlight: true,
  },
  {
    title: "Mind and Body",
    category: "Yoga",
    icon: "public/assets/icons/image-placeholder.png",
    highlight: true,
  },
];

const CollectionsPage = () => {
  return (
    <main className="collections-page">
      <form className="search-bar">
        <img
          src="public/assets/icons/search-24px.svg"
          alt="Search"
          className="search-bar__icon"
        />
        <input
          type="search"
          placeholder="Search"
          aria-label="Search fitness collections"
          className="search-bar__input"
        />
      </form>

      <section className="workout-grid">
        {workoutData.map((workout, index) => (
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
