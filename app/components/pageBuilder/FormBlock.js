'use client';

import { useState } from 'react';
import { TextInput, Textarea, Button, Stack, Container, Title, Text, Alert } from '@mantine/core';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';
import SafeText, { toPlainText } from '../SafeText';

export default function FormBlock({ block }) {
  const { heading, description, fields, submitLabel, successMessage } = block;

  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const defaultFields = [
    { _key: 'name', label: 'Name', type: 'text', required: true },
    { _key: 'email', label: 'Email', type: 'email', required: true },
    { _key: 'phone', label: 'Phone', type: 'tel', required: false },
    { _key: 'message', label: 'Message', type: 'textarea', required: true },
  ];

  const formFields = fields && fields.length > 0 ? fields : defaultFields;

  const findFallbackRecipient = () => {
    if (typeof document === 'undefined') return '';
    const mailtoAnchor = document.querySelector('a[href^="mailto:"]');
    const href = mailtoAnchor?.getAttribute('href') || '';
    return href.replace(/^mailto:/i, '').trim();
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
      setFormData({});
    } catch (err) {
      const fallbackRecipient = findFallbackRecipient();
      if (fallbackRecipient && typeof window !== 'undefined') {
        const subject = encodeURIComponent(toPlainText(heading) || 'Website Contact Request');
        const bodyLines = formFields.map((field) => {
          const label = toPlainText(field.label) || field._key || 'Field';
          const value = toPlainText(formData[field._key] || '').trim();
          return value ? `${label}: ${value}` : null;
        }).filter(Boolean);
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:${fallbackRecipient}?subject=${subject}&body=${body}`;
        setSubmitted(true);
        setFormData({});
        return;
      }

      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Container size="sm" py="lg">
        <Alert icon={<IconCheck size={16} />} title="Thank you!" color="green" radius="md">
          {toPlainText(successMessage) || 'Your message has been sent. We will get back to you soon.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="sm" py="lg">
      {heading && (
        <Title order={2} mb="xs" ta="center">
          <SafeText value={heading} />
        </Title>
      )}
      {description && (
        <Text c="dimmed" mb="lg" ta="center">
          <SafeText value={description} />
        </Text>
      )}
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" radius="md" mb="md">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {formFields.map((field) => {
            const fieldLabel = toPlainText(field.label) || 'Field';
            const fieldPlaceholder = toPlainText(field.placeholder);
            if (field.type === 'textarea') {
              return (
                <Textarea
                  key={field._key}
                  label={fieldLabel}
                  placeholder={fieldPlaceholder || ''}
                  required={field.required}
                  minRows={4}
                  value={formData[field._key] || ''}
                  onChange={(e) => handleChange(field._key, e.currentTarget.value)}
                />
              );
            }

            return (
              <TextInput
                key={field._key}
                label={fieldLabel}
                type={field.type || 'text'}
                placeholder={fieldPlaceholder || ''}
                required={field.required}
                value={formData[field._key] || ''}
                onChange={(e) => handleChange(field._key, e.currentTarget.value)}
              />
            );
          })}
          <Button type="submit" size="md" radius="md" loading={submitting} fullWidth>
            {toPlainText(submitLabel) || 'Send Message'}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
