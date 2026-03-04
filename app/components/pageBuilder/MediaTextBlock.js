'use client';

import { SimpleGrid, Box, Title, Image, Container, Button } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';
import SafeText, { toPlainText } from '../SafeText';
import { resolveHref, hasValidHref } from '../link-utils';

export default function MediaTextBlock({ block }) {
  const { heading, content, image, imagePosition, ctaLabel, ctaLink } = block;

  if (!image && !heading && !content) {
    return null;
  }

  const imageUrl = image ? urlFor(image)?.width(800).quality(85).url() : null;
  const isReversed = imagePosition === 'right';
  const buttonLabel = toPlainText(ctaLabel) || toPlainText(block.ctaText);
  const buttonHref = resolveHref(ctaLink || block.ctaExternalLink || block.ctaUrl);

  const imageColumn = imageUrl ? (
    <Box>
      <Image
        src={imageUrl}
        alt={image?.alt || heading || ''}
        radius="md"
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  ) : null;

  const textColumn = (
    <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {heading && (
        <Title order={2} mb="md">
          <SafeText value={heading} />
        </Title>
      )}
      {content && (
        <Box mb="md">
          <SafeText value={content} rich />
        </Box>
      )}
      {buttonLabel && hasValidHref(buttonHref) && (
        <Box>
          <Button component="a" href={buttonHref} size="md" radius="md">
            {buttonLabel}
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Container size="xl" py="lg">
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {isReversed ? (
          <>
            {textColumn}
            {imageColumn}
          </>
        ) : (
          <>
            {imageColumn}
            {textColumn}
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}
