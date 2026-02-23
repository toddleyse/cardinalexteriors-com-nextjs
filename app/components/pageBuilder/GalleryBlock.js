'use client';

import { SimpleGrid, Image, Container, Title } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';
import SafeText from '../SafeText';

export default function GalleryBlock({ block }) {
  const { heading, images, columns, backgroundColor, textColor } = block;

  if (!images || images.length === 0) {
    return null;
  }

  const colCount = columns || 3;

  const hasCustomBackground = typeof backgroundColor === 'string' && backgroundColor.trim().length > 0;

  return (
    <div style={hasCustomBackground ? { background: backgroundColor } : undefined}>
      <Container size="xl" py="lg">
        {heading && (
          <Title order={2} mb="lg" ta="center" c={textColor || undefined}>
            <SafeText value={heading} />
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
                radius={hasCustomBackground ? 0 : 'md'}
                style={{ width: '100%', height: 'auto' }}
              />
            );
          })}
        </SimpleGrid>
      </Container>
    </div>
  );
}
