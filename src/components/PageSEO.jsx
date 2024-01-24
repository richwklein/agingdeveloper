import React from "react";
import PropTypes from "prop-types";
import {useSiteData} from "../hooks/useSiteData";
import {ChildrenProps} from "../props";

/**
 * A react component for rendering the head of a page. This will default to
 * values from the {@link useSiteData} hook if values are not passed in.
 *
 * @param {PageSEOProps} props - The page seo props.
 * @return {React.ReactElement} - The react component.
 */
export const PageSEO = ({
  title,
  description,
  lang, path,
  image,
  imageAlt,
  twitterCreator,
  ogType,
  children}) => {
  const {
    title: siteTitle,
    tagline: siteDescription,
    lang: siteLang,
    url: siteUrl,
    twitterUsername: siteTwitterUsername,
    image: siteImage} = useSiteData();

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "url": siteUrl,
  };
  const json =JSON.stringify(ld);

  const seo = {
    ogType: ogType || "website",
    title: title != null ? `${title} | ${siteTitle}` : siteTitle,
    name: title || siteTitle,
    description: description || siteDescription,
    lang: lang || siteLang,
    url: path != null ? `${siteUrl}${path}` : siteUrl,
    image: image != null ? `${siteUrl}${image}` : `${siteUrl}${siteImage.publicURL}`,
    imageAlt: imageAlt || title || siteTitle,
    twitterCreator: twitterCreator || siteTwitterUsername,
  };

  return (
    <>
      <html lang={seo.lang} />
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.url} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.name} />
      <meta property="og:description" name="description" content={seo.description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={seo.lang} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteTwitterUsername} />
      <meta name="twitter:creator" content={seo.twitterCreator} />
      <script id="ld-json" type="application/ld+json">
        {json}
      </script>
      {children}
    </>
  );
};

/**
 * @typedef PageSEOProps - The SEO Head props.
 * @property {string} [title] - Title of the page.
 * @property {string} [description] - Description of the page.
 * @property {string} [lang] - Language the page is in.
 * @property {string} [path] - The path to the page.
 * @property {string} [image] - The path to the image for the page.
 * @property {string} [imageAlt] - The alternate text for the image.
 * @property {string} [twitterUsername] - The twitter username to associate as the creator.
 * @property {string} [ogType] - The type of page the seo is for.
 * @property {ChildrenProps} [children=null] - Child components.
 */
PageSEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  lang: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  twitterCreator: PropTypes.string,
  ogType: PropTypes.string,
  children: ChildrenProps,
};

export default PageSEO;
