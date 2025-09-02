import React from 'react';
import { Icon } from '@/components/ui/icon';
import { ChevronRightIcon as GluestackChevronRightIcon } from '@/components/ui/icon';

type ChevronRightIconProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xs';
  className?: string;
};

export const ChevronRightIcon = ({ size = 'sm', className = 'text-white ml-1' }: ChevronRightIconProps) => {
  return (
    <Icon
      as={GluestackChevronRightIcon}
      size={size}
      className={className}
    />
  );
};
