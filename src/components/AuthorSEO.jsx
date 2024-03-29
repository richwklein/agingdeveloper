import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import useSiteData from "../hooks/useSiteData";
import {AuthorNodeProps} from "../props";
import BreadcrumbSEO from "./BreadcrumbSEO";
import PageSEO from "./PageSEO";

/**
 * A react component for rendering the head of an author page.
 *
 * @param {AuthorSEOProps} props - The author page seo props.
 * @return {React.ReactElement} - The react component.
 */
export const AuthorSEO = ({author, writeCount}) => {
  const {url: siteUrl} = useSiteData();
  const authorPath = `/author/${author.slug}`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "dateCreated": moment.utc(author.published).format("YYYY-MM-DDTHH:MM:SSZ"),
    "dateModified": moment.utc(author.modified).format("YYYY-MM-DDTHH:MM:SSZ"),
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "identifier": author.slug,
      "agentInteractionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WriteAction",
        "userInteractionCount": writeCount,
      },
      "description": author.tagline,
      "image": `${siteUrl}${author.image.publicURL}`,
      "sameAs": author.socials.map((social) => {
        return social.url;
      }),
    },
  };
  const json =JSON.stringify(ld);

  return (
    <PageSEO
      title={`${author.name} | Authors`}
      description={author.tagline}
      image={author.image.publicURL}
      imageAlt={author.name}
      path={authorPath}
      ogType="profile"
    >
      <>
        <meta property="profile:first_name" content={author.firstName} />
        <meta property="profile:last_name" content={author.lastName} />
        <meta property="profile:username" content={author.slug} />
        <BreadcrumbSEO crumbs={[
          {"name": "Authors", "path": "/author"}, {"name": author.name, "path": authorPath},
        ]} />
        <script id="ld-main" type="application/ld+json">
          {json}
        </script>
      </>
    </PageSEO>
  );
};

/**
 * @typedef AuthorSEOProps - The SEO Head for the author props.
 * @property {AuthorNodeProps} author - The author graphql node.
 * @property {number} writeCount - The total number of written articles by the author.
 */
AuthorSEO.propTypes = {
  author: AuthorNodeProps.isRequired,
  writeCount: PropTypes.number.isRequired,
};

export default AuthorSEO;
