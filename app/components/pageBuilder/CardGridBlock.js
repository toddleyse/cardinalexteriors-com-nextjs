'use client';

import { useMemo, useState } from 'react';
import { SimpleGrid, Card, Image, Title, Text, Button, Container, Box } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { urlFor } from '@/sanity/lib/image';
import SafeText, { toPlainText } from '../SafeText';
import { resolveHref, hasValidHref } from '../link-utils';

export default function CardGridBlock({ block }) {
  const { heading, cards, columns } = block;

  if (!cards || cards.length === 0) {
    return null;
  }

  const colCount = columns || 3;
  const headingText = toPlainText(heading).toLowerCase();
  const isServiceCoverflow = block.layout === 'coverflow' || (headingText.includes('service') && cards.length >= 5);
  const sliderCards = useMemo(() => cards.slice(0, 9), [cards]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (isServiceCoverflow && sliderCards.length >= 3) {
    const safeActive = ((activeIndex % sliderCards.length) + sliderCards.length) % sliderCards.length;

    function offsetFor(index) {
      const raw = index - safeActive;
      const candidates = [raw, raw - sliderCards.length, raw + sliderCards.length];
      return candidates.reduce((best, value) => (
        Math.abs(value) < Math.abs(best) ? value : best
      ), raw);
    }

    return (
      <Container size="xl" py="lg">
        {heading && (
          <Title order={2} mb="lg" ta="center">
            <SafeText value={heading} />
          </Title>
        )}
        <Box
          style={{
            position: 'relative',
            height: 'clamp(360px, 52vw, 620px)',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          {sliderCards.map((card, index) => {
            const imageUrl = card.image
              ? urlFor(card.image)?.width(900).height(1200).quality(86).url()
              : null;
            const titleText = toPlainText(card.title);
            const linkLabel = toPlainText(card.linkLabel) || toPlainText(card.linkText) || 'Read More';
            const linkHref = resolveHref(card.linkUrl || card.link || card.externalLink);
            const offset = offsetFor(index);
            if (Math.abs(offset) > 3) return null;

            const isActive = offset === 0;
            const scale = isActive ? 1 : (Math.abs(offset) === 1 ? 0.82 : 0.68);
            const opacity = isActive ? 1 : (Math.abs(offset) === 1 ? 0.62 : 0.34);
            const rotation = offset * -14;

            return (
              <Box
                key={card._key || index}
                onClick={() => setActiveIndex(index)}
                style={{
                  position: 'absolute',
                  top: '2%',
                  left: '50%',
                  width: 'clamp(220px, 30vw, 430px)',
                  height: 'clamp(300px, 46vw, 560px)',
                  borderRadius: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 30px 55px rgba(0,0,0,0.26)' : '0 16px 30px rgba(0,0,0,0.14)',
                  transform: `translateX(calc(-50% + ${offset * 215}px)) scale(${scale}) rotateY(${rotation}deg)`,
                  transformOrigin: 'center center',
                  opacity,
                  zIndex: 10 - Math.abs(offset),
                  transition: 'transform 420ms ease, opacity 260ms ease, box-shadow 300ms ease',
                  backgroundColor: '#1f2937',
                }}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={card.image?.alt || titleText || ''}
                    height="100%"
                    fit="cover"
                    radius={0}
                  />
                )}
                <Box
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 26%, rgba(0,0,0,0.76) 100%)',
                  }}
                />
                {isActive && (
                  <Box
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 24,
                      textAlign: 'center',
                      padding: '0 20px',
                    }}
                  >
                    {titleText && (
                      <Title order={3} mb="lg" c="white" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)' }}>
                        {titleText}
                      </Title>
                    )}
                    {hasValidHref(linkHref) && (
                      <Button
                        component="a"
                        href={linkHref}
                        size="lg"
                        radius={0}
                        color="yellow"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {linkLabel}
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
        <Box mt="md" style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Button
            variant="outline"
            color="dark"
            radius="xl"
            onClick={() => setActiveIndex((value) => value - 1)}
            leftSection={<IconArrowLeft size={16} />}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            color="dark"
            radius="xl"
            onClick={() => setActiveIndex((value) => value + 1)}
            rightSection={<IconArrowRight size={16} />}
          >
            Next
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container size="xl" py="lg">
      {heading && (
        <Title order={2} mb="lg" ta="center">
          <SafeText value={heading} />
        </Title>
      )}
      <SimpleGrid cols={{ base: 1, sm: 2, md: colCount }} spacing="lg">
        {cards.map((card, index) => {
          const imageUrl = card.image
            ? urlFor(card.image)?.width(600).height(400).quality(85).url()
            : null;
          const linkLabel = toPlainText(card.linkLabel) || toPlainText(card.linkText);
          const linkHref = resolveHref(card.linkUrl || card.link || card.externalLink);
          const titleText = toPlainText(card.title);

          return (
            <Card key={card._key || index} shadow="sm" radius="md" withBorder padding="lg">
              {imageUrl && (
                <Card.Section>
                  <Image
                    src={imageUrl}
                    alt={card.image?.alt || titleText || ''}
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
                    variant="filled"
                    size="sm"
                    radius="md"
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
