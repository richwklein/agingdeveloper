import React from "react";
import moment from "moment";
import useSiteData from "../hooks/useSiteData";
import {FrontmatterProps, TimeToReadDigestProps} from "../props";
import BreadcrumbSEO from "./BreadcrumbSEO";
import PageSEO from "./PageSEO";

/**
 * A react component for rendering the head of an article page.
 *
 * @param {ArticleSEOProps} props - The article page seo props.
 * @return {React.ReactElement} - The react component.
 */
export const ArticleSEO = ({frontmatter, timeToRead}) => {
  const published = moment.utc(frontmatter.published).format("YYYY-MM-DDTHH:MM:SSZ");
  const modified = moment.utc(frontmatter.modified).format("YYYY-MM-DDTHH:MM:SSZ");
  const {url: siteUrl} = useSiteData();
  const articlePath = `/article/${frontmatter.slug}`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.description,
    "image": [`${siteUrl}${frontmatter.featured.image.publicURL}`],
    "license": `${siteUrl}/${articlePath}#license`,
    "dateCreated": published,
    "datePublished": published,
    "dateModified": modified,
    "author": [{
      "@type": "Person",
      "name": frontmatter.author.name,
      "url": `${siteUrl}/author/${frontmatter.author.slug}`,
    }],
    "wordCount": timeToRead.words,
  };
  const json =JSON.stringify(ld);

  return (
    <PageSEO
      title={frontmatter.title}
      description={frontmatter.description}
      path={articlePath}
      image={frontmatter.featured.image.publicURL}
      twitterCreator={frontmatter.author.twitterUsername}
      ogType="article"
    >
      <>
        <meta property="article:published_time" content={published} />
        <meta property="article:modified_time" content={modified} />
        <meta property="article:author" content={`${siteUrl}/author/${frontmatter.author.slug}`} />
        <meta property="article:section" content={frontmatter.category} />
        {frontmatter.tags.map((tag) => {
          return (
            <meta property="article:tag" key={tag} content={tag} />
          );
        })}
        <BreadcrumbSEO crumbs={[
          {"name": "Articles", "path": "/article"}, {"name": frontmatter.title, "path": articlePath},
        ]} />
        <script id="ld-main" type="application/ld+json">
          {json}
        </script>
      </>
    </PageSEO>
  );
};

/**
 * @typedef ArticleSEOProps - The SEO Head for the article props.
 * @property {FrontmatterProps} frontmatter - The frontmatter of the article.
 * @property {TimeToReadDigestProps} timeToRead - The time to read props.
 */
ArticleSEO.propTypes = {
  frontmatter: FrontmatterProps.isRequired,
  timeToRead: TimeToReadDigestProps.isRequired,
};

export default ArticleSEO;
