'use client';

import { Accordion, Container, Title, Text } from '@mantine/core';
import SafeText, { toPlainText } from '../SafeText';

export default function FAQBlock({ block }) {
  const { heading, subheading, faqs } = block;

  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Filter to only items that have a valid non-empty key and question
  const validFaqs = faqs.filter((faq) => {
    const key = faq._key || faq.id;
    const question = toPlainText(faq.question);
    return key && question;
  });

  if (validFaqs.length === 0) {
    return null;
  }

  return (
    <Container size="md" py="xl">
      {heading && (
        <Title order={2} mb="sm" ta="center">
          <SafeText value={heading} />
        </Title>
      )}
      {subheading && (
        <Text size="lg" mb="xl" ta="center" c="dimmed">
          <SafeText value={subheading} />
        </Text>
      )}
      <Accordion variant="separated" radius="md">
        {validFaqs.map((faq) => {
          const itemValue = String(faq._key || faq.id);
          const question = toPlainText(faq.question);
          return (
            <Accordion.Item key={itemValue} value={itemValue}>
              <Accordion.Control>
                {question}
              </Accordion.Control>
              <Accordion.Panel>
                <SafeText value={faq.answer} rich />
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}
