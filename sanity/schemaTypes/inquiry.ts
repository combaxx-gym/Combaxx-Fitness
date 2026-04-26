import { defineField, defineType } from 'sanity'

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Product Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'productSku',
      title: 'Product SKU',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'productSlug',
      title: 'Product Slug',
      type: 'string',
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
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Replied', value: 'replied' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'productName',
      description: 'email',
    },
    prepare({ title, subtitle, description }) {
      return {
        title: title || 'Unknown',
        subtitle: subtitle ? `Re: ${subtitle}` : description,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
})
