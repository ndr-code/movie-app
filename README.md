# Movie Explorer App - React & TMDB Integration

Deployed at: https://movie-app-for-you.vercel.app/

![Movie App](https://media.githubusercontent.com/media/triaji-dev/portofolio-assets/refs/heads/main/movie-app/gif/preview-movie-app-for-you.gif)

## Work Details

### Title
Modern Movie Explorer Application with Real-Time TMDB Integration

### Description
A feature-rich, fully responsive movie exploration web application built with React and TypeScript, integrating The Movie Database (TMDB) API. This project showcases modern web development practices with a focus on user experience, performance optimization, and clean architecture.

**Key Features:**
- **Dynamic Hero Section**: Auto-rotating hero slider showcasing trending movies with backdrop images, titles, and descriptions
- **Movie Browsing**: Browse trending movies and new releases with infinite scroll functionality
- **Advanced Search**: Real-time search functionality with debouncing for optimal performance
- **Detailed Movie Information**: Comprehensive movie details including cast, genres, ratings, and release dates
- **Trailer Integration**: YouTube trailer playback within modal overlays
- **Favorites System**: Save and manage favorite movies with persistent local storage
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and transitions

**Technical Highlights:**
- Component-based architecture with reusable UI components
- Custom React hooks for state management and side effects
- TypeScript for type safety and better developer experience
- Tailwind CSS v4 for utility-first styling
- React Router for seamless navigation
- Axios for efficient API calls
- Performance optimizations including lazy loading and code splitting
- Intersection Observer API for infinite scroll implementation

This application demonstrates proficiency in modern front-end development, API integration, state management, and creating production-ready React applications.

### Tags
react, typescript, movie-app, tmdb-api, responsive-design, web-development, spa, tailwindcss, movie-database, entertainment, ui-ux, frontend, javascript, api-integration, trailer-player

## Skills and Tools

### Tools and Software
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Git & GitHub
- Visual Studio Code
- Figma (for design reference)
- TMDB API
- YouTube Player API
- ESLint

### Skills
- React Development
- TypeScript
- Component Architecture
- State Management
- Custom Hooks
- API Integration
- Responsive Web Design
- CSS/Tailwind CSS
- RESTful API Consumption
- Frontend Performance Optimization
- Git Version Control
- UI/UX Implementation
- Single Page Application (SPA)
- Modern JavaScript (ES6+)

## Project Details

**Industry**: Movie & Entertainment

**Category**: Web Application Development

**Project Type**: Full-Stack Frontend Application

**Duration**: Ongoing Development

**Status**: Production Ready

---

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── container/      # Complex components
│   ├── layout/         # Layout components
│   ├── pages/          # Page components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── interfaces/         # TypeScript interfaces
├── routes/             # Route configuration
├── services/           # API services
└── styles/             # Global styles
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

---

**Developer**: ndr-code  
**Repository**: [movie-app](https://github.com/ndr-code/movie-app)  
**License**: MIT
