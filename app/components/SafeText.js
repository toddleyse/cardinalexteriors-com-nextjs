'use client';

import { PortableText } from '@portabletext/react';
import { TypographyStylesProvider } from '@mantine/core';

/**
 * Portable Text component configuration shared across all block renderers.
 * Handles links, marks, headings, lists, and blockquotes.
 */
export const portableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const target = href.startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      return (
        <a href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    strikeThrough: ({ children }) => <s>{children}</s>,
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function toPlainText(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  if (Array.isArray(value)) {
    return value.map(toPlainText).filter(Boolean).join(' ').trim();
  }

  if (typeof value === 'object') {
    if (typeof value.text === 'string') return value.text;
    if (typeof value.current === 'string') return value.current;
    if (typeof value.label === 'string') return value.label;
    if (typeof value.title === 'string') return value.title;
    if (Array.isArray(value.children)) {
      return value.children.map(toPlainText).filter(Boolean).join('').trim();
    }
  }

  return '';
}

function toPortableTextValue(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object' && value._type === 'block') return [value];
  if (value && typeof value === 'object' && Array.isArray(value.children) && value._type) return [value];
  return null;
}

/**
 * Render a value that may be a plain string OR a Portable Text array.
 *
 * Usage:
 *   <SafeText value={block.description} />           → inline/plain
 *   <SafeText value={block.content} rich />           → wrapped in TypographyStylesProvider
 *
 * Returns null if value is falsy.
 */
export default function SafeText({ value, rich }) {
  if (!value) return null;

  // Plain string — return it directly so it can be a child of <Text>, <Title>, etc.
  if (typeof value === 'string') return value;

  const portableValue = toPortableTextValue(value);
  if (portableValue) {
    const rendered = <PortableText value={portableValue} components={portableTextComponents} />;
    if (rich) {
      return <TypographyStylesProvider>{rendered}</TypographyStylesProvider>;
    }
    return rendered;
  }

  return toPlainText(value);
}
