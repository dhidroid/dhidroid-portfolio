import React from 'react';
import SEO from './SEO';

/**
 * Sample usage of `SEO` component.
 * - Use `route` to select a per-route default OG image from `OG_MAP` when `image` is not provided.
 * - Pass `image` to override with a page-specific image (absolute or relative).
 */
export const SampleSEOUsage: React.FC = () => {
  return (
    <>
      {/* Example: projects page */}
      <SEO
        title="Projects | Dhidroid"
        description="Showcasing projects built with React, React Native, and more."
        keywords={["projects", "portfolio", "react"]}
        route="/projects"
        url="/projects"
      />

      {/* Example: explicit image override (could be from CMS) */}
      <SEO
        title="Special Project"
        description="A featured project with its own preview image."
        image="https://cdn.example.com/special-project.png"
        url="/projects/special"
      />
    </>
  );
};

export default SampleSEOUsage;
