import React from "react";
import {graphql} from "gatsby";

import {Helmet} from "react-helmet";
import {LocalOffer} from "@material-ui/icons";
import ButtonGrid from "../components/ButtonGrid";
import IconBanner from "../components/IconBanner";
import Layout from "../components/Layout";

const TagHelmet = ({siteTitle}) => {
  return (<Helmet title={`Tags | ${siteTitle}`} />);
};

const TagPage = ({data}) => {
  const {group: tags} = data.allMdx;
  const banner = <IconBanner icon={<LocalOffer />} title="Tags" />;

  return (
    <Layout showLogoImage={true} banner={banner}>
      <TagHelmet siteTitle={data.site.siteMetadata.title} />
      <ButtonGrid group={tags} pathPrefix="/tag" />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    allMdx {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagPage;
