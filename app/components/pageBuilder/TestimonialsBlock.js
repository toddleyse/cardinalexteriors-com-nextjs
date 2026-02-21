'use client';

import { Card, Text, Group, Avatar, SimpleGrid, Container, Title, Box } from '@mantine/core';
import { IconQuote } from '@tabler/icons-react';
import { urlFor } from '@/sanity/lib/image';
import SafeText from '../SafeText';

export default function TestimonialsBlock({ block }) {
  const { heading, testimonials, columns } = block;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const colCount = columns || 2;

  return (
    <Container size="xl" py="lg">
      {heading && (
        <Title order={2} mb="lg" ta="center">
          <SafeText value={heading} />
        </Title>
      )}
      <SimpleGrid cols={{ base: 1, sm: Math.min(colCount, 2), md: colCount }} spacing="lg">
        {testimonials.map((testimonial) => {
          const avatarUrl = testimonial.avatar
            ? urlFor(testimonial.avatar)?.width(100).height(100).url()
            : null;

          return (
            <Card key={testimonial._key} shadow="sm" radius="md" withBorder padding="lg">
              <Box mb="sm">
                <IconQuote size={24} style={{ opacity: 0.3 }} />
              </Box>
              <Text size="sm" mb="md" style={{ fontStyle: 'italic' }}>
                <SafeText value={testimonial.quote} />
              </Text>
              <Group>
                <Avatar src={avatarUrl} radius="xl" size="md">
                  {typeof testimonial.name === 'string' ? testimonial.name?.[0] : '?'}
                </Avatar>
                <Box>
                  {testimonial.name && (
                    <Text size="sm" fw={600}>
                      <SafeText value={testimonial.name} />
                    </Text>
                  )}
                  {testimonial.role && (
                    <Text size="xs" c="dimmed">
                      <SafeText value={testimonial.role} />
                    </Text>
                  )}
                </Box>
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
