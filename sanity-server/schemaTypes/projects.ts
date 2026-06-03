import { defineField, defineType } from 'sanity'

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: "string",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "slug",
            title: "Project Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 100
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            description: "Short punchy text for hover cards (e.g. 'Reimagining Fintech')",
            type: "string"
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "string"
        }),
        defineField({
            name: "role",
            title: "My Role",
            description: "e.g. Lead Developer, UI Designer",
            type: "string"
        }),
        defineField({
            name: 'description',
            title: 'Project Overview',
            description: "Short summary used in the Overview section.",
            type: 'text'
        }),
        defineField({
            name: "challenge",
            title: "The Challenge",
            description: "What was the problem? (Used in the narrative flow)",
            type: "text"
        }),
        defineField({
            name: "solution",
            title: "The Solution / Process",
            description: "Deep dive into how we solved it.",
            type: "array",
            of: [{ type: "block" }]
        }),
        defineField({
            name: "results",
            title: "The Outcome / Results",
            description: "Metrics or qualitative results.",
            type: "text"
        }),
        defineField({
            name: "link",
            title: "Live Site Link",
            type: "url"
        }),
        defineField({
            name: "github",
            title: "GitHub Repo Link",
            type: "url"
        }),
        defineField({
            name: "image",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true }
        }),
        defineField({
            name: "gallery",
            title: "Project Gallery",
            description: "Images for the visual grid sections.",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }]
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
