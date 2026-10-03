# Kshitij Raj — Personal Portfolio & Showcase

A responsive, high-performance personal portfolio website built with clean Vanilla HTML5, modern CSS3, and JavaScript.

## 🚀 Features

- **Cyber-Glass Luxury Design**: Ambient animated gradient glows, dark & light theme modes with persistent local storage.
- **Dynamic HTML5 Canvas**: Interactive starry constellation particle background that dynamically responds to window resize.
- **Bento Grid Architecture**: Showcasing background, location radar, philosophical ethos, and core competencies.
- **Live Filterable Projects**: Filter projects by Data Analytics, Web Development, and Python/ML with interactive detail modals.
- **Interactive Micro-Interactions**:
  - Rotating typewriter effect in the hero section.
  - Animated statistic number counters triggered on scroll via `IntersectionObserver`.
  - Animated skill progression bars.
  - 3D card tilt effect responsive to mouse movement.
  - Interactive contact form with client-side validation and responsive alert toasts.
- **Zero Heavy Dependencies**: 100% lightweight Vanilla CSS and JavaScript for fast load times and clean code structure.
- **SEO & Accessibility**: Semantic HTML5 landmark tags, single `<h1>` hierarchy, meta tags, OpenGraph previews, and ARIA attributes.

## 📂 Project Structure

```text
Kshitij-Portfolio/
├── index.html              # Main homepage & showcase
├── 404.html                # Custom error page
├── README.md               # Documentation
└── assets/
    ├── css/
    │   └── style.css       # Unified design tokens, glassmorphism, responsive styles
    └── js/
        └── main.js         # Interactive canvas, theme switcher, modal & animations
```

## 🛠️ Local Development

Open `index.html` directly in any modern browser, or run a local static server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Visit `http://localhost:8000` to view the portfolio.
