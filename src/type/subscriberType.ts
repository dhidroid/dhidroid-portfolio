import {defineField, defineType} from 'sanity'

export const subscriberType = defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      type: 'datetime',
      title: 'Subscription Date',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
