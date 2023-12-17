import React, {Fragment} from "react";
import {useSiteData} from "../hooks/useSiteData";
import PropTypes from "prop-types";
import {ChildrenProps} from "../props";

/**
 * A react component for rendering the head of a page. This will default to
 * values from the {@link useSiteData} hook if values are not passed in.
 *
 * @param {PageSEOProps} props - The page seo props.
 * @return {React.ReactElement} - The react component.
 *
 * @todo add twitter:creator - author or site twitter username
 */
export const PageSEO = ({
  title,
  description,
  lang, path,
  image,
  imageAlt,
  isArticle=false,
  children}) => {
  const {
    title: siteTitle,
    tagline: siteDescription,
    lang: siteLang,
    url: siteUrl,
    image: siteImage} = useSiteData();

  const seo = {
    title: title != null ? `${title} | ${siteTitle}` : siteTitle,
    name: title || siteTitle,
    description: description || siteDescription,
    lang: lang || siteLang,
    url: path != null ? `${siteUrl}${path}` : siteUrl,
    image: image != null ? `${siteUrl}${image}` : `${siteUrl}${siteImage.publicURL}`,
    imageAlt: imageAlt || title || siteTitle,
    itemType: isArticle ? "http://schema.org/Article" : "http://schema.org/WebSite",
    ogType: isArticle ? "article" : "website",
  };
  return (
    <Fragment>
      <html itemScope itemType={seo.itemType} lang={seo.lang} />
      <title>{seo.title}</title>
      <link itemProp="url" rel="canonical" href={seo.url} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" itemProp="name" content={seo.name} />
      <meta property="og:description" itemProp="description" name="description" content={seo.description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content={seo.lang} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.imageAlt} />
      <meta name="twitter:card" content="summary" />
      {children}
    </Fragment>
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
 * @property {bool} [isArticle=false] - If this head element is for an article.
 * @property {ChildrenProps} [children=null] - Child components.
 */
PageSEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  lang: PropTypes.string,
  path: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  isArticle: PropTypes.bool,
  children: ChildrenProps,
};

export default PageSEO;
