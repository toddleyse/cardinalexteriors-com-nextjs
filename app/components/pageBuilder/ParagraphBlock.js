'use client';

import { Box, Container } from '@mantine/core';
import SafeText from '../SafeText';

export default function ParagraphBlock({ block }) {
  const { content, alignment } = block;

  if (!content) {
    return null;
  }

  return (
    <Container size="xl" py="sm">
      <Box ta={alignment || 'left'}>
        <SafeText value={content} rich />
      </Box>
    </Container>
  );
}
