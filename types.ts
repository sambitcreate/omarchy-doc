export enum Category {
  NAVIGATION = 'Navigation',
  WINDOW_OPS = 'Window Operations',
  LAUNCHER = 'Launchers',
  GROUPS = 'Groups',
  SCRATCHPAD = 'Scratchpad'
}

export interface Keybind {
  id: string;
  keys: string[];
  description: string;
  category: Category;
  longDescription?: string;
}

export interface WindowNode {
  id: string;
  type: 'terminal' | 'browser' | 'files' | 'monitor';
  title: string;
}

export interface WorkspaceState {
  windows: WindowNode[];
  layout: 'horizontal' | 'vertical';
  activeWindowId: string | null;
}
