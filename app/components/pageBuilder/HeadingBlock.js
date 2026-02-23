'use client';

import { Container, Title } from '@mantine/core';
import SafeText from '../SafeText';

export default function HeadingBlock({ block }) {
  const { text, level, alignment } = block;
  const parsedLevel = typeof level === 'string'
    ? parseInt(level.replace(/[^0-9]/g, ''), 10)
    : level;
  const order = Math.min(Math.max(parsedLevel || 2, 1), 6);

  return (
    <Container size="xl" py="md">
      <Title order={order} ta={alignment || 'left'}>
        <SafeText value={text} />
      </Title>
    </Container>
  );
}
