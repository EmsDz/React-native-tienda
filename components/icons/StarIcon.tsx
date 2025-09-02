import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Star } from 'lucide-react-native';

type StarIconProps = {
  filled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xs';
  className?: string;
};

export const StarIcon = ({ filled = false, size = 'xs', className = '' }: StarIconProps) => {
  return (
    <Icon
      as={Star}
      size={size}
      className={filled ? "text-warning-500" : "text-gray-300 " + className}
      fill={filled ? "#F59E0B" : "none"}
    />
  );
};
