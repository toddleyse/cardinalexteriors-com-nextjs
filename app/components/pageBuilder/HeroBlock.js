'use client';

import { Box, Container, Title, Text, Button, Group } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';
import SafeText, { toPlainText } from '../SafeText';
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
  const primaryLabel = toPlainText(ctaLabel) || toPlainText(block.ctaText);
  const primaryHref = resolveHref(ctaLink || block.ctaExternalLink || block.ctaUrl);
  const secondaryLabel = toPlainText(secondaryCtaLabel) || toPlainText(block.secondaryCtaText);
  const secondaryHref = resolveHref(secondaryCtaLink || block.secondaryCtaUrl);
  const effectiveOverlay = typeof overlayOpacity === 'number' ? overlayOpacity : (bgImage ? 0.45 : 0);

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
        minHeight: bgImage ? '72vh' : 420,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {bgImage && effectiveOverlay > 0 && (
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: `rgba(0, 0, 0, ${effectiveOverlay})`,
          }}
        />
      )}
      <Container size={fullWidth ? '100%' : 'xl'} style={{ position: 'relative', zIndex: 1 }} py="xl">
        <Box maw={900} pt={64}>
          {heading && (
            <Title
              order={1}
              mb="md"
              style={{
                color: textColor || undefined,
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                lineHeight: 1.06,
                textWrap: 'balance',
                textShadow: bgImage ? '0 2px 24px rgba(0,0,0,0.28)' : undefined,
              }}
            >
              <SafeText value={heading} />
            </Title>
          )}
          {description && (
            <Text
              size="xl"
              mb="lg"
              maw={820}
              style={{
                color: textColor || undefined,
                textShadow: bgImage ? '0 1px 12px rgba(0,0,0,0.3)' : undefined,
              }}
            >
              <SafeText value={description} />
            </Text>
          )}
          <Group>
            {primaryLabel && hasValidHref(primaryHref) && (
              <Button
                component="a"
                href={primaryHref}
                size="lg"
                radius="xl"
                color="yellow"
              >
                {primaryLabel}
              </Button>
            )}
            {secondaryLabel && hasValidHref(secondaryHref) && (
              <Button
                component="a"
                href={secondaryHref}
                size="lg"
                radius="xl"
                variant="outline"
                color="gray"
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
