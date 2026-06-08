import { defineField, defineType } from 'sanity'

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Product Inquiries (Leads)',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      readOnly: true,
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
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
      title: 'fullName',
      subtitle: 'productName',
    },
  },
})
