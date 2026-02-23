import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbSpacer',
  title: 'Spacer',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small (16px)', value: 'xs' },
          { title: 'Small (32px)', value: 'sm' },
          { title: 'Medium (48px)', value: 'md' },
          { title: 'Large (64px)', value: 'lg' },
          { title: 'Extra Large (96px)', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),
  ],
  preview: {
    select: {
      size: 'size',
    },
    prepare({ size }) {
      const labels = { xs: '16px', sm: '32px', md: '48px', lg: '64px', xl: '96px' };
      return {
        title: 'Spacer',
        subtitle: labels[size] || '48px',
      };
    },
  },
});
