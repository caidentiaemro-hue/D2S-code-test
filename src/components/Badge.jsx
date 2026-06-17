import { forwardRef } from 'react';
import { Badge as MuiBadge } from '@mui/material';

const Badge = forwardRef(function Badge(
  { dot = false, children, ...rest },
  ref,
) {
  return (
    <MuiBadge ref={ref} variant={dot ? 'dot' : undefined} {...rest}>
      {children}
    </MuiBadge>
  );
});

export default Badge;
