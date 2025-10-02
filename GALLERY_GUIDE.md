# 📸 Gallery Organization Guide

This guide will help you organize and add your photos and videos to the beautiful gallery section.

## 📁 Folder Structure

Your media files should be organized in the `assets` folder:

```
assets/
├── photos/          # Store all your photos here
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── videos/          # Store all your videos here
│   ├── video1.mp4
│   ├── video2.mp4
│   └── ...
└── thumbnails/      # Auto-generated thumbnails (optional)
    ├── thumb1.jpg
    └── ...
```

## 🖼️ Adding Your Photos and Videos

### Method 1: Replace Placeholder Files
1. **Navigate to the `assets/photos/` folder**
2. **Add your photos** with descriptive names like:
   - `first_date.jpg`
   - `vacation_beach.jpg`
   - `anniversary_dinner.jpg`
   - `cute_selfie.jpg`

3. **Navigate to the `assets/videos/` folder**
4. **Add your videos** with names like:
   - `funny_moments.mp4`
   - `dancing_together.mp4`
   - `surprise_proposal.mp4`

### Method 2: Update HTML References
In the `index.html` file, find the gallery section and update the `src` attributes:

```html
<!-- Example: Replace this -->
<img src="assets/photos/photo1.jpg" alt="Beautiful moment together">

<!-- With your actual photo -->
<img src="assets/photos/first_date.jpg" alt="Our first date">
```

### Method 3: Use the Upload Feature
- Click the **"Add New Memory"** button in the gallery
- Drag and drop your files or click to browse
- Fill in the details (title, description, category, date)
- Click **"Save Memory"** to add it to the gallery

## 🎯 Gallery Categories

The gallery supports these categories for filtering:

- **📷 Photos** - General photos
- **🎥 Videos** - Video memories
- **💕 Selfies** - Cute selfies together
- **🗺️ Adventures** - Travel and adventure photos/videos

## 📝 Recommended File Formats

### Photos
- **JPEG (.jpg, .jpeg)** - Best for photos
- **PNG (.png)** - Good for images with transparency
- **WebP (.webp)** - Modern format, smaller file sizes

### Videos
- **MP4 (.mp4)** - Most compatible format
- **WebM (.webm)** - Good compression
- **MOV (.mov)** - Apple format

## 📏 Recommended Sizes

### Photos
- **Square photos**: 800x800px (for gallery grid)
- **Wide photos**: 1200x600px (for wide gallery items)
- **Large photos**: 1200x900px (for featured items)

### Videos
- **Resolution**: 1080p (1920x1080) or 720p (1280x720)
- **Duration**: Keep under 2 minutes for web performance
- **File size**: Under 50MB per video

## 🎨 Gallery Layout Types

The gallery supports different item sizes:

1. **Regular Item** (`gallery-item`) - Square, 1:1 aspect ratio
2. **Large Item** (`gallery-item-large`) - Larger, 4:3 aspect ratio
3. **Wide Item** (`gallery-item-wide`) - Wide, 2:1 aspect ratio

## 🔧 Customizing Gallery Items

To add a new gallery item, copy this template in `index.html`:

```html
<div class="gallery-item" data-category="photos selfies">
    <div class="media-container">
        <img src="assets/photos/your-photo.jpg" alt="Description" loading="lazy">
        <div class="media-overlay">
            <div class="media-info">
                <h4>Memory Title</h4>
                <p>Brief description</p>
                <span class="media-date">March 15, 2024</span>
            </div>
            <div class="media-actions">
                <button class="action-btn" onclick="openMediaModal(this)">
                    <i class="fas fa-expand"></i>
                </button>
                <button class="action-btn" onclick="downloadMedia(this)">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
    </div>
</div>
```

### For Videos:
```html
<div class="gallery-item" data-category="videos">
    <div class="media-container video-container">
        <video poster="assets/videos/video-poster.jpg" loading="lazy">
            <source src="assets/videos/your-video.mp4" type="video/mp4">
        </video>
        <div class="video-play-btn">
            <i class="fas fa-play"></i>
        </div>
        <div class="media-overlay">
            <!-- Same overlay structure as photos -->
        </div>
    </div>
</div>
```

## 🎭 Gallery Features

### ✨ Interactive Features
- **Filter by category** - Use the filter buttons to show specific types
- **Full-screen viewing** - Click the expand button to view in modal
- **Keyboard navigation** - Use arrow keys to navigate in modal
- **Download option** - Click download button to save media
- **Drag & drop upload** - Add new memories easily
- **Responsive design** - Works on all devices

### 🎮 Keyboard Shortcuts
- **Left Arrow** - Previous image/video in modal
- **Right Arrow** - Next image/video in modal
- **Escape** - Close modal
- **Space** - Play/pause video (when focused)

## 💡 Tips for Best Results

1. **Optimize images** before uploading:
   - Use tools like TinyPNG or ImageOptim
   - Aim for under 500KB per image

2. **Add meaningful descriptions**:
   - Use descriptive titles and alt text
   - Include dates and locations
   - Add emotional context

3. **Organize chronologically**:
   - Arrange photos by date
   - Create a timeline of your relationship

4. **Mix content types**:
   - Combine photos and videos
   - Use different gallery item sizes
   - Vary the categories

5. **Regular updates**:
   - Add new memories regularly
   - Update descriptions as needed
   - Remove or replace outdated content

## 🚀 Performance Tips

- **Lazy loading** is enabled by default
- **Compress videos** before uploading
- **Use appropriate file formats**
- **Consider using a CDN** for large galleries
- **Enable browser caching** for better performance

## 🔒 Privacy Considerations

- **Keep personal photos secure**
- **Don't include sensitive information** in filenames
- **Consider password protection** for private galleries
- **Be mindful of what you share** if hosting publicly

---

**Happy memory collecting! 💕**

*Remember: This gallery is about celebrating your beautiful moments together. Take your time to curate it with love and care.*

