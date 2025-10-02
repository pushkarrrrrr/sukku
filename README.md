# 💕 Love Story Website

A beautiful, interactive romantic website built with modern web technologies to showcase your love story through photos, videos, and heartfelt quotes.

## ✨ Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern Animations**: Smooth scroll animations using AOS (Animate On Scroll)
- **Interactive Gallery**: Image carousel with Swiper.js
- **Video Integration**: Embedded video player support
- **Loading Screen**: Beautiful animated loading experience
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Image Modal**: Click to view images in full screen
- **Love Counter**: Real-time counter showing time together
- **Floating Hearts**: Animated background elements
- **Smooth Scrolling**: Seamless navigation between sections
- **Typography**: Beautiful Google Fonts (Inter & Playfair Display)
- **Icons**: Font Awesome icons throughout
- **Performance Optimized**: Throttled scroll events and lazy loading

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: Interactive functionality without heavy frameworks
- **AOS**: Animate On Scroll library for scroll animations
- **Swiper.js**: Touch slider for image gallery
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter & Playfair Display)

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Node.js (optional, for development server)

### Installation

1. **Clone or download** this repository
2. **Customize the content**:
   - Replace placeholder images with your actual photos
   - Update the text content with your personal story
   - Modify the start date in `script.js` for the love counter
   - Add your names in the placeholders

### Running the Website

#### Option 1: Simple File Opening
- Open `index.html` directly in your web browser

#### Option 2: Development Server (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Option 3: Using Live Server
```bash
# Install live-server globally
npm install -g live-server

# Start server
live-server --port=3000
```

## 📝 Customization Guide

### 1. Personal Information
- **Names**: Replace `[Girlfriend's Name]` and `[Your Name]` placeholders
- **Start Date**: Update the `startDate` variable in `script.js`
- **Story Content**: Modify quotes and descriptions in `index.html`

### 2. Images
Replace the placeholder images with your own:
- **Hero Section**: Update image URLs in the memory sections
- **Gallery**: Replace Unsplash URLs with your photo URLs
- **Recommended sizes**: 
  - Memory photos: 600x400px
  - Gallery photos: 400x400px (square)

### 3. Videos
- Replace the video placeholder with actual video embed code
- Supports YouTube, Vimeo, or direct video files
- Update the video description text

### 4. Colors & Styling
Customize the color scheme in `styles.css`:
```css
:root {
  --love-pink: #FFC0CB;     /* Main pink color */
  --love-cream: #FAF9F6;    /* Background color */
  --love-dark: #333333;     /* Text color */
  --love-accent: #FF69B4;   /* Accent color */
}
```

### 5. Fonts
Change fonts by updating the Google Fonts import in `index.html` and CSS variables in `styles.css`.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Sections Overview

1. **Hero Section**: Welcome message with floating hearts animation
2. **The Beginning**: First memory with quote and photo
3. **Adventures**: Video section with story content
4. **Memories**: Interactive photo gallery with Swiper
5. **Future**: Final message with love counter

## 🔧 Development Scripts

```bash
npm run start    # Start development server
npm run dev      # Start with file watching
npm run build    # Build for production
npm run serve    # Serve built files
npm run lint     # Check JavaScript for errors
npm run format   # Format code with Prettier
```

## 📦 File Structure

```
love-story-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── package.json        # Project configuration
├── README.md          # This file
└── assets/            # (Create this folder for your images/videos)
    ├── images/
    └── videos/
```

## 🎯 Performance Tips

- **Optimize Images**: Compress images before uploading (use tools like TinyPNG)
- **Video Hosting**: Consider hosting videos on YouTube/Vimeo for better performance
- **CDN**: The project uses CDN links for libraries (AOS, Swiper, Font Awesome)

## 💡 Customization Ideas

- Add more memory sections
- Include a timeline of your relationship
- Add a music player with your favorite songs
- Create a photo slideshow background
- Add a contact form for messages
- Include social media links
- Add a guest book feature

## 🐛 Troubleshooting

### Images not loading
- Check image URLs are correct and accessible
- Ensure images are in the correct format (jpg, png, webp)
- Verify image paths if using local files

### Animations not working
- Check that AOS library is loaded
- Ensure JavaScript is enabled in browser
- Verify no console errors

### Mobile issues
- Test on actual devices, not just browser dev tools
- Check viewport meta tag is present
- Verify touch events work on mobile

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own love story!

## 💖 Credits

- **Design Inspiration**: Modern romantic web design trends
- **Images**: Unsplash (replace with your own)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts
- **Libraries**: AOS, Swiper.js

---

**Made with ❤️ for love stories everywhere**

*Remember to replace all placeholder content with your personal information and photos to make this website truly yours!*

