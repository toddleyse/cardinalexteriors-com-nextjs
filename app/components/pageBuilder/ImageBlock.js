'use client';

import { Image, Text, Box, Container } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';
import SafeText, { toPlainText } from '../SafeText';

export default function ImageBlock({ block }) {
  const { image, caption, alignment, maxWidth } = block;

  if (!image) {
    return null;
  }

  const imageUrl = urlFor(image)?.width(1200).quality(85).url();

  if (!imageUrl) {
    return null;
  }
  const altText = toPlainText(image.alt) || toPlainText(caption) || '';

  return (
    <Container size="xl" py="md">
      <Box
        style={{
          display: 'flex',
          justifyContent:
            alignment === 'center'
              ? 'center'
              : alignment === 'right'
                ? 'flex-end'
                : 'flex-start',
        }}
      >
        <Box maw={maxWidth || '100%'}>
          <Image
            src={imageUrl}
            alt={altText}
            radius="md"
            style={{ width: '100%', height: 'auto' }}
          />
          {caption && (
            <Text size="sm" c="dimmed" ta="center" mt="xs">
              <SafeText value={caption} />
            </Text>
          )}
        </Box>
      </Box>
    </Container>
  );
}
