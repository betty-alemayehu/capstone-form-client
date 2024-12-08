# 🤸 [bodylingo](https://bodylingo.netlify.app/)

💡 **TL;DR:** bodylingo gamifies fitness learning with a progression tree and AI feedback, making physical movement mastery accessible, engaging, and affordable.

---

## **Problem Space**

Physical movement mastery is expensive, intimidating, and lacks feedback. bodylingo helps beginners and practitioners build confidence, track progress, and refine techniques affordably.

---

## **Key Features**

- ✅ Gamified Progression Tree  
- ✅ AI Feedback on poses  
- ✅ Pose Cards with uploadable media  
- ✅ Cross-discipline recommendations

---

## **Tech Stack**

### Design
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### Frontend  
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  ![Mediapipe](https://img.shields.io/badge/Mediapipe-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Backend  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)  ![Knex.js](https://img.shields.io/badge/Knex.js-EF5B25?style=for-the-badge&logoColor=white)  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)  

### Deployment  
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)  ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)  

### Additional Tools  
- **File Upload**: Express file upload for handling photos  
- **Authentication**: JWT for secure user access  

---

## **Repositories**

- **Frontend:** [capstone-form-client](https://github.com/betty-alemayehu/capstone-form-client)  
- **Backend:** [capstone-form-server](https://github.com/betty-alemayehu/capstone-form-server)  

---

## **Setup Instructions**

### Frontend
1. Clone the repository:
   `git clone https://github.com/betty-alemayehu/capstone-form-client`
2. Navigate to the project directory:
   `cd capstone-form-client`
3. Install dependencies:
   `npm install`
4. Start the development server:
   `npm run dev`
5. Access the app at:
   `http://localhost:5173`

---

### Backend
1. Clone the repository:
   `git clone https://github.com/betty-alemayehu/capstone-form-server`
2. Navigate to the project directory:
   `cd capstone-form-server`
3. Install dependencies:
   `npm install`
4. Create a `.env` file and configure the variables (refer to `.env-sample` for guidance)
5. Run migrations and seed the database:
   `npx knex migrate:latest 
npx knex seed:run`
6. Start the backend server:
`npm start`
7. API available at:
`http://localhost:5050`

---

Made with ❤️ by [Betty Alemayehu](https://www.linkedin.com/in/bettyalemayehu)


