import React from "react";
import {Helmet} from "react-helmet";


const feedData = [
  {
    postFix: "RSS",
    type: "application/rss+xml",
    path: "/rss.xml",
  },
  {
    postFix: "Atom",
    type: "application/atom+xml",
    path: "/atom.xml",
  },
  {
    postFix: "JSON",
    type: "application/json",
    path: "/feed.json",
  },
];

const FeedLinks = ({siteName, siteUrl}) => {
  return (
    <Helmet>
      {feedData.map(({postFix, type, path}) => {
        return (
          <link
            rel="alternate"
            type={type}
            title={`${siteName} ${postFix}`}
            href={`${siteUrl}${path}`}
            key={path} />
        );
      },
      )}
    </Helmet>
  );
};

export default FeedLinks;
