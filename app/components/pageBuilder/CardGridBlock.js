'use client';

import { SimpleGrid, Card, Image, Title, Text, Button, Container, Box } from '@mantine/core';
import { urlFor } from '@/sanity/lib/image';
import SafeText from '../SafeText';
import { resolveHref, hasValidHref } from '../link-utils';

export default function CardGridBlock({ block }) {
  const { heading, cards, columns } = block;

  if (!cards || cards.length === 0) {
    return null;
  }

  const colCount = columns || 3;

  return (
    <Container size="xl" py="lg">
      {heading && (
        <Title order={2} mb="lg" ta="center">
          <SafeText value={heading} />
        </Title>
      )}
      <SimpleGrid cols={{ base: 1, sm: 2, md: colCount }} spacing="lg">
        {cards.map((card) => {
          const imageUrl = card.image
            ? urlFor(card.image)?.width(600).height(400).quality(85).url()
            : null;
          const linkLabel = card.linkLabel || card.linkText;
          const linkHref = resolveHref(card.linkUrl || card.link || card.externalLink);

          return (
            <Card key={card._key} shadow="sm" radius="md" withBorder padding="lg">
              {imageUrl && (
                <Card.Section>
                  <Image
                    src={imageUrl}
                    alt={card.image?.alt || card.title || ''}
                    height={200}
                  />
                </Card.Section>
              )}
              {card.title && (
                <Title order={3} mt="md" mb="xs" size="h4">
                  <SafeText value={card.title} />
                </Title>
              )}
              {card.description && (
                <Text size="sm" c="dimmed" mb="md">
                  <SafeText value={card.description} />
                </Text>
              )}
              {linkLabel && hasValidHref(linkHref) && (
                <Box mt="auto">
                  <Button
                    component="a"
                    href={linkHref}
                    variant="light"
                    size="sm"
                    radius="md"
                    fullWidth
                  >
                    {linkLabel}
                  </Button>
                </Box>
              )}
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
