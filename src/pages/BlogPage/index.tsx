import React from 'react'

const BlogPage = () => {
    const blogQuary = `*[_type == "post"] {
        title,
        slug {
            current
        },
        body[]{
            _type == "block" => {
            "style": style,
            "text": children[].text,
            "marks": children[].marks
            },
            _type == "image" => {
            "imageUrl": asset->url,
            "alt": alt
            }
        },
        mainImage {
            asset -> {
            _id,
            url
            },
            alt
        },
        author -> {
            name,
            image {
            asset -> {
                _id,
                url
            }
            }
        },
        categories[] -> { title },
        publishedAt
        }
    `
    return (
        <div>
            <h1>blog</h1>
        </div>
    )
}

export default BlogPage