'use client';

import { useState } from 'react';
import { TextInput, Textarea, Button, Stack, Container, Title, Text, Alert } from '@mantine/core';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

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
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Container size="sm" py="lg">
        <Alert icon={<IconCheck size={16} />} title="Thank you!" color="green" radius="md">
          {successMessage || 'Your message has been sent. We will get back to you soon.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="sm" py="lg">
      {heading && (
        <Title order={2} mb="xs" ta="center">
          {heading}
        </Title>
      )}
      {description && (
        <Text c="dimmed" mb="lg" ta="center">
          {description}
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
            if (field.type === 'textarea') {
              return (
                <Textarea
                  key={field._key}
                  label={field.label}
                  placeholder={field.placeholder || ''}
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
                label={field.label}
                type={field.type || 'text'}
                placeholder={field.placeholder || ''}
                required={field.required}
                value={formData[field._key] || ''}
                onChange={(e) => handleChange(field._key, e.currentTarget.value)}
              />
            );
          })}
          <Button type="submit" size="md" radius="md" loading={submitting} fullWidth>
            {submitLabel || 'Send Message'}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
