import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbButtons',
  title: 'Buttons',
  type: 'object',
  fields: [
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'button',
          title: 'Button',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Filled', value: 'filled' },
                  { title: 'Outline', value: 'outline' },
                  { title: 'Light', value: 'light' },
                  { title: 'Subtle', value: 'subtle' },
                ],
              },
              initialValue: 'filled',
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'sm' },
                  { title: 'Medium', value: 'md' },
                  { title: 'Large', value: 'lg' },
                ],
              },
              initialValue: 'md',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              variant: 'variant',
            },
            prepare({ title, variant }) {
              return {
                title: title || 'Button',
                subtitle: variant || 'filled',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      buttons: 'buttons',
    },
    prepare({ buttons }) {
      const count = buttons ? buttons.length : 0;
      const labels = buttons ? buttons.map((b) => b.label).join(', ') : '';
      return {
        title: labels || 'Buttons',
        subtitle: `${count} button${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
