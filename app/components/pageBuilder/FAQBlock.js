'use client';

import { Accordion, Container, Title } from '@mantine/core';
import SafeText from '../SafeText';

export default function FAQBlock({ block }) {
  const { heading, items } = block;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Container size="md" py="lg">
      {heading && (
        <Title order={2} mb="lg" ta="center">
          <SafeText value={heading} />
        </Title>
      )}
      <Accordion variant="separated" radius="md">
        {items.map((item) => (
          <Accordion.Item key={item._key} value={item._key}>
            <Accordion.Control><SafeText value={item.question} /></Accordion.Control>
            <Accordion.Panel><SafeText value={item.answer} rich /></Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
