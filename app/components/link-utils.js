function toPathFromSlug(slug) {
  if (!slug || typeof slug !== 'string') return '#';
  const trimmed = slug.trim();
  if (!trimmed) return '#';
  if (trimmed === 'home') return '/';
  if (trimmed.startsWith('/')) return trimmed;
  return `/${trimmed}`;
}

function toPlainText(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(toPlainText).filter(Boolean).join(' ').trim();
  if (typeof value === 'object') {
    if (typeof value.text === 'string') return value.text;
    if (typeof value.current === 'string') return value.current;
    if (typeof value.label === 'string') return value.label;
    if (typeof value.title === 'string') return value.title;
    if (Array.isArray(value.children)) return value.children.map(toPlainText).filter(Boolean).join('').trim();
  }
  return '';
}

function normalizeText(value) {
  return toPlainText(value).replace(/\s+/g, ' ').trim();
}

function labelKey(value) {
  return normalizeText(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function humanizeSlug(slug) {
  const raw = typeof slug === 'string' ? slug.trim() : '';
  if (!raw) return '';
  const cleaned = raw.replace(/^\/+|\/+$/g, '') || 'home';
  if (cleaned.toLowerCase() === 'home') return 'Home';
  const leaf = cleaned.split('/').filter(Boolean).pop() || cleaned;
  return leaf
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function fallbackLabelFromLink(linkValue) {
  const internalTitle = normalizeText(linkValue?.internal?.title);
  if (internalTitle) return internalTitle;

  const internalSlug = normalizeText(linkValue?.internal?.slug?.current);
  if (internalSlug) return humanizeSlug(internalSlug);

  const directSlug = normalizeText(linkValue?.slug?.current || linkValue?.current || '');
  if (directSlug) return humanizeSlug(directSlug);

  return '';
}

function isBrandLikeLabel(label, siteTitle) {
  const labelNormalized = labelKey(label);
  const brandNormalized = labelKey(siteTitle);
  if (!labelNormalized || !brandNormalized) return false;
  if (labelNormalized === brandNormalized) return true;
  if (labelNormalized.length >= 10 && brandNormalized.startsWith(labelNormalized)) return true;
  if (brandNormalized.length >= 10 && labelNormalized.startsWith(brandNormalized)) return true;
  return false;
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

export function resolveLinkLabel(labelValue, linkValue, siteTitle = '') {
  const explicit = normalizeText(labelValue);
  const inferred = normalizeText(fallbackLabelFromLink(linkValue));

  if (!explicit) return inferred || '';

  if (isBrandLikeLabel(explicit, siteTitle) && inferred && !isBrandLikeLabel(inferred, siteTitle)) {
    return inferred;
  }

  return explicit;
}
