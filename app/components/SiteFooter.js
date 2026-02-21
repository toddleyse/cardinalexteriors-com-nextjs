import { Anchor, Box, Container, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { resolveHref, hasValidHref } from './link-utils';

export default function SiteFooter({ navigation, siteTitle }) {
  const footerColumns = Array.isArray(navigation?.footerLinks) ? navigation.footerLinks : [];
  const socialLinks = Array.isArray(navigation?.socialLinks) ? navigation.socialLinks : [];

  if (footerColumns.length === 0 && socialLinks.length === 0) {
    return null;
  }

  return (
    <Box component="footer" mt="xl" style={{ borderTop: '1px solid #e9ecef', background: '#f8f9fa' }}>
      <Container size="xl" py="xl">
        {footerColumns.length > 0 && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: Math.min(4, footerColumns.length) }} spacing="xl">
            {footerColumns.map((column) => (
              <Stack key={column._key || column.label} gap={6}>
                <Text fw={700}>{column.label}</Text>
                {(column.children || []).map((link) => {
                  const href = resolveHref(link.link);
                  if (!hasValidHref(href)) return null;
                  return (
                    <Anchor key={link._key || link.label} href={href} c="dark" size="sm" underline="never">
                      {link.label}
                    </Anchor>
                  );
                })}
              </Stack>
            ))}
          </SimpleGrid>
        )}

        {socialLinks.length > 0 && (
          <>
            <Divider my="lg" />
            <Group gap="md">
              {socialLinks.map((social) => (
                <Anchor key={`${social.platform}-${social.url}`} href={social.url} target="_blank" rel="noreferrer" c="dark" size="sm">
                  {social.platform}
                </Anchor>
              ))}
            </Group>
          </>
        )}

        <Divider my="lg" />
        <Text size="sm" c="dimmed">
          © {new Date().getFullYear()} {siteTitle || 'Website'}.
        </Text>
      </Container>
    </Box>
  );
}
