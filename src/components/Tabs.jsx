import { forwardRef } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';

export const Tabs = forwardRef(function Tabs(
  { variant = 'scrollable', scrollButtons = 'auto', children, ...rest },
  ref,
) {
  return (
    <MuiTabs ref={ref} variant={variant} scrollButtons={scrollButtons} {...rest}>
      {children}
    </MuiTabs>
  );
});

export const Tab = forwardRef(function Tab(props, ref) {
  return <MuiTab ref={ref} {...props} />;
});
