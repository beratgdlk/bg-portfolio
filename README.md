# Berat G. Web Portfolio

This is my personal portfolio website, built using **React.js, TypeScript, SASS, and Vite**. It serves as a central hub where visitors can explore my skills, projects, and professional journey through an interactive terminal-inspired interface.

## Features

- **Interactive Terminal UI** – Terminal-inspired interface for a unique browsing experience
- **GitHub Activity Integration** – Real-time GitHub contributions display
- **Responsive Design** – Optimized for desktop and mobile devices
- **Modern Stack** – Built with React.js, TypeScript, SASS, and Vite
- **Syntax Highlighting** – Custom code snippets with syntax highlighting
- **Dark Mode** – Eye-friendly dark theme with neon accents

## Technologies Used

- **React.js** – Component-based UI development
- **TypeScript** – Strongly typed JavaScript for maintainability
- **SASS** – Advanced styling with modular SCSS files
- **Vite** – Fast build tool and development server for optimal performance
- **Context API** – State management for profile data

## Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/beratgdlk/bg-portfolio.git
   ```

2. Navigate to the project folder:
   ```bash
   cd bg-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the project in your browser at `http://localhost:5173` (default Vite port).

6. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
bg-portfolio/
├── src/
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   ├── vite-env.d.ts        # Vite environment types
│   ├── components/          # Reusable UI components
│   │   ├── Navbar/          # Navigation components
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.scss
│   │   ├── Terminal/        # Terminal UI components
│   │   │   ├── Terminal.tsx
│   │   │   └── Terminal.scss
│   ├── context/            # React Context providers
│   │   └── ProfileContext.ts
│   ├── pages/              # Main application pages
│   │   ├── AboutMe.tsx
│   │   ├── AboutMe.scss
│   │   ├── Projects.tsx
│   │   ├── Projects.scss
│   │   ├── ContactMe.tsx
│   │   └── ContactMe.scss
│   ├── styles/             # Global and modular SASS styles
│   │   ├── main.scss
│   │   ├── mixins.scss
│   │   └── variables.scss
│   ├── types/              # TypeScript type definitions
├── public/                 # Static assets
├── dist/                   # Build output
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
└── vite.config.ts          # Vite configuration
```

## Page Overview

1. **Home** - Terminal-inspired welcome page with interactive experience
2. **About Me** - Personal information, skills, and professional experience
3. **Projects** - Showcase of completed projects with GitHub activity integration
4. **Contact** - Contact form and social media links

## Key Components

- **Terminal** - Interactive command-line interface with custom syntax highlighting
- **Navbar** - Responsive navigation with animated links
- **GitHub Activity** - Visual representation of GitHub contributions

## Contributing

This is a personal project, but if you'd like to suggest improvements:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Improved UI components"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

MIT License is a permissive license that allows for reuse with few restrictions. It permits:
- Commercial use
- Modification
- Distribution
- Private use

While requiring:
- License and copyright notice inclusion

## Contact

- **Portfolio:** [Live Site](https://jocular-unicorn-731246.netlify.app/#)
- **GitHub:** [beratgdlk](https://github.com/beratgdlk)
- **Email:** beratgdlk@gmail.com
- **LinkedIn:** [Berat G.](https://www.linkedin.com/in/beratg/)
