import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbHeading',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Heading Level',
      type: 'number',
      options: {
        list: [
          { title: 'H1', value: 1 },
          { title: 'H2', value: 2 },
          { title: 'H3', value: 3 },
          { title: 'H4', value: 4 },
          { title: 'H5', value: 5 },
          { title: 'H6', value: 6 },
        ],
      },
      initialValue: 2,
    }),
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
  ],
  preview: {
    select: {
      title: 'text',
      level: 'level',
    },
    prepare({ title, level }) {
      return {
        title: title || 'Heading',
        subtitle: `H${level || 2}`,
      };
    },
  },
});
