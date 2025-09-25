# Opportunities Alert System - Frontend

A React + TypeScript + Chakra UI frontend for the departmental opportunities alert system.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety and better DX
- **Chakra UI v3** - Component library and design system
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **date-fns** - Date manipulation utilities

## Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Text.tsx
│   │   └── Heading.tsx
│   ├── molecules/       # Composed components
│   │   ├── FormField.tsx
│   │   └── OpportunityCard.tsx
│   ├── organisms/       # Complex components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── templates/       # Layout components
│   │   └── PageLayout.tsx
│   └── ui/             # Chakra UI provider setup
│       ├── provider.tsx
│       └── color-mode.tsx
├── pages/              # Route components
│   ├── Dashboard.tsx
│   ├── OpportunitiesList.tsx
│   ├── OpportunityDetail.tsx
│   ├── OpportunityForm.tsx
│   ├── UserProfile.tsx
│   └── Settings.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── api/                # API client functions (to be added)
├── hooks/              # Custom React hooks (to be added)
└── utils/              # Utility functions (to be added)
```

## Component Architecture

The project follows **Atomic Design** principles:

### Atoms
Basic building blocks with consistent props and styling:
- `Button` - All button variants with loading states
- `Input` - Form inputs with validation styling
- `Badge` - Status and type indicators
- `Text` - Typography with semantic styles
- `Heading` - Hierarchical headings

### Molecules
Composed components that combine atoms:
- `FormField` - Input + label + validation + help text
- `OpportunityCard` - Complete opportunity display with actions

### Organisms
Complex components that form distinct sections:
- `Header` - Navigation and branding
- `Footer` - Site footer with links

### Templates
Layout components that define page structure:
- `PageLayout` - Standard page wrapper with header/footer

## Features

### Current Implementation
- ✅ TypeScript setup with strict mode
- ✅ Chakra UI v3 integration with custom theme
- ✅ React Router setup with all routes
- ✅ Responsive navigation header
- ✅ Dark/light mode toggle
- ✅ Component library with atomic design
- ✅ Type-safe props for all components
- ✅ Accessibility-first approach

### Planned Features
- 🔄 API integration with Django backend
- 🔄 Form handling with validation
- 🔄 Real-time opportunity management
- 🔄 User authentication
- 🔄 Notification preferences
- 🔄 Search and filtering
- 🔄 Personal notes on opportunities
- 🔄 Deadline countdown and alerts

## Development

### Prerequisites
- Node.js 20+
- Docker (for containerized development)

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build
```

### Docker Development
The frontend runs in a Docker container as part of the full-stack setup:

```bash
# From project root
docker-compose up --build

# Frontend will be available at http://localhost:5173
```

## API Integration

The frontend is designed to integrate with the Django REST API:

### Endpoints
- `GET /api/opportunities/` - List opportunities
- `POST /api/opportunities/` - Create opportunity
- `GET /api/opportunities/:id/` - Get opportunity details
- `PUT /api/opportunities/:id/` - Update opportunity
- `DELETE /api/opportunities/:id/` - Delete opportunity
- `GET /api/users/profiles/` - List user profiles
- `POST /api/users/profiles/` - Create/update user profile
- `GET /api/users/notes/` - Get user notes on opportunities
- `POST /api/users/notes/` - Add/update user notes

### Type Safety
All API responses are typed using TypeScript interfaces defined in `src/types/index.ts`.

## Accessibility

The application follows WCAG 2.1 AA guidelines:
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility
- Focus management

## Responsive Design

The UI adapts to different screen sizes:
- **Mobile** (< 768px): Single column, simplified navigation
- **Tablet** (768px - 1024px): Two columns, condensed layout
- **Desktop** (> 1024px): Full layout with all features

## Theme Customization

The app uses Chakra UI's semantic tokens for consistent theming:
- Light/dark mode support
- Consistent color palette
- Responsive typography scale
- Standardized spacing system

## Next Steps

1. **API Integration**: Connect to Django backend
2. **Form Implementation**: Build opportunity and profile forms
3. **State Management**: Add React Query or similar for server state
4. **Authentication**: Implement user login/logout
5. **Real-time Features**: Add WebSocket support for live updates
6. **Testing**: Add unit and integration tests
7. **Performance**: Optimize bundle size and loading

## Contributing

1. Follow the established component structure
2. Use TypeScript for all new code
3. Ensure accessibility compliance
4. Test on multiple screen sizes
5. Follow the existing naming conventions