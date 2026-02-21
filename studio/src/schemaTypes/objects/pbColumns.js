import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbColumns',
  title: 'Columns',
  type: 'object',
  fields: [
    defineField({
      name: 'columnCount',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 2,
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [{ type: 'pbColumn' }],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      columns: 'columns',
      columnCount: 'columnCount',
    },
    prepare({ columns, columnCount }) {
      return {
        title: `${columnCount || (columns ? columns.length : 0)} Column Layout`,
        subtitle: 'Columns Block',
      };
    },
  },
});
