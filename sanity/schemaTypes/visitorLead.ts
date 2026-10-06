import { defineField, defineType } from 'sanity'

export const visitorLead = defineType({
  name: 'visitorLead',
  title: 'Visitor Leads (Country & Phone)',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', readOnly: true }),
    defineField({ name: 'country', title: 'Country', type: 'string', readOnly: true }),
    defineField({ name: 'countryCode', title: 'Country Code', type: 'string', readOnly: true }),
    defineField({ name: 'region', title: 'Region', type: 'string', readOnly: true }),
    defineField({ name: 'detectedCountry', title: 'Auto-detected Country', type: 'string', readOnly: true }),
    defineField({ name: 'landingPage', title: 'Landing Page', type: 'string', readOnly: true }),
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
  orderings: [
    { title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'phone', country: 'country', region: 'region' },
    prepare: ({ title, country, region }) => ({
      title: title || 'No phone',
      subtitle: [country, region].filter(Boolean).join(' · '),
    }),
  },
})
