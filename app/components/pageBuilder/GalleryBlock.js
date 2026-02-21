'use client';

import { SimpleGrid, Image, Container, Title } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';

export default function GalleryBlock({ block }) {
  const { heading, images, columns } = block;

  if (!images || images.length === 0) {
    return null;
  }

  const colCount = columns || 3;

  return (
    <Container size="xl" py="lg">
      {heading && (
        <Title order={2} mb="lg" ta="center">
          {heading}
        </Title>
      )}
      <SimpleGrid cols={{ base: 1, sm: 2, md: colCount }} spacing="md">
        {images.map((img, index) => {
          const imageUrl = urlFor(img)?.width(600).height(400).quality(85).url();
          if (!imageUrl) return null;
          return (
            <Image
              key={img._key || index}
              src={imageUrl}
              alt={img.alt || ''}
              radius="md"
              style={{ width: '100%', height: 'auto' }}
            />
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
