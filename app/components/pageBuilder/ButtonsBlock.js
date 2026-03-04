'use client';

import { Group, Button, Container } from '@mantine/core';
import { resolveHref, hasValidHref } from '../link-utils';
import { toPlainText } from '../SafeText';

export default function ButtonsBlock({ block }) {
  const { buttons, alignment } = block;

  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <Container size="xl" py="md">
      <Group
        justify={
          alignment === 'center'
            ? 'center'
            : alignment === 'right'
              ? 'flex-end'
              : 'flex-start'
        }
        gap="md"
      >
        {buttons.map((btn, index) => {
          const href = resolveHref(btn.link);
          const label = toPlainText(btn.label) || `Button ${index + 1}`;
          if (!hasValidHref(href)) return null;
          return (
            <Button
              key={btn._key || index}
              component="a"
              href={href}
              variant={btn.variant || (index === 0 ? 'filled' : 'outline')}
              size={btn.size || 'md'}
              radius="md"
            >
              {label}
            </Button>
          );
        })}
      </Group>
    </Container>
  );
}
