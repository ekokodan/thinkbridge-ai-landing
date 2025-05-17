
# ThinkBridge Landing Page

A modern, responsive landing page for ThinkBridge, an AI-powered educational platform that offers personalized learning experiences.

## Features

- **HeroSection** - Main call-to-action with "Book a Tutor" and "Join Waitlist" buttons
- **AboutThinkBridge** - 3-column feature grid highlighting key platform benefits
- **UpcomingNews** - Latest announcements and upcoming features
- **TutoringBanner** - Highlighting available subjects for private tutoring
- **SubjectsOffered** - Comprehensive list of available subjects
- **TestimonialsCarousel** - Auto-advancing customer quotes
- **FAQAccordion** - Common questions and answers
- **Responsive Design** - Optimized for all devices from mobile to desktop

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and bundling
- TailwindCSS for styling
- shadcn/ui for accessible UI components
- React Router for navigation
- React Query for data fetching
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm i
# OR
pnpm i

# Start the development server
npm run dev
# OR
pnpm dev
```

The app will be available at http://localhost:8080

## Component Structure

```
src/
├── api/                # Mock API services
├── components/         # UI components
│   ├── ui/             # shadcn UI components
│   ├── HeroSection.tsx
│   ├── AboutThinkBridge.tsx
│   ├── UpcomingNews.tsx
│   ├── TutoringBanner.tsx
│   ├── SubjectsOffered.tsx
│   ├── TestimonialsCarousel.tsx
│   ├── FAQAccordion.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   └── BookingPage.tsx # Placeholder for future booking flow
└── App.tsx             # Main app component with routes
```

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Color contrast ratios meet accessibility standards
- Skip-to-content link
- ARIA labels for interactive elements
- Keyboard navigation support

## Tests

Run tests with:

```bash
npm test
# OR
pnpm test
```

## License

This project is licensed under the MIT License.
