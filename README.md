# 📘 Form: Your Path to Mastering Movement

## 📖 Overview

**Form** is a gamified health education app designed to make learning and mastering physical movements enjoyable and interactive. Inspired by apps like Duolingo and CodeSignal, it offers a progressive "tree path" of poses and activities across disciplines like yoga, calisthenics, and dance. Users can learn poses, upload personal achievements, and track their progress visually. With integrated features for AI-powered posture feedback, **Form** helps users grow from beginner to expert in their chosen disciplines.

## 🚧 Problem Space

Learning and mastering physical movements, such as yoga poses, dance techniques, or calisthenics exercises, can be challenging for individuals at all levels. This app addresses several key pain points:

1. **Entry Barriers for Beginners**:  
   Starting a new discipline can be intimidating without clear guidance, structured progress, or beginner-friendly tools. Many feel overwhelmed by the steep learning curve.

2. **Cost of Entry**:  
   Committing to formal classes—whether for yoga, dance, or other disciplines—can be prohibitively expensive, especially for beginners who only want to try a few moves or explore multiple styles at once.

3. **Lack of Progress Visibility**:  
   Tracking improvement in physical skills is often abstract and subjective, making it difficult for users to recognize their growth and stay motivated.

4. **Inconsistent Practice**:  
   Building a habit of regular practice is tough without external motivators like streak tracking, visual progress, or accountability tools.

5. **Alignment and Form Issues**:  
   Without feedback, users risk improper technique, which can hinder progress and lead to frustration or even injury.

By addressing these challenges, **Form** empowers users to explore movement affordably, overcome barriers, track their progress visually, and build consistent habits while mastering physical skills.

## 👤 User Profile

### Who Will Use the App?

1. **Beginners**:  
   Individuals new to yoga, dance, or calisthenics who want an accessible and low-cost way to learn foundational moves and techniques without committing to expensive or long-term classes.

2. **Intermediate Practitioners**:  
   Users who already practice movement disciplines but want to refine their skills, improve alignment, or explore new styles.

3. **Experts**:  
   Advanced practitioners or professionals who can use the app to showcase their skills, track their progress, or even mentor others in future iterations.

4. **Cost-Conscious Movers**:  
   Users looking for a flexible, affordable way to explore multiple styles of movement without investing heavily in equipment, subscriptions, or formal training.

5. **Habit Builders**:  
   Individuals motivated by gamification, visual progress, and daily streaks to build consistent movement habits.

---

### 💡 How Will They Use the App?

- **Beginners**: Follow a guided tree path of poses or moves, unlocking progress step by step, and using pose cards for detailed instructions.
- **Intermediate Users**: Upload photos/videos to compare their form to ideal poses and receive feedback for improvement.
- **Experts**: Track and showcase their achievements through customized progress trees and may share content with followers (in future versions).
- **All Users**: Engage with daily movement prompts, track their streaks, and celebrate milestones with visual rewards.

---

### 🛠️ Special Considerations

1. **Accessible Design**: The app must be intuitive and visually appealing to cater to beginners unfamiliar with movement disciplines.
2. **Low-Cost Entry**: The app should provide meaningful features without requiring expensive hardware or subscriptions.
3. **Diverse Tracks**: Users may want to explore multiple styles (e.g., yoga, dance, calisthenics), so the app should offer variety without overwhelming them.
4. **Feedback Without Frustration**: AI-powered posture analysis should offer constructive, beginner-friendly feedback to avoid discouraging users.
5. **Mobile Compatibility**: Since movement is inherently active, the app must work seamlessly on mobile devices for portability.

## 🌟 Features

1. **Progress Tree**:

   - Users can explore and unlock a visually engaging tree path, where each node represents a skill or pose to master.
   - Completing a node unlocks the next challenge, allowing users to progress at their own pace.

2. **Pose Cards**:

   - Each pose or activity includes detailed guidance through text instructions, animations, or videos.
   - Users can upload photos or videos of their attempt for tracking and personalization.

3. **Daily Streak Tracking**:

   - Encourages consistent practice with daily movement prompts.
   - Streak counts are tracked dynamically, providing users with a sense of accomplishment.

4. **Media Customization**:

   - Users can replace default node visuals with their own uploaded photos or videos, creating a personalized visual record of their progress.

5. **Movement Prompts**:

   - Daily notifications suggest movement tasks or mindfulness exercises to keep users engaged.

6. **Accessibility on Mobile**:
   - The app is fully optimized for mobile use, allowing users to practice, upload, and receive feedback from anywhere.

---

**⭐ Nice-to-Have Features**:

1. **AI-Powered Feedback**:

   - Users can receive posture alignment feedback (e.g., "Straighten your back") when they upload a photo or use live detection tools.

2. **Social Connections**:

   - Users can add friends to view their progress trees, share milestones, and send motivational feedback.

3. **Cross-Discipline Tracks**:
   - Users can explore paths in different movement disciplines, including yoga, dance, and calisthenics.

## 🖥️ Implementation

### Tech Stack

1. **Frontend**:

   - **React**: Chosen for its modularity, efficiency, and strong ecosystem.
   - **Vite**: Used to create a fast and optimized development environment for React.
   - **SCSS**: For styling, offering reusable variables, mixins, and a modular structure.
   - **React-Router-Dom**: Enables seamless navigation between different pages of the app.

2. **Backend**:

   - **Node.js + Express**: Provides a lightweight, efficient server for handling API requests.
   - **Knex.js**: Manages database interactions, offering a clean and consistent query builder.
   - **MySQL**: Chosen for its reliability and structured storage of user profiles, progressions, poses, and streaks.
   - **CORS**: Middleware to enable secure cross-origin communication between the frontend and backend.

3. **Media Storage**:

   - **Server-Side Folder Storage (MVP)**: User-uploaded photos or videos will be saved to a designated folder on the server, with references stored in the database (tied to `user_id` and `pose_id`). Uploaded media will dynamically replace the default pose photo in the progress tree.
   - **Future Enhancements**: Cloud-based storage solutions like AWS S3 or Cloudinary will be implemented for scalability, reliability, and improved media handling in future iterations.

4. **AI Integration (Future Enhancement)**:

   - **Mediapipe**: For AI-powered posture detection and analysis, leveraging pre-trained models for body landmark recognition.
   - **Planned Use**: Future iterations may incorporate Mediapipe for providing posture alignment feedback to users. Mediapipe will first be explored during development to assess feasibility.

5. **Other Libraries and Tools**:

   - **Axios**: Handles API requests between the frontend and backend.
   - **dotenv**: Manages environment variables securely.
   - **Multer**: Simplifies handling of file uploads in the backend.

6. **Version Control and Deployment**:

   - **Git**: Version control system to manage and track changes during development.
   - **GitHub**: Remote repository for collaboration, version history, and project delivery.
   - **Localhost (MVP)**: The MVP will be deployed and tested locally.
   - **Future Hosting**: Plans include deployment to a cloud platform such as AWS, Heroku, or Vercel for production.

7. **Security and Data Integrity**:

   - **JWT (jsonwebtoken)**: Used for secure authentication and session management.
   - **bcryptjs**: Ensures secure password hashing before storing in the database.

---

### Why These Tools?

This stack ensures:

- Scalability: Tools like Express, Knex, and React ensure flexibility for future growth.
- Security: Authentication and data protection are prioritized with JWT and bcryptjs.
- Compatibility: Seamless interaction between the frontend and backend via CORS and Axios.
- Reliability: Git and GitHub provide robust version control and collaboration support.

## 🔗 APIs

1. **Yoga Pose API** (e.g., [Yoga API by Alex Cumplido](https://github.com/alexcumplido/yoga-api)):

   - A free database of yoga poses with detailed descriptions, images, and benefits.
   - _Usage_: Preloaded yoga pose data for initializing the app's tree nodes and pose cards.
   - _Limitations_: Limited to yoga poses; future expansion to other disciplines (e.g., dance or calisthenics) will require additional data sources or manual input.

2. **Mediapipe API** (Optional for Future Iterations):

   - Provides pre-trained pose estimation models for detecting and analyzing user posture.
   - _Usage_: Used to identify body landmarks and assess alignment for AI-powered feedback on poses (e.g., "Standing" vs. "Sitting").
   - _Limitations_: Accuracy depends on image quality and may struggle with non-standard lighting or camera angles.

3. **Cloudinary API** (Optional for Future Iterations):

   - Handles secure, scalable media uploads for user photos and videos.
   - _Usage_: Allows users to store and access their uploaded media, replacing default visuals on the progress tree.
   - _Limitations_: May require additional integration and budget considerations in the production phase.

4. **Calendar API** (Optional for Future Iterations):
   - Syncs movement tasks and reminders with user calendars (e.g., Google Calendar or Apple Calendar).
   - _Usage_: Sends daily prompts and schedules streak-related activities directly to user devices.
   - _Limitations_: Requires user authentication for calendar access and adds API configuration complexity.

## 🗺️ Sitemap

````plaintext
## Sitemap

```plaintext
client/
├── public/
│   └── Assets/
├── src/
│   ├── components/
│   │   ├── ProgressTree.jsx        # Component to visualize and manage the progress tree
│   │   ├── PoseCard.jsx            # Component for displaying pose instructions and user-uploaded media
│   │   ├── Profile.jsx             # Component for viewing and managing basic account settings
│   │   └── Settings.jsx            # (Future) Component for managing user preferences and notifications
│   ├── pages/
│   │   ├── Home.jsx                # Main page showing the user's tree and daily prompts
│   │   ├── Login.jsx               # Login page for user authentication
│   │   ├── Signup.jsx              # Signup page for new users
│   │   └── Friends.jsx             # (Future) Page to view friends' trees and progress
│   ├── services/
│   │   ├── api.js                  # Manages API calls between the frontend and backend
│   │   └── mediapipeServ.js        # (Future) Handles Mediapipe integration for AI posture feedback
│   ├── styles/
│   │   ├── \_variables.scss
│   │   ├── \_mixins.scss
│   │   ├── \_global.scss
│   │   └── \_typography.scss
│   ├── App.jsx
│   ├── index.scss
│   └── main.jsx
├── vite.config.js
├── eslint.config.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json

````

```plaintext
server/
├── controllers/
│   ├── authController.js           # Handles authentication logic (e.g., login, signup)
│   ├── poseController.js           # Manages CRUD operations for poses
│   ├── progressionController.js    # Handles user progression tracking and updates
│   └── streakController.js         # Tracks user streaks and retrieves streak-related data
├── routes/
│   ├── authRoutes.js               # API routes for user authentication
│   ├── poseRoutes.js               # API routes for fetching and managing pose data
│   ├── progressionRoutes.js        # API routes for tracking and updating progressions
│   └── streakRoutes.js             # API routes for streak-related actions
├── models/
│   ├── User.js                     # Database model for user accounts and profile data
│   ├── Pose.js                     # Database model for poses (e.g., name, difficulty, media links)
│   ├── Progression.js              # Database model for tracking user progress for each pose
│   └── Streak.js                   # Database model for streak tracking and milestone progress
├── db/
│   ├── dbConfig.js                 # MySQL database connection configuration
│   └── migrations/                 # Database schema migrations (e.g., creating tables)
├── uploads/                        # Folder for storing user-uploaded media files
├── middleware/
│   ├── authenticate.js             # Middleware for verifying JWT tokens for protected routes
│   └── multerConfig.js             # Middleware configuration for handling file uploads
├── server.js                       # Main entry point for starting the backend server
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json

```

## 🖼️ Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

## 🗄️ Data and Relationships:

1. **Users**:

   - Stores user information such as account details, preferences, and profile data.
   - Relationship:
     - A **user** can have one active **streak** and multiple **progressions** (1-to-1 with `Streaks`, Many-to-Many with `Poses` through `Progressions`).

2. **Poses**:

   - Represents the different poses or skills available in the app, populated with data from the yoga API.
   - Relationship:
     - A **pose** can belong to many **progressions** (Many-to-Many with `Users` through `Progressions`).

3. **Progressions**:

   - Tracks the progress of each user in completing poses or activities in the progress tree.
   - Relationship:
     - Connects **users** and **poses** (Many-to-Many).

4. **Streaks**:
   - Tracks a user’s consecutive days of activity, including milestones and rewards.
   - Relationship:
     - A **user** can have one active **streak** (1-to-1 with `Users`).

---

### Entity Relationships in Words:

- A **User** can complete multiple **Progressions**, which track which **Poses** the user has unlocked and completed.
- A **Pose** can be part of multiple **Progressions**, representing different users working on the same pose.
- A **User** can have one active **Streak**, tracking their consecutive days of engagement.

---

#### Database Schema (Tabular Description):

| **Table**        | **Columns**                                                                                                                                   | **Relationships**                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Users**        | id (PK), name, email, password, profile_picture                                                                                               | 1-to-1 with `Streaks`, Many-to-Many with `Poses` through `Progressions` |
| **Poses**        | id (PK), english_name, sanskrit_name_adapted, sanskrit_name, translation_name, pose_description, pose_benefits, url_svg, url_png, url_svg_alt | Many-to-Many with `Users` through `Progressions`                        |
| **Progressions** | id (PK), user_id (FK), pose_id (FK), status, custom_media                                                                                     | Many-to-Many join table between `Users` and `Poses`                     |
| **Streaks**      | id (PK), user_id (FK), start_date, end_date, rewards                                                                                          | 1-to-1 with `Users`                                                     |

---

### Visual Representation (ERD):

```plaintext
[Users]
   | 1
   |-------------------|
   |                   |
   1                   M
[Streaks]       [Progressions]
                       |
                       M
                       |
                    [Poses]
```

## 📬 Endpoints

#### **Users Endpoints**

1. **Register a New User**

   - **URL**: `/api/users/register`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "name": "Betty Alemayehu",
       "email": "betty@example.com",
       "password": "securepassword"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully",
       "user": {
         "id": 1,
         "name": "Betty Alemayehu",
         "email": "betty@example.com"
       }
     }
     ```

2. **Login User**

   - **URL**: `/api/users/login`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "email": "betty@example.com",
       "password": "securepassword"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Login successful",
       "token": "jwt-token-example"
     }
     ```

3. **Get User Profile**
   - **URL**: `/api/users/profile`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer jwt-token-example"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "name": "Betty Alemayehu",
       "email": "betty@example.com",
       "profile_picture": "https://example.com/images/profile.jpg"
     }
     ```

---

#### **Poses Endpoints**

4. **Get All Poses**

   - **URL**: `/api/poses`
   - **Method**: `GET`
   - **Response**:
     ```json
     [
       {
         "id": 5,
         "english_name": "Butterfly",
         "sanskrit_name": "Baddha Koṇāsana",
         "pose_description": "In sitting position, bend both knees and drop the knees to each side...",
         "pose_benefits": "Opens the hips and groins. Stretches the shoulders, rib cage, and back...",
         "url_svg": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.svg",
         "url_png": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png"
       }
     ]
     ```

5. **Get Pose by ID**

   - **URL**: `/api/poses/:id`
   - **Method**: `GET`
   - **URL Parameters**:
     - `id` (integer): The ID of the pose.
   - **Response**:
     ```json
     {
       "id": 5,
       "english_name": "Butterfly",
       "sanskrit_name": "Baddha Koṇāsana",
       "pose_description": "In sitting position, bend both knees and drop the knees to each side...",
       "pose_benefits": "Opens the hips and groins. Stretches the shoulders, rib cage, and back...",
       "url_svg": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.svg",
       "url_png": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png"
     }
     ```

6. **Search Poses by Level**
   - **URL**: `/api/poses?level=value`
   - **Method**: `GET`
   - **Query Parameters**:
     - `level` (string): The difficulty level of the pose (e.g., beginner, intermediate, expert).
   - **Response**:
     ```json
     [
       {
         "id": 8,
         "english_name": "Cow",
         "sanskrit_name": "Bitilāsana",
         "pose_description": "From a box neutral position, the ribcage is lifted...",
         "pose_benefits": "Strengthens the spine and improves flexibility...",
         "url_svg": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.svg",
         "url_png": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.png"
       }
     ]
     ```

---

#### **Progressions Endpoints**

7. **Get User Progressions**

   - **URL**: `/api/progressions`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer jwt-token-example"
     }
     ```
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "pose_id": 5,
         "status": "Completed",
         "custom_media": "https://example.com/uploads/user-pose-butterfly.jpg"
       },
       {
         "id": 2,
         "pose_id": 8,
         "status": "In Progress",
         "custom_media": null
       }
     ]
     ```

8. **Update User Progression**
   - **URL**: `/api/progressions/:id`
   - **Method**: `PATCH`
   - **URL Parameters**:
     - `id` (integer): The ID of the progression to update.
   - **Request Body**:
     ```json
     {
       "status": "Completed",
       "custom_media": "https://example.com/uploads/user-pose-cow.jpg"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Progression updated successfully",
       "progression": {
         "id": 2,
         "status": "Completed",
         "custom_media": "https://example.com/uploads/user-pose-cow.jpg"
       }
     }
     ```

---

#### **Streaks Endpoints**

9. **Get User Streak**

   - **URL**: `/api/streaks`
   - **Method**: `GET`
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer jwt-token-example"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "start_date": "2024-11-01",
       "end_date": "2024-11-17",
       "rewards": "10-day badge"
     }
     ```

10. **Reset User Streak**
    - **URL**: `/api/streaks/reset`
    - **Method**: `POST`
    - **Headers**:
      ```json
      {
        "Authorization": "Bearer jwt-token-example"
      }
      ```
    - **Response**:
      ```json
      {
        "message": "Streak reset successfully",
        "streak": {
          "id": 1,
          "start_date": "2024-11-17",
          "end_date": null,
          "rewards": null
        }
      }
      ```

## 🛤️ Roadmap

### Project Sprint Plan

The project timeline runs from **November 20th** to **December 1st**. The plan allocates 9 days for development and implementation, with the 10th day dedicated to testing, debugging, and final touches.

- **November 19th**: Proposal submission.
- **November 20th**: Confirm feedback and refine the scope as necessary.
- **November 22nd**: Reserved for an industry project (no capstone work).
- **November 23rd–24th**: Weekend with extra bandwidth to tackle heavier tasks.
- **November 30th**: Scheduled day off (no capstone work).

---

#### **Day 1: November 20th - Confirm Feedback & Initial Setup**

- **Feedback Review**:
  - Evaluate feedback on the submitted proposal and refine the project plan accordingly.
- **Setup Tasks**:
  - Initialize the project:
    - **Frontend**: Create a React app using Vite.
    - **Backend**: Set up Node.js with Express and MySQL using Knex.js.
  - Establish folder structures:
    - **Frontend**: `components`, `pages`, `services`, `styles`.
    - **Backend**: `controllers`, `models`, `routes`, `db`.
  - Install required dependencies:
    - **Frontend**: `axios`, `react-router-dom`, `sass`.
    - **Backend**: `bcryptjs`, `jsonwebtoken`, `multer`, `dotenv`.
  - Push the project to GitHub with a README draft.
- **Goals**:
  - Ensure both the client and server environments are functional and ready for development.

---

#### **Day 2: November 21st - Database Design & Authentication**

- **Database Tasks**:
  - Design schema for `Users`, `Poses`, `Progressions`, and `Streaks` tables.
  - Populate `Poses` table using data from the Yoga API.
- **Backend Tasks**:
  - Implement authentication endpoints (`/register`, `/login`).
  - Encrypt passwords using `bcrypt` and generate JWT tokens for secure sessions.
- **Frontend Tasks**:
  - Create login and signup pages with validation logic.
  - Integrate frontend authentication flow using Axios and React Context API.
- **Goals**:
  - Users can register and log in securely.

---

#### **Day 3: November 22nd - Reserved for Industry Project**

**No capstone work scheduled.**

---

#### **Day 4: November 23rd - PoseCard Component & Navbar**

- **Frontend Tasks**:
  - Build the `PoseCard` component:
    - Fetch pose data by ID from `/api/poses/:id`.
    - Display pose name, description, benefits, and images.
    - Add an upload button for user-submitted media.
  - Implement a responsive navbar:
    - Links to `Home`, `Profile`, and logout functionality.
    - Hamburger menu for mobile screens.
- **Backend Tasks**:
  - Create endpoints for fetching pose details (`/api/poses/:id`) and updating progressions (`/api/progressions/:id`).
- **Goals**:
  - A functional `PoseCard` with media upload support.
  - Responsive navigation for desktop and mobile views.

---

#### **Day 5: November 24th - Progress Tree Visualization**

- **Frontend Tasks**:
  - Develop the `ProgressTree` component on the `Home` page:
    - Fetch progression data from `/api/progressions`.
    - Dynamically render locked and unlocked nodes based on user progress.
- **Backend Tasks**:
  - Implement progression endpoints:
    - `/api/progressions` (GET) for retrieving user progress.
    - `/api/poses` (GET) for fetching all available poses.
- **Goals**:
  - Display a dynamic progress tree reflecting user achievements.

---

#### **Day 6: November 25th - Image Upload Integration**

- **Frontend Tasks**:
  - Add image upload functionality to the `PoseCard`:
    - Preview images before submission.
    - Replace the default pose image with user-uploaded media.
  - Connect to backend APIs for file uploads and progression updates.
- **Backend Tasks**:
  - Use `multer` for handling image uploads.
  - Save file paths in the `Progressions` table for rendering in the progress tree.
- **Goals**:
  - Users can upload custom images and see them reflected in their progress tree.

---

#### **Day 7: November 26th - Profile Page Development**

- **Frontend Tasks**:
  - Create a utility-style `Profile` page:
    - Display account details (e.g., name, email).
    - Include options for logout, account deletion, or deactivation.
- **Backend Tasks**:
  - Implement account management endpoints:
    - `/api/users/profile` (GET) for retrieving user details.
    - `/api/users/delete` (DELETE) for account removal.
    - `/api/users/logout` (POST) for session termination.
- **Goals**:
  - A basic profile page for account management.

---

#### **Day 8: November 27th - Mediapipe Exploration**

- **Backend Tasks**:
  - Investigate Mediapipe for AI-powered posture analysis:
    - Use Mediapipe to extract keypoints from user and model poses.
    - Compare keypoints and calculate deviations.
    - Return basic feedback (e.g., "Straighten your back").
- **Frontend Tasks**:
  - Update `PoseCard` to display:
    - Model pose and user-uploaded pose side by side.
    - Feedback messages based on the backend response.
- **Goals**:
  - Explore the feasibility of Mediapipe integration for static image comparison.

---

#### **Day 9: November 28th - Core Refinements**

- **Frontend Tasks**:
  - Finalize UI/UX across all components and pages.
  - Add error handling and smooth animations for a polished experience.
- **Backend Tasks**:
  - Optimize database queries for better performance.
  - Implement additional validations for security and reliability.
- **Goals**:
  - A refined and bug-free user experience.

---

#### **Day 10: November 29th - Testing**

- **Tasks**:
  - Conduct end-to-end testing:
    - Validate user registration, login, pose uploads, and streak tracking.
    - Test navigation and media rendering on different devices.
  - Resolve bugs and inconsistencies in the app.
- **Goals**:
  - Ensure all features work seamlessly across devices.

---

#### **Day 11: November 30th - Scheduled Day Off**

**No capstone work scheduled.**

---

#### **Day 12: December 1st - Final Touches & Submission**

- **Tasks**:
  - Refine final details:
    - Smooth UI interactions and clean up any loose ends.
    - Ensure comprehensive documentation in the README:
      - Setup instructions, API examples, and project workflows.
  - Submit the repository and prepare the capstone presentation.
- **Goals**:
  - Deliver a polished MVP ready for review and demonstration.

## 🚀 Future Implementations

The following features are planned as enhancements beyond the Minimum Viable Product (MVP). These additions aim to expand the app's functionality, improve user experience, and increase scalability. If time permits during development, some features may be partially implemented.

---

### **Planned Enhancements**

1. **Cross-Discipline Pose Categories**:

   - Add pose libraries for dance, calisthenics, and other physical disciplines.
   - Provide users with tailored progress trees for specific goals (e.g., "Flexibility Boost").

2. **Advanced AI Feedback**:

   - Expand Mediapipe integration for:
     - Real-time video analysis for live pose corrections.
     - Personalized guidance for alignment and balance adjustments.
   - Provide feedback for advanced poses using dynamic posture assessments.

3. **Cloud-Based Image Storage**:

   - Transition from local image storage to cloud-based solutions like AWS S3 or Cloudinary.
   - Benefits:
     - Improved scalability and security.
     - Simplified media retrieval for mobile and web users.

4. **Social Features**:

   - Enable users to add friends, view their progress trees, and send motivational feedback or comments.
   - Introduce collaborative challenges or group achievements.

5. **Progress Analytics**:

   - Offer detailed insights into user activity:
     - Visualize streak history and pose completion rates.
     - Provide suggestions for improving consistency and performance.

6. **Mobile App Deployment**:

   - Develop a React Native version of the app.
   - Features:
     - Push notifications for daily streak reminders.
     - Offline pose cards for on-the-go practice.

7. **Custom User Avatars**:

   - Allow users to create and customize avatars representing their progress.
   - Introduce avatar upgrades unlocked through streaks or pose completion.

8. **Streak Rewards**:
   - Introduce streak-based rewards such as:
     - Badges for milestones (e.g., 7-day, 30-day streaks).
     - Unlockable themes or progress tree customizations.

---

### 🔮 Prioritization of Future Features

The post-MVP focus will be on **cross-discipline pose categories** and **cloud-based image storage** to enhance user engagement and scalability. Advanced AI feedback and mobile deployment are longer-term goals. Simpler features like streak rewards and progress analytics may be added earlier based on development progress.

This roadmap ensures the app remains innovative and adaptable to user needs while maintaining a clear development focus.
