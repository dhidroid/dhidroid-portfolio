import { defineType, defineField } from "sanity";

export default defineType({
  name: "workExperience",
  title: "Work Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "posted",
      title: "Posted",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "rate",
      title: "Experience / Rate",
      type: "string",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "iconUrl",
      title: "Icon / Logo URL",
      type: "url",
    }),

    // 🔥 Duration schema (only from + toDate)
    defineField({
      name: "duration",
      title: "Duration",
      type: "array",
      of: [
        defineField({
          name: "durationItem",
          title: "Duration Item",
          type: "object",
          fields: [
            defineField({
              name: "from",
              title: "From",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "toDate",
              title: "To Date",
              type: "date",
            }),
          ],
        }),
      ],
    }),
  ],
});
