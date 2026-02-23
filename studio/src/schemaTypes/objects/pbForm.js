import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbForm',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          title: 'Form Field',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Number', value: 'number' },
                  { title: 'Text Area', value: 'textarea' },
                ],
              },
              initialValue: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              type: 'type',
            },
            prepare({ title, type }) {
              return {
                title: title || 'Field',
                subtitle: type || 'text',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Your message has been sent. We will get back to you soon.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Form',
        subtitle: 'Form Block',
      };
    },
  },
});
