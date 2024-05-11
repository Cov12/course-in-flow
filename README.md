# Course in Flow
Course In Flow is an innovative web application that harnesses the power of Artificial Intelligence (AI) to streamline the process of managing courses, including enrollment, scheduling, and resource allocation. By integrating with external services like Unsplash and YouTube, Course In Flow automatically enhances course content by retrieving royalty-free or stock photos related to the course topics and retrieving YouTube videos related to the course content. Additionally, it utilizes AI to automatically generate summaries based on YouTube video transcriptions and generate chapters and quizzes for each course chapter. It aims to provide an intuitive interface for both instructors and students, enhancing the overall learning experience.

## Features
- **Automated Summary Generation:**: Generates summaries based on YouTube video transcriptions.
- **Automated Chapter and Quiz Generation:**: Generates chapters and quizzes for each course chapter.
- **User Authentication**: Users can sign up, log in, and log out securely using Google OAuth 2.0.
- **Course Management**: Instructors can create, update, and delete courses.
- **Enrollment**: Students can enroll in courses and view their enrolled courses.
- **Scheduling**: Users can view course schedules and manage their availability.
- **Unsplash Integration**: Automatically retrieves royalty-free or stock photos related to the course topics.
- **YouTube Integration:**: Automatically retrieves YouTube videos related to the course content.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Stripe**: Payment processing API for online transactions.
- **Redux**: State management library for managing application state.
- **React Router**: Declarative routing for React applications.
- **Material-UI**: React components that implement Google's Material Design.
- **Axios**: Promise-based HTTP client for making AJAX requests.
- **Tailwind CSS**: A utility-first CSS framework for styling web applications.
- **Next.js**: React framework for building server-side rendered and statically generated applications.
- **Googleapis**: Google APIs client library for Node.js.
- **MySQL**: SQL database for storing application data.
- **Prisma**: Open source Node.js and TypeScript ORM.
- **JWT**: JSON Web Token for authentication and authorization.
- **bcrypt**: Password hashing library for securing user passwords.
- **Prisma**: Database ORM for data modeling, automated migrations, and type-safety.
- **NextAuth.js Prisma Adapter**: Prisma adapter for NextAuth.js authentication library.
- **YouTube Transcript**: Library for fetching transcripts of YouTube videos.
- **Unsplash-js**: JavaScript wrapper for the Unsplash API.

### AI
- **OpenAI**: AI platform for natural language processing and other AI tasks.
- **Langchain**: Library for natural language processing and translation.

## Getting Started

To run Course in Flow locally, follow these steps:

1. Clone this repository: `git clone https://github.com/Cov12/course-in-flow.git`
2. Navigate to the project directory: `cd course-in-flow`
3. Install dependencies for both the frontend and backend:
   - Frontend|Backend: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the `root` directory and define the following variables:
     ```
     PORT=3000
     DATABASE_URL
     NEXTAUTH_SECRET
     GOOGLE_CLIENT_ID
     GOOGLE_CLIENT_SECRET
     OPENAI_API_KEY
     UNSPLASH_API_KEY
     YOUTUBE_API_KEY
     STRIPE_API_KEY
     ```
5. Start the application:
   - npm run dev
6. Access the application in your browser at `http://localhost:3000`.

## Important Notes

- Make sure to replace placeholders in the environment variables with your actual configuration details.
- This application is still under development and may contain bugs or incomplete features.
- Feel free to contribute to the project by submitting bug fixes, feature enhancements, or suggestions via GitHub issues and pull requests.

## License

Course in Flow is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
