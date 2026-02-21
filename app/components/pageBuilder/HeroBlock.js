'use client';

import { Box, Container, Title, Text, Button, Group } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';
import SafeText from '../SafeText';
import { resolveHref, hasValidHref } from '../link-utils';

export default function HeroBlock({ block }) {
  const {
    heading,
    description,
    image,
    ctaLabel,
    ctaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    backgroundColor,
    textColor,
    overlayOpacity,
    fullWidth,
  } = block;

  const bgImage = image ? urlFor(image)?.width(1920).quality(85).url() : null;
  const primaryLabel = ctaLabel || block.ctaText;
  const primaryHref = resolveHref(ctaLink || block.ctaExternalLink || block.ctaUrl);
  const secondaryLabel = secondaryCtaLabel || block.secondaryCtaText;
  const secondaryHref = resolveHref(secondaryCtaLink || block.secondaryCtaUrl);

  return (
    <Box
      component="section"
      style={{
        position: 'relative',
        backgroundColor: backgroundColor || '#f8f9fa',
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: textColor || '#212529',
        minHeight: 400,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {bgImage && overlayOpacity > 0 && (
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity || 0.4})`,
          }}
        />
      )}
      <Container size={fullWidth ? '100%' : 'xl'} style={{ position: 'relative', zIndex: 1 }} py="xl">
        <Box maw={700}>
          {heading && (
            <Title order={1} mb="md" style={{ color: textColor || undefined }}>
              <SafeText value={heading} />
            </Title>
          )}
          {description && (
            <Text size="xl" mb="lg" style={{ color: textColor || undefined }}>
              <SafeText value={description} />
            </Text>
          )}
          <Group>
            {primaryLabel && hasValidHref(primaryHref) && (
              <Button
                component="a"
                href={primaryHref}
                size="lg"
                radius="md"
              >
                {primaryLabel}
              </Button>
            )}
            {secondaryLabel && hasValidHref(secondaryHref) && (
              <Button
                component="a"
                href={secondaryHref}
                size="lg"
                radius="md"
                variant="outline"
              >
                {secondaryLabel}
              </Button>
            )}
          </Group>
        </Box>
      </Container>
    </Box>
  );
}
