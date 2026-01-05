import {defineField, defineType} from 'sanity'

export const messageType = defineType({
  name: 'message',
  title: 'Contact Message',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Sender Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Sender Email',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'subject',
      type: 'string',
      title: 'Subject',
    }),
    defineField({
      name: 'message',
      type: 'text',
      title: 'Message Content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Received At',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
