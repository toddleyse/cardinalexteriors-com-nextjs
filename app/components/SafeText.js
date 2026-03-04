'use client';

import { PortableText } from '@portabletext/react';
import { TypographyStylesProvider } from '@mantine/core';

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}/gi;

function splitTextWithEmails(text) {
  const value = typeof text === 'string' ? text : '';
  if (!value) return [{ type: 'text', value: '' }];

  const parts = [];
  let cursor = 0;
  let match;
  EMAIL_RE.lastIndex = 0;

  while ((match = EMAIL_RE.exec(value)) !== null) {
    const email = match[0];
    const index = match.index;

    if (index > cursor) {
      parts.push({ type: 'text', value: value.slice(cursor, index) });
    }
    parts.push({ type: 'email', value: email });
    cursor = index + email.length;
  }

  if (cursor < value.length) {
    parts.push({ type: 'text', value: value.slice(cursor) });
  }

  if (parts.length === 0) return [{ type: 'text', value }];
  return parts;
}

function linkifyPlainText(text, keyPrefix = 'email') {
  const parts = splitTextWithEmails(text);
  if (!parts.some((part) => part.type === 'email')) return text;

  return parts.map((part, index) => (
    part.type === 'email'
      ? (
        <a key={`${keyPrefix}-mail-${index}`} href={`mailto:${part.value}`}>
          {part.value}
        </a>
      )
      : <span key={`${keyPrefix}-text-${index}`}>{part.value}</span>
  ));
}

function markDefKeyForEmail(markDefs, email) {
  const existing = Array.isArray(markDefs)
    ? markDefs.find((markDef) => markDef?._type === 'link' && typeof markDef.href === 'string' && markDef.href.toLowerCase() === `mailto:${email.toLowerCase()}`)
    : null;
  if (existing?._key) return existing._key;
  return `mail-${Math.random().toString(36).slice(2, 10)}`;
}

function linkifyPortableText(value) {
  if (!Array.isArray(value)) return value;

  return value.map((block) => {
    if (!block || typeof block !== 'object') return block;
    if (block._type !== 'block' || !Array.isArray(block.children)) return block;

    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    const linkMarkKeys = new Set(
      markDefs
        .filter((markDef) => markDef?._type === 'link' && typeof markDef._key === 'string')
        .map((markDef) => markDef._key)
    );

    const nextChildren = [];

    for (const child of block.children) {
      if (!child || typeof child !== 'object' || child._type !== 'span' || typeof child.text !== 'string') {
        nextChildren.push(child);
        continue;
      }

      const marks = Array.isArray(child.marks) ? child.marks : [];
      const alreadyLinked = marks.some((mark) => linkMarkKeys.has(mark));
      if (alreadyLinked) {
        nextChildren.push(child);
        continue;
      }

      const pieces = splitTextWithEmails(child.text);
      const hasEmail = pieces.some((piece) => piece.type === 'email');
      if (!hasEmail) {
        nextChildren.push(child);
        continue;
      }

      for (const piece of pieces) {
        if (piece.type === 'text') {
          if (!piece.value) continue;
          nextChildren.push({
            ...child,
            _key: `${child._key}-${Math.random().toString(36).slice(2, 8)}`,
            text: piece.value,
          });
          continue;
        }

        const email = piece.value;
        const markKey = markDefKeyForEmail(markDefs, email);
        if (!markDefs.find((markDef) => markDef?._key === markKey)) {
          markDefs.push({
            _key: markKey,
            _type: 'link',
            href: `mailto:${email}`,
          });
          linkMarkKeys.add(markKey);
        }

        nextChildren.push({
          ...child,
          _key: `${child._key}-${Math.random().toString(36).slice(2, 8)}`,
          text: email,
          marks: [...marks, markKey],
        });
      }
    }

    return {
      ...block,
      children: nextChildren,
      markDefs,
    };
  });
}

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
    bullet: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    span: ({ value }) => {
      const text = typeof value?.text === 'string' ? value.text : '';
      return <span>{text}</span>;
    },
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
  if (typeof value === 'string') return <>{linkifyPlainText(value)}</>;

  const portableValue = toPortableTextValue(value);
  if (portableValue) {
    const rendered = <PortableText value={linkifyPortableText(portableValue)} components={portableTextComponents} />;
    if (rich) {
      return <TypographyStylesProvider>{rendered}</TypographyStylesProvider>;
    }
    return rendered;
  }

  const plain = toPlainText(value);
  return <>{linkifyPlainText(plain)}</>;
}
