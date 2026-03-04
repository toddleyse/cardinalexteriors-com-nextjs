'use client';

import { Box, Container, Title, Text, Button, Group } from '@mantine/core';
import SafeText, { toPlainText } from '../SafeText';
import { resolveHref, hasValidHref } from '../link-utils';

export default function CallToActionBlock({ block }) {
  const {
    heading,
    description,
    ctaLabel,
    ctaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    backgroundColor,
    textColor,
  } = block;

  const primaryLabel = toPlainText(ctaLabel) || toPlainText(block.ctaText);
  const primaryHref = resolveHref(ctaLink || block.ctaExternalLink || block.ctaUrl);
  const secondaryLabel = toPlainText(secondaryCtaLabel) || toPlainText(block.secondaryCtaText);
  const secondaryHref = resolveHref(secondaryCtaLink || block.secondaryCtaUrl);

  return (
    <Box
      component="section"
      py="xl"
      style={{
        backgroundColor: backgroundColor || 'var(--mantine-primary-color-filled)',
        color: textColor || '#ffffff',
      }}
    >
      <Container size="md" style={{ textAlign: 'center' }}>
        {heading && (
          <Title order={2} mb="md" style={{ color: textColor || '#ffffff' }}>
            <SafeText value={heading} />
          </Title>
        )}
        {description && (
          <Text size="lg" mb="lg" style={{ color: textColor || '#ffffff' }}>
            <SafeText value={description} />
          </Text>
        )}
        <Group justify="center" gap="md">
          {primaryLabel && hasValidHref(primaryHref) && (
            <Button
              component="a"
              href={primaryHref}
              size="lg"
              radius="md"
              variant="white"
              color="dark"
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
              style={{ borderColor: textColor || '#ffffff', color: textColor || '#ffffff' }}
            >
              {secondaryLabel}
            </Button>
          )}
        </Group>
      </Container>
    </Box>
  );
}
