import { defineField, defineType } from 'sanity'

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: "string"
        }),

        defineField({
            name: "slug",
            title: "Project Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 100
            }
        }),

        defineField({
            name: 'description',
            title: 'Project Description',
            type: 'text'
        }),
        defineField({
            name: "link",
            title: "Project Link",
            type: "url"
        }),
        defineField({
            name: "image",
            title: "Project Image",
            type: "image",
            options: {
                hotspot: true
            }
        }),

        // Multiple Categories Field
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: [{ type: "category" }] }]
        })
    ]
});
