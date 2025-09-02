import React from 'react';
import { Icon } from '@/components/ui/icon';
import { CheckIcon as GluestackCheckIcon } from '@/components/ui/icon';

type CheckIconProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xs';
  className?: string;
};

export const CheckIcon = ({ size = 'sm', className = 'text-white' }: CheckIconProps) => {
  return (
    <Icon
      as={GluestackCheckIcon}
      size={size}
      className={className}
    />
  );
};
