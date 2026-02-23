function toPathFromSlug(slug) {
  if (!slug || typeof slug !== 'string') return '#';
  const trimmed = slug.trim();
  if (!trimmed) return '#';
  if (trimmed === 'home') return '/';
  if (trimmed.startsWith('/')) return trimmed;
  return `/${trimmed}`;
}

function normalizeStringHref(value) {
  if (!value || typeof value !== 'string') return '#';
  const trimmed = value.trim();
  if (!trimmed) return '#';
  if (trimmed.startsWith('#') || /^(mailto:|tel:)/i.test(trimmed)) return trimmed;

  try {
    const parsed = new URL(trimmed);
    return parsed.href;
  } catch {
    return toPathFromSlug(trimmed);
  }
}

export function resolveHref(linkValue) {
  if (!linkValue) return '#';

  if (typeof linkValue === 'string') {
    return normalizeStringHref(linkValue);
  }

  if (linkValue.external) {
    return normalizeStringHref(linkValue.external);
  }

  if (linkValue.internal?.slug?.current) {
    return toPathFromSlug(linkValue.internal.slug.current);
  }

  if (linkValue.slug?.current) {
    return toPathFromSlug(linkValue.slug.current);
  }

  if (linkValue.href) {
    return normalizeStringHref(linkValue.href);
  }

  if (linkValue.current) {
    return toPathFromSlug(linkValue.current);
  }

  return '#';
}

export function hasValidHref(href) {
  return typeof href === 'string' && href.trim() !== '' && href !== '#';
}
