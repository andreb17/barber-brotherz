# Barber Brotherz Media Assets

This directory contains all media assets for the Barber Brotherz website.

## Directory Structure

```
assets/
├── images/       # For all image files (PNG, JPG, WEBP)
└── videos/       # For all video files (MP4, WEBM)
```

## Image Guidelines

- Recommended formats: JPG, PNG, or WEBP
- Maximum file size: 2MB per image
- Recommended dimensions:
  - Gallery images: 800x600px
  - Service images: 600x400px
  - Background images: 1920x1080px
- Use descriptive filenames (e.g., `classic-fade-haircut.jpg`, `beard-trim-service.jpg`)

## Video Guidelines

- Recommended formats: MP4 or WEBM
- Maximum file size: 10MB per video
- Recommended dimensions: 1280x720px (720p)
- Keep videos under 30 seconds for optimal loading
- Use descriptive filenames (e.g., `haircut-timelapse.mp4`, `shop-tour.mp4`)

## Usage in HTML

Example of how to use these assets in your HTML:

```html
<!-- For images -->
<img src="assets/images/your-image.jpg" alt="Description of image">

<!-- For videos -->
<video controls>
  <source src="assets/videos/your-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

## Image Optimization Tips

1. Compress images before uploading using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)

2. Use appropriate image formats:
   - JPG: for photographs
   - PNG: for images with transparency
   - WEBP: for modern browsers (with JPG fallback)

## Video Optimization Tips

1. Compress videos before uploading using tools like:
   - [HandBrake](https://handbrake.fr/)
   - [FFmpeg](https://ffmpeg.org/)

2. Consider providing multiple formats:
   - MP4 (H.264) for wide compatibility
   - WEBM for better compression
