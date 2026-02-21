'use client';

import { SimpleGrid, Box, Container } from '@mantine/core';
import BlockRenderer from '../BlockRenderer';

export default function ColumnsBlock({ block }) {
  const { columns, columnCount } = block;

  if (!columns || columns.length === 0) {
    return null;
  }

  const cols = columnCount || columns.length || 2;

  return (
    <Container size="xl" py="md">
      <SimpleGrid cols={{ base: 1, sm: Math.min(cols, 2), md: cols }} spacing="lg">
        {columns.map((column) => (
          <Box key={column._key}>
            {column.blocks &&
              column.blocks.map((innerBlock) => (
                <BlockRenderer key={innerBlock._key} block={innerBlock} />
              ))}
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
