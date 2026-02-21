'use client';

import { useState } from 'react';
import { Anchor, Box, Burger, Button, Container, Divider, Drawer, Group, Menu, Stack, Text } from '@mantine/core';
import { resolveHref, hasValidHref } from './link-utils';

function DesktopNavItem({ item }) {
  const children = Array.isArray(item.children) ? item.children : [];
  const href = resolveHref(item.link);

  if (children.length === 0) {
    if (!hasValidHref(href)) {
      return <Text c="dark" fw={500}>{item.label}</Text>;
    }
    return (
      <Anchor href={href} c="dark" fw={500} underline="never">
        {item.label}
      </Anchor>
    );
  }

  return (
    <Menu shadow="md" width={280} withinPortal>
      <Menu.Target>
        <Button variant="subtle" color="dark" px={0}>
          {item.label}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {hasValidHref(href) && (
          <>
            <Menu.Item component="a" href={href}>
              {item.label}
            </Menu.Item>
            <Menu.Divider />
          </>
        )}
        {children.map((child) => {
          const childHref = resolveHref(child.link);
          if (!hasValidHref(childHref)) return null;
          return (
            <Menu.Item key={child._key || child.label} component="a" href={childHref}>
              {child.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}

export default function SiteHeader({ navigation, siteTitle }) {
  const [opened, setOpened] = useState(false);
  const headerLinks = Array.isArray(navigation?.headerLinks) ? navigation.headerLinks : [];
  const ctaButton = navigation?.ctaButton;
  const ctaHref = resolveHref(ctaButton?.link);
  const phone = navigation?.phone;

  return (
    <>
      <Box component="header" style={{ borderBottom: '1px solid #e9ecef', background: '#ffffff' }}>
        <Container size="xl">
          <Group justify="space-between" py="md">
            <Anchor href="/" c="dark" fw={700} underline="never" style={{ fontSize: 18 }}>
              {siteTitle || 'Home'}
            </Anchor>

            <Group gap="lg" visibleFrom="md">
              {headerLinks.map((item) => (
                <DesktopNavItem key={item._key || item.label} item={item} />
              ))}
            </Group>

            <Group gap="md" visibleFrom="md">
              {phone && (
                <Anchor href={`tel:${phone}`} c="dark" underline="never" fw={500}>
                  {phone}
                </Anchor>
              )}
              {ctaButton?.label && hasValidHref(ctaHref) && (
                <Button component="a" href={ctaHref} radius="md">
                  {ctaButton.label}
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

      <Drawer opened={opened} onClose={() => setOpened(false)} title={siteTitle || 'Navigation'} hiddenFrom="md" size="90%">
        <Stack gap="sm">
          {headerLinks.map((item) => {
            const href = resolveHref(item.link);
            const children = Array.isArray(item.children) ? item.children : [];
            return (
              <Box key={item._key || item.label}>
                {hasValidHref(href) ? (
                  <Anchor href={href} c="dark" fw={600} underline="never" onClick={() => setOpened(false)}>
                    {item.label}
                  </Anchor>
                ) : (
                  <Text fw={600}>{item.label}</Text>
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
                          {child.label}
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
                {ctaButton.label}
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
