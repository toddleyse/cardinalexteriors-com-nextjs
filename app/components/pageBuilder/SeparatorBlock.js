'use client';

import { Divider, Container } from '@mantine/core';

export default function SeparatorBlock({ block }) {
  const { style, color } = block;

  return (
    <Container size="xl" py="sm">
      <Divider
        variant={style === 'dashed' ? 'dashed' : style === 'dotted' ? 'dotted' : 'solid'}
        color={color || 'gray.3'}
      />
    </Container>
  );
}
