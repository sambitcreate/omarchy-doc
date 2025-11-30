<div align="center">
<img width="1200" height="475" alt="Omarchy Manual Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Omarchy Keybind Manual

An interactive, web-based manual for Omarchy Linux distribution's keyboard shortcuts and keybindings. Built with React, TypeScript, and Tailwind CSS, this application provides a comprehensive guide to navigating and using Omarchy entirely through keyboard commands.

## 🚀 Features

- **Interactive Workspace Simulator**: Practice keyboard shortcuts in a simulated environment
- **Comprehensive Keybinding Reference**: Search and filter through all available shortcuts
- **14 Beautiful Themes**: Choose from Gruvbox, Catppuccin, Tokyo Night, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Search**: Find specific commands instantly
- **Category Filtering**: Browse shortcuts by functionality
- **Animated UI**: Smooth transitions and micro-interactions

## 📋 Sections

### Getting Started
- Installation instructions and system requirements
- Hardware recommendations (wired/2.4GHz keyboards)
- Troubleshooting and help resources

### Navigation
- Interactive playground for testing shortcuts
- Complete keybinding reference with search
- Category-based filtering (Navigation, Window Operations, Launchers, Groups, Scratchpad)

### Themes
- Visual preview of all 14 available themes
- Theme switching functionality
- Background image rotation instructions

### Hotkeys
- Comprehensive hotkey reference organized by category
- Specialized sections for different applications (Terminal, File Manager, Neovim)
- Quick emoji shortcuts and completions

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Fonts**: JetBrains Mono

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Local Development

1. **Clone repository**:
   ```bash
   git clone https://github.com/sambitcreate/omarchy-doc.git
   cd omarchy-doc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000`

### Production Build

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Preview the build**:
   ```bash
   npm run preview
   ```

## 🎨 Available Themes

The application includes 14 carefully crafted themes:

- **Gruvbox** - Classic retro computing colors
- **Catppuccin Mocha** - Modern dark theme
- **Catppuccin Latte** - Light variant
- **Tokyo Night** - Elegant dark theme
- **Nord** - Cool, minimalist colors
- **Rose Pine** - Soft, muted palette
- **Everforest** - Nature-inspired greens
- **Hackerman** - Classic green terminal
- **Osaka Jade** - Vibrant cyan accents
- **Kanagawa** - Japanese-inspired
- **Matte Black** - Minimalist dark
- **Flexoki Light** - Warm light theme
- **Ristretto** - Coffee-inspired browns
- **Ethereal** - Mystical purples

## ⌨️ Key Categories

### Navigation
- Window focus management
- Workspace switching
- Application launching

### Window Operations
- Window manipulation
- Layout toggling
- Fullscreen controls

### Launchers
- Application shortcuts
- System tools
- Utility programs

### Groups
- Window grouping
- Group navigation
- Window management

### Scratchpad
- Overlay management
- Quick access windows
- Temporary workspace

## 🎯 Usage Tips

### Keyboard Shortcuts in App
- Press `/` to quickly focus the search bar
- Use the interactive simulator to practice shortcuts
- Click on theme cards to preview different color schemes

### Simulator Controls
- **Super + Enter**: Open terminal
- **Super + Shift + B**: Open browser
- **Super + W**: Close active window
- **Super + J**: Toggle layout
- **Arrow Keys**: Navigate between windows

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


