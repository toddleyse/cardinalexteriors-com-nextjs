import { Container, Title, Text, Button, Stack } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="lg" style={{ minHeight: '50vh', justifyContent: 'center' }}>
        <Title order={1}>Page Not Found</Title>
        <Text c="dimmed" size="lg" ta="center">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <Button component={Link} href="/" size="lg">
          Return Home
        </Button>
      </Stack>
    </Container>
  );
}
