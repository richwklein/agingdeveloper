import React from "react";
import PropTypes from "prop-types";
import {AuthorNodeProps} from "../props";

/**
 * A react component for rendering the head of an author page.
 *
 * @param {AuthorSEOProps} props - The author page seo props.
 * @return {React.ReactElement} - The react component.
 */
export const AuthorSEO = ({author}) => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "dateCreated": "2019-12-23T12:34:00-05:00",
    "dateModified": "2019-12-26T14:53:00-05:00",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "identifier": author.slug,
      "agentInteractionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WriteAction",
        "userInteractionCount": 2346,
      },
      "description": author.tagline,
      "image": author.image.publicURL,
      "sameAs": author.socials.map((social) => {
        return social.url;
      }),
    },
  };
  const json =JSON.stringify(ld);

  return (
    <>
      <meta id="og:type" property="og:type" content="profile" />
      <meta property="profile:first_name" content={author.firstName} />
      <meta property="profile:last_name" content={author.lastName} />
      <meta property="profile:username" content={author.slug} />
      <script id="ld-json" type="application/ld+json">
        {json}
      </script>

    </>
  );
};

/**
 * @typedef AuthorSEOProps - The SEO Head for the author props.
 * @property {AuthorNodeProps} - The author graphql node.
 */
AuthorSEO.propTypes = {
  author: AuthorNodeProps,
};

export default AuthorSEO;
