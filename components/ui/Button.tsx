import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '' 
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer relative overflow-visible';
  
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-100',
    secondary: 'bg-transparent text-white border border-orange-500 hover:bg-orange-500 hover:text-black',
    outline: 'bg-transparent text-white border border-orange-500 hover:border-orange-400',
    blue: 'bg-transparent text-white border border-blue-500 hover:bg-blue-500/10 hover:border-blue-400'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ripple effect that expands outward and disappears */}
      {isHovered && (
        <motion.div
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute inset-0 border-2 ${variant === 'blue' ? 'border-blue-500' : 'border-orange-500'} rounded-full pointer-events-none`}
          style={{ transformOrigin: 'center' }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};