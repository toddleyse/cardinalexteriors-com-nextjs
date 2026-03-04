import { Anchor, Box, Container, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { resolveHref, hasValidHref, resolveLinkLabel } from './link-utils';

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

function compactLabel(label) {
  const raw = toPlainText(label);
  if (!raw) return '';
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (trimmed.length <= 52) return trimmed;
  return `${trimmed.slice(0, 49)}...`;
}

function sanitizeColor(hex) {
  if (typeof hex !== 'string') return null;
  const match = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  return match ? match[0] : null;
}

function expandHex(hex) {
  const normalized = sanitizeColor(hex);
  if (!normalized) return null;
  const base = normalized.slice(1);
  if (base.length === 3) {
    return `#${base[0]}${base[0]}${base[1]}${base[1]}${base[2]}${base[2]}`;
  }
  return `#${base}`;
}

function isDarkColor(hex) {
  const expanded = expandHex(hex);
  if (!expanded) return true;
  const n = parseInt(expanded.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.6;
}

function formatCopyrightName(siteTitle) {
  const text = toPlainText(siteTitle).trim();
  if (!text) return 'Website';
  return text.length > 60 ? text.slice(0, 60).trim() : text;
}

export default function SiteFooter({ navigation, settings, siteTitle }) {
  const footerColumns = Array.isArray(navigation?.footerLinks) ? navigation.footerLinks : [];
  const socialLinks = Array.isArray(navigation?.socialLinks) ? navigation.socialLinks : [];
  const phone = toPlainText(navigation?.phone || settings?.contactPhone);
  const email = toPlainText(settings?.contactEmail);
  const address = toPlainText(settings?.address);
  const hasContact = !!(phone || email || address);

  const bgColor = sanitizeColor(settings?.primaryColor) || '#1f2937';
  const fgColor = isDarkColor(bgColor) ? '#ffffff' : '#101418';
  const mutedColor = isDarkColor(bgColor) ? 'rgba(255,255,255,0.82)' : 'rgba(16,20,24,0.78)';
  const accentColor = sanitizeColor(settings?.secondaryColor) || (isDarkColor(bgColor) ? '#f5dc57' : '#0f172a');

  if (footerColumns.length === 0 && socialLinks.length === 0 && !hasContact) {
    return null;
  }

  return (
    <Box component="footer" mt="xl" style={{ borderTop: `1px solid ${mutedColor}`, background: bgColor, color: fgColor }}>
      <Container size="xl" py="xl">
        {(hasContact || footerColumns.length > 0) && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: Math.min(4, footerColumns.length + (hasContact ? 1 : 0)) }} spacing="xl">
            {hasContact && (
              <Stack gap={8}>
                <Text fw={700} c={fgColor}>Contact Us</Text>
                {phone && (
                  <Anchor href={`tel:${phone}`} c={fgColor} size="sm" underline="never">
                    {phone}
                  </Anchor>
                )}
                {email && (
                  <Anchor href={`mailto:${email}`} c={fgColor} size="sm" underline="never">
                    {email}
                  </Anchor>
                )}
                {address && (
                  <Text size="sm" c={mutedColor}>
                    {address}
                  </Text>
                )}
              </Stack>
            )}

            {footerColumns.map((column) => (
              <Stack key={column._key || column.label} gap={6}>
                <Text fw={700} c={fgColor}>{compactLabel(column.label) || 'Links'}</Text>
                {(column.children || []).slice(0, 24).map((link) => {
                  const href = resolveHref(link.link);
                  if (!hasValidHref(href)) return null;
                  return (
                    <Anchor key={link._key || link.label} href={href} c={fgColor} size="sm" underline="never">
                      {compactLabel(resolveLinkLabel(link.label, link.link, siteTitle)) || 'Link'}
                    </Anchor>
                  );
                })}
                {(column.children || []).length > 24 && (
                  <Text size="sm" c={mutedColor}>+ more links in CMS</Text>
                )}
              </Stack>
            ))}
          </SimpleGrid>
        )}

        {socialLinks.length > 0 && (
          <>
            <Divider my="lg" />
            <Group gap="md">
              {socialLinks.map((social) => (
                <Anchor key={`${social.platform}-${social.url}`} href={social.url} target="_blank" rel="noreferrer" c={fgColor} size="sm">
                  {compactLabel(social.platform) || 'social'}
                </Anchor>
              ))}
            </Group>
          </>
        )}

        <Divider my="lg" />
        <Group justify="space-between" align="flex-start" wrap="wrap">
          <Text size="sm" c={fgColor}>
            © {new Date().getFullYear()} {formatCopyrightName(siteTitle)}.
          </Text>
          <Text size="sm" c={accentColor}>
            <Anchor c={accentColor} href="/accessibility-statement" underline="never">
              Accessibility Statement
            </Anchor>
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
