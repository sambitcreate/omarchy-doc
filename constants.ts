import { Keybind, Category } from './types';

export const KEYBINDS: Keybind[] = [
  // Launchers
  {
    id: 'launcher',
    keys: ['Super', 'Space'],
    description: 'Application Launcher',
    category: Category.LAUNCHER,
    longDescription: 'Reveals the application launcher to start apps.'
  },
  {
    id: 'menu',
    keys: ['Super', 'Alt', 'Space'],
    description: 'Omarchy Menu',
    category: Category.LAUNCHER,
    longDescription: 'Opens the main Omarchy system menu.'
  },
  {
    id: 'theme_selector',
    keys: ['Super', 'Ctrl', 'Shift', 'Space'],
    description: 'Theme Selector',
    category: Category.LAUNCHER,
    longDescription: 'Opens the direct theme selection menu.'
  },
  {
    id: 'term',
    keys: ['Super', 'Enter'],
    description: 'Open Terminal',
    category: Category.LAUNCHER,
    longDescription: 'Spawns a new terminal window instantly.'
  },
  {
    id: 'browser',
    keys: ['Super', 'Shift', 'B'],
    description: 'Open Browser',
    category: Category.LAUNCHER,
    longDescription: 'Launches your default web browser.'
  },
  {
    id: 'monitor',
    keys: ['Super', 'Shift', 'T'],
    description: 'Activity Monitor',
    category: Category.LAUNCHER,
    longDescription: 'Opens the system activity monitor.'
  },
  {
    id: 'files',
    keys: ['Super', 'Shift', 'F'],
    description: 'File Manager',
    category: Category.LAUNCHER,
    longDescription: 'Opens the file explorer.'
  },

  // Window Ops
  {
    id: 'close',
    keys: ['Super', 'W'],
    description: 'Close Window',
    category: Category.WINDOW_OPS,
    longDescription: 'Closes the currently focused window.'
  },
  {
    id: 'float',
    keys: ['Super', 'T'],
    description: 'Toggle Float',
    category: Category.WINDOW_OPS,
    longDescription: 'Toggles the window between tiling and floating mode.'
  },
  {
    id: 'fullscreen',
    keys: ['Super', 'F'],
    description: 'Fullscreen',
    category: Category.WINDOW_OPS,
    longDescription: 'Toggles true fullscreen mode.'
  },
  {
    id: 'fullwidth',
    keys: ['Super', 'Alt', 'F'],
    description: 'Fullwidth',
    category: Category.WINDOW_OPS,
    longDescription: 'Maximizes window width but keeps the top bar.'
  },
  {
    id: 'toggle_layout',
    keys: ['Super', 'J'],
    description: 'Toggle Split',
    category: Category.WINDOW_OPS,
    longDescription: 'Toggles between vertical and horizontal stacking.'
  },
  {
    id: 'swap',
    keys: ['Super', 'Shift', 'Arrow'],
    description: 'Swap Window',
    category: Category.WINDOW_OPS,
    longDescription: 'Swaps the position of the current window with its neighbor.'
  },
  {
    id: 'move',
    keys: ['Super', 'Click'],
    description: 'Move Window',
    category: Category.WINDOW_OPS,
    longDescription: 'Hold Super and left-click drag to move a window.'
  },
  {
    id: 'resize',
    keys: ['Super', 'R-Click'],
    description: 'Resize Window',
    category: Category.WINDOW_OPS,
    longDescription: 'Hold Super and right-click drag to resize a window.'
  },

  // Navigation
  {
    id: 'focus',
    keys: ['Super', 'Arrow'],
    description: 'Move Focus',
    category: Category.NAVIGATION,
    longDescription: 'Moves focus to the window in the specified direction.'
  },
  {
    id: 'move_ws',
    keys: ['Super', 'Shift', '1-9'],
    description: 'Move to Workspace',
    category: Category.NAVIGATION,
    longDescription: 'Moves the active window to the specified workspace number.'
  },
  {
    id: 'rotate_bg',
    keys: ['Super', 'Ctrl', 'Space'],
    description: 'Rotate Background',
    category: Category.NAVIGATION,
    longDescription: 'Cycles through the available background images for the current theme.'
  },

  // Groups
  {
    id: 'group',
    keys: ['Super', 'G'],
    description: 'Toggle Group',
    category: Category.GROUPS,
    longDescription: 'Groups current windows or disassembles the group.'
  },
  {
    id: 'nav_group',
    keys: ['Super', 'Alt', 'Arrow'],
    description: 'Navigate Group',
    category: Category.GROUPS,
    longDescription: 'Switch focus between windows inside a group.'
  },
  {
    id: 'move_out_group',
    keys: ['Super', 'Alt', 'G'],
    description: 'Eject from Group',
    category: Category.GROUPS,
    longDescription: 'Moves the current window out of the group.'
  },

  // Scratchpad
  {
    id: 'toggle_scratch',
    keys: ['Super', 'S'],
    description: 'Toggle Scratchpad',
    category: Category.SCRATCHPAD,
    longDescription: 'Shows or hides the special scratchpad overlay.'
  },
  {
    id: 'move_scratch',
    keys: ['Super', 'Alt', 'S'],
    description: 'Move to Scratchpad',
    category: Category.SCRATCHPAD,
    longDescription: 'Sends the current window to the scratchpad.'
  },
];

export interface ThemeColors {
  bg: string;
  fg: string;
  accent: string;
  green: string;
  red: string;
  yellow: string;
  purple: string;
  gray: string;
  dark: string;
}

export const THEMES: Record<string, ThemeColors> = {
  'Gruvbox': {
    bg: '17 17 17', // #111111
    fg: '235 219 178', // #ebdbb2
    accent: '69 133 136', // #458588
    green: '152 151 26', // #98971a
    red: '204 36 29', // #cc241d
    yellow: '215 153 33', // #d79921
    purple: '177 98 134', // #b16286
    gray: '146 131 116', // #928374
    dark: '40 40 40', // #282828
  },
  'Cappuchin': { // Mocha
    bg: '30 30 46', // #1e1e2e
    fg: '205 214 244', // #cdd6f4
    accent: '137 180 250', // #89b4fa
    green: '166 227 161', // #a6e3a1
    red: '243 139 168', // #f38ba8
    yellow: '249 226 175', // #f9e2af
    purple: '203 166 247', // #cba6f7
    gray: '147 153 178', // #9399b2
    dark: '24 24 37', // #181825
  },
  'Catppuccin Latte': {
    bg: '239 241 245', // #eff1f5
    fg: '76 79 105', // #4c4f69
    accent: '30 102 245', // #1e66f5
    green: '64 160 43', // #40a02b
    red: '210 15 57', // #d20f39
    yellow: '223 142 29', // #df8e1d
    purple: '136 57 239', // #8839ef
    gray: '172 176 190', // #acb0be
    dark: '230 233 239', // #e6e9ef
  },
  'Everforest': {
    bg: '43 51 57', // #2b3339
    fg: '211 198 170', // #d3c6aa
    accent: '167 192 128', // #a7c080
    green: '167 192 128',
    red: '230 126 128',
    yellow: '219 188 127',
    purple: '214 153 182',
    gray: '133 146 137',
    dark: '50 60 65',
  },
  'Hackerman': {
    bg: '0 0 0',
    fg: '0 255 0',
    accent: '0 255 0',
    green: '0 255 0',
    red: '255 0 0',
    yellow: '255 255 0',
    purple: '255 0 255',
    gray: '85 85 85',
    dark: '20 20 20',
  },
  'Osaka Jade': {
    bg: '21 21 21',
    fg: '224 224 224',
    accent: '0 255 170',
    green: '0 255 170',
    red: '255 85 85',
    yellow: '255 204 85',
    purple: '189 147 249',
    gray: '80 80 80',
    dark: '40 40 40',
  },
  'Tokyo Night': {
    bg: '26 27 38',
    fg: '192 202 245',
    accent: '122 162 247',
    green: '158 206 106',
    red: '247 118 142',
    yellow: '224 175 104',
    purple: '187 154 247',
    gray: '86 95 137',
    dark: '22 22 30'
  },
  'Kanagawa': {
    bg: '31 31 40',
    fg: '220 215 186',
    accent: '126 156 216',
    green: '118 148 106',
    red: '200 64 83',
    yellow: '255 158 59',
    purple: '149 127 184',
    gray: '114 113 105',
    dark: '22 22 29'
  },
  'Nord': {
    bg: '46 52 64',
    fg: '216 222 233',
    accent: '136 192 208',
    green: '163 190 140',
    red: '191 97 106',
    yellow: '235 203 139',
    purple: '180 142 173',
    gray: '76 86 106',
    dark: '59 66 82'
  },
  'Rose Pine': {
    bg: '25 23 36',
    fg: '224 222 244',
    accent: '196 167 231',
    green: '156 207 216', // foam
    red: '235 111 146',
    yellow: '246 193 119',
    purple: '196 167 231',
    gray: '110 106 134',
    dark: '31 29 46'
  },
  'Matte Black': {
    bg: '10 10 10',
    fg: '240 240 240',
    accent: '80 80 80',
    green: '240 240 240',
    red: '180 0 0',
    yellow: '255 255 0',
    purple: '100 100 100',
    gray: '60 60 60',
    dark: '20 20 20'
  },
  'Flexoki Light': {
    bg: '255 252 240',
    fg: '16 15 15',
    accent: '32 94 166',
    green: '102 128 11',
    red: '175 48 41',
    yellow: '173 131 1',
    purple: '94 64 157',
    gray: '135 133 128',
    dark: '242 240 229'
  },
  'Ristretto': {
    bg: '44 37 37',
    fg: '253 246 227',
    accent: '189 147 249',
    green: '166 226 46',
    red: '255 85 85',
    yellow: '241 250 140',
    purple: '189 147 249',
    gray: '114 105 106',
    dark: '61 53 53'
  },
  'Ethereal': {
    bg: '20 15 25',
    fg: '240 230 250',
    accent: '220 100 250',
    green: '100 240 180',
    red: '250 80 100',
    yellow: '250 220 100',
    purple: '180 80 250',
    gray: '100 80 110',
    dark: '35 25 45'
  }
};

export interface HotkeySectionItem {
  keys: string[];
  action: string;
  clue?: string; // For emojis
}

export interface HotkeySection {
  title: string;
  description?: string;
  items: HotkeySectionItem[];
}

export const MANUAL_HOTKEYS: HotkeySection[] = [
  {
    title: "Navigating",
    items: [
      { keys: ["Super", "Space"], action: "Application launcher" },
      { keys: ["Super", "Alt", "Space"], action: "Omarchy control menu" },
      { keys: ["Super", "Escape"], action: "Lock/suspend/relaunch/restart/shutdown computer" },
      { keys: ["Super", "W"], action: "Close window" },
      { keys: ["Ctrl", "Alt", "Del"], action: "Close all windows" },
      { keys: ["Super", "T"], action: "Toggle window between tiling/floating" },
      { keys: ["Super", "O"], action: "Toggle popping window into sticky'n'floating" },
      { keys: ["Super", "F"], action: "Go full screen" },
      { keys: ["Super", "Alt", "F"], action: "Go full width for the window" },
      { keys: ["Super", "1/2/3/4"], action: "Jump to specific workspace" },
      { keys: ["Super", "Tab"], action: "Jump to next workspace" },
      { keys: ["Super", "Shift", "Tab"], action: "Jump to previous workspace" },
      { keys: ["Super", "Ctrl", "Tab"], action: "Jump to former workspace" },
      { keys: ["Super", "Shift", "1/2/3/4"], action: "Move window to workspace" },
      { keys: ["Super", "Shift", "Alt", "Arrows"], action: "Move workspaces to directional monitor" },
      { keys: ["Super", "S"], action: "Show scratchpad workspace overlay" },
      { keys: ["Super", "Alt", "S"], action: "Move window to scratchpad workspace" },
      { keys: ["Ctrl", "1/2/3/.."], action: "Jump to browser tab" },
      { keys: ["Super", "Arrow"], action: "Move focus to window in direction of arrow" },
      { keys: ["Super", "Shift", "Arrow"], action: "Swap window with another in direction of arrow" },
      { keys: ["Super", "Equal"], action: "Grow windows to the left" },
      { keys: ["Super", "Minus"], action: "Grow windows to the right" },
      { keys: ["Super", "Shift", "Equal"], action: "Grow windows to the bottom" },
      { keys: ["Super", "Shift", "Minus"], action: "Grow windows to the top" },
      { keys: ["Super", "G"], action: "Toggle window grouping" },
      { keys: ["Super", "Alt", "G"], action: "Move window out of grouping" },
      { keys: ["Super", "Alt", "Tab"], action: "Cycle between windows in grouping" },
      { keys: ["Super", "Alt", "1/2/3/4"], action: "Jump to specific window in grouping" },
      { keys: ["Super", "Alt", "Arrow"], action: "Move window into grouping in direction of arrow" },
      { keys: ["Super", "Alt", "Arrow"], action: "Move between windows inside a tiling group" },
    ]
  },
  {
    title: "Launching apps",
    items: [
      { keys: ["Super", "Return"], action: "Terminal" },
      { keys: ["Super", "Shift", "B"], action: "Browser" },
      { keys: ["Super", "Shift", "Alt", "B"], action: "Browser (private/incognito)" },
      { keys: ["Super", "Shift", "F"], action: "File manager" },
      { keys: ["Super", "Shift", "T"], action: "Activity (btop)" },
      { keys: ["Super", "Shift", "M"], action: "Music (Spotify)" },
      { keys: ["Super", "Shift", "/"], action: "Password manager (1password)" },
      { keys: ["Super", "Shift", "N"], action: "Neovim" },
      { keys: ["Super", "Shift", "C"], action: "Calendar (HEY)" },
      { keys: ["Super", "Shift", "E"], action: "Email (HEY)" },
      { keys: ["Super", "Shift", "A"], action: "AI (ChatGPT)" },
      { keys: ["Super", "Shift", "G"], action: "Messenger (Signal)" },
      { keys: ["Super", "Shift", "Ctrl", "G"], action: "Messenger (WhatsApp)" },
      { keys: ["Super", "Shift", "Alt", "G"], action: "Messenger (Google)" },
      { keys: ["Super", "Shift", "D"], action: "Docker (LazyDocker)" },
      { keys: ["Super", "Shift", "O"], action: "Obsidian" },
      { keys: ["Super", "Shift", "X"], action: "X" },
      { keys: ["Super", "Ctrl", "S"], action: "Share menu (via LocalSend)" },
    ],
    description: "Change/add bindings in ~/.config/hypr/bindings.conf."
  },
  {
    title: "Universal clipboard",
    description: "Usually on Linux, you need Ctrl + Shift + C/V to copy'n'paste in the terminal and Ctrl + C/V to do it everywhere else. These Omarchy unified clipboard hotkeys work everywhere.",
    items: [
      { keys: ["Super", "C"], action: "Copy" },
      { keys: ["Super", "X"], action: "Cut (not in terminal)" },
      { keys: ["Super", "V"], action: "Paste" },
      { keys: ["Super", "Ctrl", "V"], action: "Clipboard manager" },
    ]
  },
  {
    title: "Capture",
    description: "With screenrecordings, hit the hotkey to start, hit it again to stop. All capture options are also accessible under Capture in the Omarchy menu (Super + Alt + Space).",
    items: [
      { keys: ["Print Screen"], action: "Screenshot with editing" },
      { keys: ["Shift", "Print Screen"], action: "Screenshot straight to clipboard" },
      { keys: ["Alt", "Print Screen"], action: "Screenrecord" },
      { keys: ["Super", "Print Screen"], action: "Color picker" },
      { keys: ["Alt", "Shift", "L"], action: "Copy current URL from webapp or Chromium" },
    ]
  },
  {
    title: "Notifications",
    items: [
      { keys: ["Super", ","], action: "Dismiss latest notification" },
      { keys: ["Super", "Shift", ","], action: "Dismiss all notifications" },
      { keys: ["Super", "Ctrl", ","], action: "Toggle silencing notifications" },
      { keys: ["Super", "Alt", ","], action: "Invoke most recent notification" },
    ]
  },
  {
    title: "Style",
    description: "Extra background images live in ~/.config/omarchy/current/backgrounds. You can put more there to cycle through. Also available via Install > Background in the Omarchy menu. All style options are also accessible under Style in the Omarchy menu (Super + Alt + Space).",
    items: [
      { keys: ["Super", "Ctrl", "Shift", "Space"], action: "Pick a new theme" },
      { keys: ["Super", "Ctrl", "Space"], action: "Next background image for theme" },
      { keys: ["Super", "Backspace"], action: "Toggle transparency on a window" },
    ]
  },
  {
    title: "Toggles",
    items: [
      { keys: ["Super", "Ctrl", "I"], action: "Toggle idle/sleep prevention" },
      { keys: ["Super", "Ctrl", "N"], action: "Toggle nightlight display temperature" },
      { keys: ["Super", "Shift", "Space"], action: "Toggle the top bar" },
      { keys: ["Super", "Mute"], action: "Switch to next audio output" },
    ]
  },
  {
    title: "Ghostty Terminal",
    items: [
      { keys: ["Ctrl", "Shift", "E"], action: "New split below" },
      { keys: ["Ctrl", "Shift", "O"], action: "New split besides" },
      { keys: ["Ctrl", "Alt", "Arrows"], action: "Move between splits" },
      { keys: ["Super", "Ctrl", "Shift", "Arrows"], action: "Resize split by 10 lines" },
      { keys: ["Super", "Ctrl", "Shift", "Alt", "Arrows"], action: "Resize split by 100 lines" },
      { keys: ["Ctrl", "Shift", "T"], action: "New tab" },
      { keys: ["Ctrl", "Shift", "Arrows"], action: "Move between tabs tab" },
      { keys: ["Alt", "Numbers"], action: "Go to specific tab" },
    ]
  },
  {
    title: "File Manager",
    items: [
      { keys: ["Ctrl", "L"], action: "Go to path" },
      { keys: ["Space"], action: "Preview file (arrows navigate)" },
      { keys: ["Backspace"], action: "Go back one folder" },
    ]
  },
  {
    title: "Apple Display Brightness Control",
    description: "Apple displays have their own brightness control via asdcontrol:",
    items: [
      { keys: ["Ctrl", "F1"], action: "Turn down brightness" },
      { keys: ["Ctrl", "F2"], action: "Turn up brightness" },
      { keys: ["Ctrl", "Shift", "F2"], action: "Turn up brightness to maximum" },
    ]
  },
  {
    title: "Neovim (w/ lazyvim)",
    description: "See all the Neovim hotkeys configured by LazyVim.",
    items: [
      { keys: ["Space"], action: "Show command options" },
      { keys: ["Space", "Space"], action: "Open file via fuzzy search" },
      { keys: ["Space", "E"], action: "Toggle sidebar" },
      { keys: ["Space", "G", "G"], action: "Show git controls" },
      { keys: ["Space", "S", "G"], action: "Search file content" },
      { keys: ["Ctrl", "W", "W"], action: "Jump between sidebar and editor" },
      { keys: ["Ctrl", "Left/right arrow"], action: "Change size of sidebar" },
      { keys: ["Shift", "H"], action: "Go to left file tab" },
      { keys: ["Shift", "L"], action: "Go to right file tab" },
      { keys: ["Space", "B", "D"], action: "Close file tab" },
      // Sidebar specifics
      { keys: ["A"], action: "Add new file in parent dir (while in sidebar)" },
      { keys: ["Shift", "A"], action: "Add new subdir in parent dir (while in sidebar)" },
      { keys: ["D"], action: "Delete highlighted file/dir (while in sidebar)" },
      { keys: ["M"], action: "Move highlighted file/dir (while in sidebar)" },
      { keys: ["R"], action: "Rename highlighted file/dir (while in sidebar)" },
      { keys: ["?"], action: "Show help for all commands (while in sidebar)" },
    ]
  },
  {
    title: "Quick Emojis",
    description: "You can use Super + Ctrl + E to show a complete emoji picker that'll put the selection on the clipboard or you can use these quick access options.",
    items: [
      { keys: ["CapsLock", "M", "S"], action: "😄", clue: "smile" },
      { keys: ["CapsLock", "M", "C"], action: "😂", clue: "cry" },
      { keys: ["CapsLock", "M", "L"], action: "😍", clue: "love" },
      { keys: ["CapsLock", "M", "V"], action: "✌️", clue: "victory" },
      { keys: ["CapsLock", "M", "H"], action: "❤️", clue: "heart" },
      { keys: ["CapsLock", "M", "Y"], action: "👍", clue: "yes" },
      { keys: ["CapsLock", "M", "N"], action: "👎", clue: "no" },
      { keys: ["CapsLock", "M", "F"], action: "🖕", clue: "fuck" },
      { keys: ["CapsLock", "M", "W"], action: "🤞", clue: "wish" },
      { keys: ["CapsLock", "M", "R"], action: "🤘", clue: "rock" },
      { keys: ["CapsLock", "M", "K"], action: "😘", clue: "kiss" },
      { keys: ["CapsLock", "M", "E"], action: "🙄", clue: "eyeroll" },
      { keys: ["CapsLock", "M", "P"], action: "🙏", clue: "pray" },
      { keys: ["CapsLock", "M", "D"], action: "🤤", clue: "drool" },
      { keys: ["CapsLock", "M", "M"], action: "💰", clue: "money" },
      { keys: ["CapsLock", "M", "X"], action: "🎉", clue: "xellebrate" },
      { keys: ["CapsLock", "M", "1"], action: "💯", clue: "100%" },
      { keys: ["CapsLock", "M", "T"], action: "🥂", clue: "toast" },
      { keys: ["CapsLock", "M", "O"], action: "👌", clue: "ok" },
      { keys: ["CapsLock", "M", "G"], action: "👋", clue: "greeting" },
      { keys: ["CapsLock", "M", "A"], action: "💪", clue: "arm" },
      { keys: ["CapsLock", "M", "B"], action: "🤯", clue: "blowing" },
    ]
  },
  {
    title: "Quick Completions",
    description: "You can add more of your own by editing ~/.XCompose, then running omarchy-restart-xcompose in the terminal to get the changes picked up.",
    items: [
      { keys: ["CapsLock", "Space", "Space"], action: "— (mdash)" },
      { keys: ["CapsLock", "Space", "N"], action: "Your name (as entered on setup)" },
      { keys: ["CapsLock", "Space", "E"], action: "Your email (as entered on setup)" },
    ]
  }
];