# A&S Design Studio Website

A premium multi-page static website for The A&S Design Studio, an architectural practice specializing in retail and residential design.

## Project Structure

```
├── assets/
│   ├── css/
│   │   ├── main.css           # Core styles and variables
│   │   ├── components.css     # Reusable component styles
│   │   ├── pages.css          # Page-specific styles
│   │   ├── icons.css          # Custom icon system
│   │   └── responsive.css     # Media queries and responsive design
│   ├── js/
│   │   ├── main.js           # Core functionality and animations
│   │   ├── portfolio.js      # Portfolio filtering and gallery
│   │   └── contact.js        # Form handling and validation
│   ├── images/
│   │   ├── projects/         # Project portfolio images
│   │   ├── team/            # Team member photos
│   │   ├── general/         # General site imagery (logos, favicon)
│   │   └── icons/           # Custom icon files
│   └── icons/               # Icon assets
├── index.html               # Homepage
├── favicon.svg             # Site favicon
└── styles.css              # Legacy CSS (to be removed)
```

## Features

### Enhanced Project Structure
- Modular CSS architecture with separate files for different concerns
- Organized JavaScript modules for specific functionality
- Structured asset organization for better maintainability
- Optimized image organization by category

### CSS Architecture
- **main.css**: Core styles, CSS variables, typography, and base animations
- **components.css**: Reusable components (buttons, cards, forms, navigation)
- **pages.css**: Page-specific styles (hero, about, projects, contact, footer)
- **icons.css**: Custom CSS-based icon system
- **responsive.css**: Mobile-first responsive design with comprehensive breakpoints

### JavaScript Modules
- **main.js**: Core functionality including header effects, animations, smooth scrolling, and navigation
- **portfolio.js**: Portfolio filtering, search, lightbox gallery, and lazy loading
- **contact.js**: Form validation, submission handling, and multi-step form support

### Design System
- Premium earthy color palette with CSS custom properties
- Consistent spacing system using CSS variables
- Typography scale with Playfair Display and Inter fonts
- Component-based architecture for maintainability

### Performance Optimizations
- Modular CSS loading for better caching
- Lazy loading for images
- Optimized animations with Intersection Observer
- Debounced and throttled event handlers
- Passive event listeners where appropriate

## Development

### CSS Variables
The design system uses CSS custom properties for consistent theming:

```css
:root {
  --primary-color: #1B3B36;    /* Deep Forest Green */
  --secondary-color: #A67C52;  /* Warm Terracotta */
  --accent-color: #E8DDD4;     /* Warm Stone */
  --background-color: #FEFCF8; /* Warm White */
  --text-color: #2C2C2C;       /* Charcoal */
  --text-light: #6B6B6B;       /* Light Gray */
  --surface-color: #F7F4F0;    /* Light Stone */
  --border-color: #E0D5C7;     /* Soft Beige */
  --shadow-color: rgba(27, 59, 54, 0.1); /* Soft green shadow */
}
```

### Component System
Reusable components include:
- Navigation with mobile hamburger menu
- Project cards with hover effects and overlays
- Service cards with icons and features
- Form components with validation states
- Button variations (primary, secondary, outline)
- Filter buttons with smooth animations

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Large Desktop: > 1024px

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for JavaScript features
- CSS fallbacks for older browsers
- Accessibility compliance (WCAG 2.1 AA)

## Usage

### Adding New Projects
1. Add project images to `assets/images/projects/`
2. Update the project cards in `index.html` or portfolio page
3. Use the existing project card structure with appropriate classes

### Customizing Styles
1. Modify CSS variables in `main.css` for global changes
2. Add new components to `components.css`
3. Page-specific styles go in `pages.css`
4. Responsive adjustments in `responsive.css`

### JavaScript Functionality
- Portfolio filtering is automatic for elements with `filter-btn` and `project-card` classes
- Contact forms with class `contact-form` get automatic validation
- Animations are applied to elements with `fade-up`, `slide-in-left`, `slide-in-right` classes

## Future Enhancements
- Additional page templates (about, services, portfolio, project detail)
- CMS integration for easy content management
- Advanced image optimization and WebP support
- Service worker for offline functionality
- Enhanced SEO with structured data markup

## License
© 2025 The A&S Design Studio. All rights reserved.