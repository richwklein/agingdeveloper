import React, {Fragment} from "react";
import {Helmet} from "react-helmet";


const OpenGraphHelmet = ({
  title,
  description,
  image,
  type,
  url,
  siteName=null}) => {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {siteName && <meta property="og:site_name" content={siteName} />}
    </Helmet>
  );
};

const TwitterHelmet = ({title, description, image, type}) => {
  return (
    <Helmet>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      <meta name="twitter:card" content={type} />
    </Helmet>
  );
};

const SEO = ({
  title,
  description,
  image,
  url,
  siteName=null,
  keywords = null,
  isArticle = false}) => {
  const type = isArticle ? "article" : "website";
  const metaTitle = title === siteName ? title : title + " | " + siteName;
  const itemType = isArticle ? "http://schema.org/Article" :
    "http://schema.org/WebSite";

  return (
    <Fragment>
      <Helmet title={metaTitle}>
        <html itemscope itemtype={itemType} />
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={description} />
        <meta itemprop="image" content={image} />
        {keywords && <meta name="keywords" content={keywords.join(",")} />}
      </Helmet>
      <OpenGraphHelmet
        title={title}
        description={description}
        image={image}
        type={type}
        url={url}
        siteName={siteName}
      />
      <TwitterHelmet
        title={title}
        description={description}
        image={image}
        type={type} />
    </Fragment>
  );
};

export default SEO;
