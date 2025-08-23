# Realworld Blog Platform

A full-featured blog platform with authentication system, built using React and TypeScript.

## Functionality

### Core Features:

- Display list of articles with pagination
- View individual articles with Markdown support
- Navigation between pages
- Responsive design

### Authentication:

- User registration
- User login
- User profile editing
- Automatic session saving
- User logout

## Technologies

- React 19
- TypeScript
- React Router DOM v6
- Axios for API requests
- React Markdown for Markdown rendering
- React Hook Form + Yup for form validation
- Husky for Git hooks
- Prettier for code formatting
- ESLint for linting

## Installation and Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd realworld-blog
```

2. Install dependencies:

```bash
npm install
```

3. Start the project:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API

The project uses RealWorld API: https://realworld.habsida.net/api

## Project Structure

```
src/
├── components/
│   ├── ArticleList.tsx      # Article list
│   ├── ArticleDetail.tsx    # Article detail page
│   ├── Header.tsx          # Header with navigation
│   └── *.css               # Component styles
├── pages/
│   ├── SignIn.tsx          # Login page
│   ├── SignUp.tsx          # Registration page
│   ├── Profile.tsx         # Profile editing page
│   └── Auth.css            # Authentication page styles
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── services/
│   └── api.ts              # API service
├── types/
│   └── index.ts            # TypeScript types
└── App.tsx                 # Main component
```

## Scripts

- `npm start` - Start development mode
- `npm run build` - Build for production
- `npm run lint` - ESLint code check
- `npm run format` - Prettier code formatting
- `npm run deploy` - Deploy to GitHub Pages

## Form Validation

### Registration:

- Email: valid email address
- Username: 3-20 characters
- Password: 6-40 characters
- Password confirmation
- Data processing agreement

### Login:

- Email: valid email address
- Password: required field

### Profile:

- Username: required field
- Email: valid email address
- Password: optional, 6-40 characters
- Avatar: valid URL

## Git Hooks

Husky is configured to automatically run linting and formatting when pushing to the repository.

## Deployment

The project is automatically deployed to GitHub Pages when running `npm run deploy`.
