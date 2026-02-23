'use client';

import { useState } from 'react';
import { Anchor, Box, Burger, Button, Container, Divider, Drawer, Group, Menu, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { resolveHref, hasValidHref } from './link-utils';
import { toPlainText } from './SafeText';

function compactLabel(label) {
  const raw = toPlainText(label);
  if (!raw) return '';

  const prefix = raw
    .replace(/\s+/g, ' ')
    .split(/\s[|]\s|\s[-–]\s/)
    .find(Boolean) || raw;

  const trimmed = prefix.trim();
  if (!trimmed) return '';
  if (trimmed.length <= 28) return trimmed;
  return `${trimmed.slice(0, 25)}...`;
}

function DesktopNavItem({ item }) {
  const children = Array.isArray(item.children) ? item.children : [];
  const href = resolveHref(item.link);
  const label = compactLabel(item.label) || 'Page';

  if (children.length === 0) {
    if (!hasValidHref(href)) {
      return <Text c="white" fw={500}>{label}</Text>;
    }
    return (
      <Anchor href={href} c="white" fw={500} underline="never">
        {label}
      </Anchor>
    );
  }

  return (
    <Menu shadow="md" width={280} withinPortal>
      <Menu.Target>
        <Button variant="subtle" color="gray" c="white" px={0}>
          {label}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {hasValidHref(href) && (
          <>
            <Menu.Item component="a" href={href}>
              {label}
            </Menu.Item>
            <Menu.Divider />
          </>
        )}
        {children.map((child) => {
          const childHref = resolveHref(child.link);
          const childLabel = compactLabel(child.label) || 'Page';
          if (!hasValidHref(childHref)) return null;
          return (
            <Menu.Item key={child._key || child.label} component="a" href={childHref}>
              {childLabel}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}

export default function SiteHeader({ navigation, settings, siteTitle }) {
  const [opened, setOpened] = useState(false);
  const headerLinks = Array.isArray(navigation?.headerLinks) ? navigation.headerLinks : [];
  const ctaButton = navigation?.ctaButton;
  const ctaHref = resolveHref(ctaButton?.link);
  const phone = navigation?.phone;
  const logoUrl = settings?.logo ? urlFor(settings.logo)?.width(260).quality(90).url() : null;
  const brandText = toPlainText(siteTitle) || 'Home';

  return (
    <>
      <Box
        component="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'rgba(10, 21, 12, 0.62)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Container size="xl">
          <Group justify="space-between" py="md">
            <Anchor href="/" c="white" fw={700} underline="never" style={{ fontSize: 18 }}>
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={brandText}
                  width={260}
                  height={72}
                  style={{ display: 'block', width: 'auto', height: 72 }}
                />
              ) : (
                brandText
              )}
            </Anchor>

            <Group gap="lg" visibleFrom="md">
              {headerLinks.map((item) => (
                <DesktopNavItem key={item._key || item.label} item={item} />
              ))}
            </Group>

            <Group gap="md" visibleFrom="md">
              {phone && (
                <Anchor href={`tel:${phone}`} c="white" underline="never" fw={500}>
                  {phone}
                </Anchor>
              )}
              {ctaButton?.label && hasValidHref(ctaHref) && (
                <Button component="a" href={ctaHref} radius="xl" color="yellow">
                  {compactLabel(ctaButton.label) || 'Contact'}
                </Button>
              )}
            </Group>

            <Burger
              hiddenFrom="md"
              opened={opened}
              onClick={() => setOpened((value) => !value)}
              aria-label="Toggle navigation"
            />
          </Group>
        </Container>
      </Box>

      <Drawer opened={opened} onClose={() => setOpened(false)} title={brandText || 'Navigation'} hiddenFrom="md" size="90%">
        <Stack gap="sm">
          {headerLinks.map((item) => {
            const href = resolveHref(item.link);
            const children = Array.isArray(item.children) ? item.children : [];
            const label = compactLabel(item.label) || 'Page';
            return (
              <Box key={item._key || item.label}>
                {hasValidHref(href) ? (
                  <Anchor href={href} c="dark" fw={600} underline="never" onClick={() => setOpened(false)}>
                    {label}
                  </Anchor>
                ) : (
                  <Text fw={600}>{label}</Text>
                )}
                {children.length > 0 && (
                  <Stack gap={6} mt={6} ml="md">
                    {children.map((child) => (
                      hasValidHref(resolveHref(child.link)) ? (
                        <Anchor
                          key={child._key || child.label}
                          href={resolveHref(child.link)}
                          c="dark"
                          size="sm"
                          underline="never"
                          onClick={() => setOpened(false)}
                        >
                          {compactLabel(child.label) || 'Page'}
                        </Anchor>
                      ) : null
                    ))}
                  </Stack>
                )}
              </Box>
            );
          })}

          {(ctaButton?.label && hasValidHref(ctaHref)) && (
            <>
              <Divider my="sm" />
              <Button component="a" href={ctaHref} onClick={() => setOpened(false)}>
                {compactLabel(ctaButton.label) || 'Contact'}
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
