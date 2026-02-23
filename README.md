# PCC - Pad Construction Consult and Services

> Building Excellence, Designing Dreams

A modern, responsive website for Pad Construction Consult and Services (PCC), a registered architecture and construction firm in Nigeria. Built with React and Tailwind CSS.

![PCC Website](https://img.shields.io/badge/React-18.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8) ![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Interactive Portfolio**: Filterable project gallery with before/after sliders
- **Dynamic Animations**: Smooth transitions and typing effects
- **Video Integration**: Embedded project videos showcasing construction work
- **Contact Form**: Validated form with real-time error handling
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility
- **PWA Ready**: Manifest file for progressive web app capabilities

## 🏗️ Project Structure

```
pcc/
├── public/
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── certification/
│   │   ├── constructions/
│   │   ├── designs/
│   │   ├── logos/
│   │   └── profile-images/
│   ├── components/
│   │   ├── header/
│   │   │   └── header.jsx
│   │   └── footer/
│   │       └── footer.jsx
│   ├── pages/
│   │   ├── home/
│   │   │   └── home.jsx
│   │   ├── project/
│   │   │   └── project.jsx
│   │   └── contact/
│   │       └── Contact.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pcc-website.git
cd pcc-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎨 Design System

### Color Palette

- **Gold**: `#FFD700` / `#D4AF37` - Primary accent color
- **Black**: `#000000` - Primary text and backgrounds
- **White**: `#FFFFFF` - Secondary backgrounds and text
- **Light Grey**: `#F8F8F8` - Section backgrounds

### Typography

- Font Family: System fonts (sans-serif)
- Responsive text sizing using Tailwind utilities

## 📄 Pages

### Home (`/`)
- Hero section with call-to-action buttons
- About section with company information
- Services showcase
- Project highlights with sliding animations
- CEO profile
- Client testimonials
- Contact CTA

### Projects (`/project`)
- Filterable portfolio grid (2-7 Bedroom, Duplex, Shopping Mall, Hostel, Completed)
- Interactive project cards with hover effects
- Project detail modal with:
  - Before/After slider
  - Project description
  - Location information
  - Embedded video player

### Contact (`/contact`)
- Contact form with validation
- Animated typing address display
- Google Maps integration
- Social media links
- WhatsApp floating button

## 🛠️ Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Sharp** - Image optimization (Node.js)

## 📱 Responsive Breakpoints

- Mobile: `320px+`
- Tablet: `768px+`
- Desktop: `1024px+`
- Large Desktop: `1280px+`

## 🎯 Key Features Implementation

### Image Optimization
Images are optimized using Sharp for different resolutions:
```bash
node optimize-media.js
```

### Logo Generation
Generate PWA logos from source image:
```bash
node generate-logos.js
```

## 🔧 Configuration Files

### `tailwind.config.js`
Custom Tailwind configuration with project-specific colors and utilities.

### `manifest.json`
PWA manifest for installable web app experience.

## 📈 Performance Optimizations

- Lazy loading for images
- Code splitting with React Router
- Optimized image formats and sizes
- Minimal bundle size with tree shaking
- CSS purging in production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

**Pad Construction Consult and Services**
- CEO: Preslyn Ayere
- Email: mpreslyn@gmail.com
- Phone: +234 818 142 3564 / +234 805 138 9860

## 🌐 Locations

- Lagos, Nigeria
- Port Harcourt, Nigeria
- Asaba, Nigeria

## 📞 Support

For support, email mpreslyn@gmail.com or call +234 818 142 3564.

---

**Built with ❤️ by PCC Team**
