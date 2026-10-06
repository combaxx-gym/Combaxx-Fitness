import { defineArrayMember, defineField, defineType } from 'sanity'

export const quoteRequest = defineType({
  name: 'quoteRequest',
  title: 'Quote Cart Requests',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Full Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', readOnly: true }),
    defineField({ name: 'country', title: 'Country', type: 'string', readOnly: true }),
    defineField({ name: 'region', title: 'Region', type: 'string', readOnly: true }),
    defineField({ name: 'streetAddress', title: 'Street Address', type: 'string', readOnly: true }),
    defineField({ name: 'extraAddress', title: 'Extra Address', type: 'string', readOnly: true }),
    defineField({ name: 'zip', title: 'Zip / Postal Code', type: 'string', readOnly: true }),
    defineField({ name: 'city', title: 'City', type: 'string', readOnly: true }),
    defineField({ name: 'sendTo', title: 'Send To Expert', type: 'string', readOnly: true }),
    defineField({ name: 'businessCategory', title: 'Business Category', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', readOnly: true }),
    defineField({ name: 'wantsUpdates', title: 'Wants Product Updates', type: 'boolean', readOnly: true }),
    defineField({
      name: 'items',
      title: 'Requested Products',
      type: 'array',
      readOnly: true,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quoteItem',
          fields: [
            defineField({ name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }] }),
            defineField({ name: 'name', title: 'Product Name', type: 'string' }),
            defineField({ name: 'sku', title: 'SKU', type: 'string' }),
            defineField({ name: 'qty', title: 'Quantity', type: 'number' }),
            defineField({ name: 'url', title: 'Product URL', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', qty: 'qty', sku: 'sku' },
            prepare: ({ title, qty, sku }) => ({
              title: `${qty ?? 1} × ${title || 'Product'}`,
              subtitle: sku ? `SKU: ${sku}` : undefined,
            }),
          },
        }),
      ],
    }),
    defineField({ name: 'totalQty', title: 'Total Units', type: 'number', readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Quoted', value: 'quoted' },
          { title: 'Won', value: 'won' },
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
  orderings: [
    { title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'fullName', country: 'country', items: 'items' },
    prepare: ({ title, country, items }) => {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'Quote request',
        subtitle: [`${count} product${count === 1 ? '' : 's'}`, country].filter(Boolean).join(' · '),
      }
    },
  },
})
