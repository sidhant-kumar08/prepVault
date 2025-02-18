# PrepVault

**PrepVault** is an interview experience-sharing platform where users can share their interview experiences, upvote/downvote posts, and access valuable learning resources like YouTube video links. It helps job seekers prepare efficiently by learning from real interview experiences.

## Features
- Share and explore interview experiences.
- Upvote/downvote interview posts.
- Explore learning resources for different skills like Devops, Fullstack etc.
- Ai integration for creating high quality interview experience post.

## Technologies Used
- **Frontend:** Next.js, TypeScript, React
- **Backend:** Next.js (API Routes)
- **Database:** MongoDB with Mongoose
- **Authentication:** Auth.js (NextAuth)
- **Deployment:** Vercel

## Screenshots
![Screenshot 2025-02-12 140554](https://github.com/user-attachments/assets/e66001d3-2c4a-43d0-821d-8640fcae2ba8)
![Screenshot 2025-02-12 140822](https://github.com/user-attachments/assets/557f241a-d3ef-4801-85ed-3695301bb089)
![Screenshot 2025-02-12 140753](https://github.com/user-attachments/assets/90116ece-0897-4699-b91f-ea3a33bab3cd)
![Screenshot 2025-02-12 140715](https://github.com/user-attachments/assets/5551af7f-17f1-4680-aa6d-4ec88323b73e)


## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/sidhant-kumar08/prepVault.git
    ```
2. Navigate to the project folder:
    ```bash
    cd prepvault
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables for database connection, authentication, and gemini.
5. Run the app:
    ```bash
    npm run dev
    ```


## Running the project using Docker

1. Clone the repository
     ```bash
    git clone https://github.com/sidhant-kumar08/prepVault.git
    ```
2. Navigate to the project folder:
    ```bash
    cd prepvault
    ```
    
3. Build the Docker Image
   ```bash
   docker build -t prepvault
   ```

4. Run the Container
   ```bash
   docker run -p 3000:3000 prepvault
   ```
    

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
