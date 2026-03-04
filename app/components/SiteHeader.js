'use client';

import { useState } from 'react';
import { Anchor, Box, Burger, Button, Container, Divider, Drawer, Group, Menu, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { resolveHref, hasValidHref, resolveLinkLabel } from './link-utils';
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

function DesktopNavItem({ item, siteTitle }) {
  const children = Array.isArray(item.children) ? item.children : [];
  const href = resolveHref(item.link);
  const label = compactLabel(resolveLinkLabel(item.label, item.link, siteTitle)) || 'Page';
  const imageUrl = item.image ? urlFor(item.image)?.width(80).height(50).quality(85).url() : null;

  const imageEl = imageUrl ? (
    <Image
      src={imageUrl}
      alt=""
      width={40}
      height={25}
      style={{ display: 'block', width: 'auto', height: 25, borderRadius: 4, objectFit: 'cover' }}
    />
  ) : null;

  if (children.length === 0) {
    if (!hasValidHref(href)) {
      return (
        <Group gap={6} wrap="nowrap">
          {imageEl}
          <Text c="white" fw={500}>{label}</Text>
        </Group>
      );
    }
    return (
      <Anchor href={href} c="white" fw={500} underline="never">
        <Group gap={6} wrap="nowrap">
          {imageEl}
          <span>{label}</span>
        </Group>
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
          const childLabel = compactLabel(resolveLinkLabel(child.label, child.link, siteTitle)) || 'Page';
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
  const headerBg = settings?.headerBackgroundColor || '#1a1a1a';

  return (
    <>
      <Box
        component="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          background: headerBg,
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
                <DesktopNavItem key={item._key || item.label} item={item} siteTitle={siteTitle} />
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
            const label = compactLabel(resolveLinkLabel(item.label, item.link, siteTitle)) || 'Page';
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
                          {compactLabel(resolveLinkLabel(child.label, child.link, siteTitle)) || 'Page'}
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
