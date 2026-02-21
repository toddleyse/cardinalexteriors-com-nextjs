'use client';

import { Box } from '@mantine/core';

const sizeMap = {
  xs: 16,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export default function SpacerBlock({ block }) {
  const { size } = block;

  const height = sizeMap[size] || (typeof size === 'number' ? size : sizeMap.md);

  return <Box style={{ height }} />;
}
