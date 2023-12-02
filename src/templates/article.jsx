import React from "react";
import {graphql} from "gatsby";
import {MDXProvider} from "@mdx-js/react";
import MDXLink from "../components/common/MDXLink";
import ByLine from "../components/article/ByLine";
import {Box} from "@mui/material";
import TitleBlock from "../components/article/TitleBlock";
import FeaturedImage from "../components/article/FeaturedImage";

const components = {
  a: MDXLink,
};

const ArticleTemplate = ({data: {mdx}, children}) => {
  const {frontmatter: {title, description, author, featured, date}} = mdx;
  return (
    <article>
      <ByLine authorName={author.name} authorSlug={author.slug} publishedDate={date} />
      <TitleBlock title={title} description={description } />
      <FeaturedImage
        authorName={featured.author.name}
        authorUrl={featured.author.url}
        siteName={featured.site.name}
        siteUrl={featured.site.url}
        image={featured.image.childImageSharp.gatsbyImageData} />
      <Box component="hr" sx={{
        border: 0,
        borderTopWidth: "1px",
        borderTopStyle: "dashed",
        borderTopColor: "primary.dark",
      }} />
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </article>
  );
};

export default ArticleTemplate;

export const Head = ({data: {mdx}}) => {
  const {frontmatter: {title}} = mdx;
  return (<title>{title}</title>);
};

export const pageQuery = graphql`
  query($currentPath: String) {
    mdx(frontmatter: { slug: { eq: $currentPath } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        author {
          name
          slug
        }
        featured {
          author {
            name
            url
          }
          site {
            name
            url
          }
          image {
            childImageSharp {
              gatsbyImageData(width: 1200, layout: CONSTRAINED)
          }
          }
        }
      }
    }
  }
`;

