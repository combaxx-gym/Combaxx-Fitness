import { defineField, defineType } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Product Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Reviewer Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Reviewer Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      readOnly: true,
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'product',
      title: 'Product Reference',
      type: 'reference',
      to: [{ type: 'product' }],
      readOnly: true,
    }),
    defineField({
      name: 'productName',
      title: 'Product Name (for reference)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'productName',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      return {
        title,
        subtitle: `${subtitle || 'No Product'} • ${rating ? '★'.repeat(rating) : 'No Rating'}`,
      }
    },
  },
})
