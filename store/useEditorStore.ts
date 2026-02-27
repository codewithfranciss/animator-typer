import { create } from 'zustand';

interface EditorState {
  code: string;
  setCode: (code: string) => void;
  cursorType: 'Block' | 'Line' | 'Underline';
  setCursorType: (type: 'Block' | 'Line' | 'Underline') => void;
  speed: string;
  setSpeed: (speed: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  code: `import { useState, useEffect } from 'react'

interface FrameConfig {
  width: number
  height: number
  fps: number
}

export function useRecorder(config: FrameConfig) {
  const [frames, setFrames] = useState<string[]>([])
  const [isActive, setIsActive] = useState(false)

  // capture each keystroke as a frame
  useEffect(() => {
    const interval = 1000 / config.fps
    return capture(interval)
  }, [config])
}`,
  setCode: (code) => set({ code }),
  cursorType: 'Block',
  setCursorType: (cursorType) => set({ cursorType }),
  speed: '1x',
  setSpeed: (speed) => set({ speed }),
  theme: 'Dracula',
  setTheme: (theme) => set({ theme }),
  language: 'TypeScript',
  setLanguage: (language) => set({ language }),
}));
