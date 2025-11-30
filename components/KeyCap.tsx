import React from 'react';
import { motion } from 'framer-motion';

interface KeyCapProps {
  label: string;
  isPressed?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const KeyCap: React.FC<KeyCapProps> = ({ label, isPressed = false, size = 'md' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs px-1.5 py-0.5 min-w-[1.5rem]';
      case 'lg': return 'text-lg px-4 py-2 min-w-[3rem]';
      case 'md':
      default: return 'text-sm px-2.5 py-1 min-w-[2rem]';
    }
  };

  const getLabel = (l: string) => {
    if (l === 'Super') return '⌘';
    if (l === 'Shift') return '⇧';
    if (l === 'Alt') return '⌥';
    if (l === 'Enter' || l === 'Return') return '⏎';
    if (l === 'Arrow' || l === 'Arrows') return '←↑↓→';
    if (l === 'Space') return '␣ Space';
    if (l === 'Print Screen') return 'PrtSc';
    if (l === 'CapsLock') return 'Caps';
    if (l === 'PageUp') return 'PgUp';
    if (l === 'PageDown') return 'PgDn';
    return l;
  };

  return (
    <motion.div
      initial={false}
      animate={{
        y: isPressed ? 2 : 0,
        boxShadow: isPressed 
          ? '0px 0px 0px 0px rgb(var(--color-gray))' 
          : '0px 3px 0px 0px rgb(var(--color-gray))',
      }}
      transition={{ duration: 0.1 }}
      className={`
        relative inline-flex items-center justify-center
        border border-omarchy-fg/40 rounded
        bg-omarchy-dark text-omarchy-fg
        font-mono font-bold
        select-none cursor-pointer whitespace-nowrap
        transition-colors duration-300
        ${getSizeClasses()}
        ${isPressed ? 'brightness-90' : ''}
      `}
    >
      {getLabel(label)}
    </motion.div>
  );
};