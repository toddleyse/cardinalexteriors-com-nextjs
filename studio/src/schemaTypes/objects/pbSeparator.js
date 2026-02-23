import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbSeparator',
  title: 'Separator',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Dashed', value: 'dashed' },
          { title: 'Dotted', value: 'dotted' },
        ],
      },
      initialValue: 'solid',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'CSS color value (e.g., gray.3, #cccccc)',
    }),
  ],
  preview: {
    select: {
      style: 'style',
    },
    prepare({ style }) {
      return {
        title: 'Separator',
        subtitle: style || 'solid',
      };
    },
  },
});
