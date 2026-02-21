'use client';

import { Stack } from '@mantine/core';
import BlockRenderer from './BlockRenderer';

export default function PageBuilder({ blocks }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <Stack gap={0}>
      {blocks.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </Stack>
  );
}
