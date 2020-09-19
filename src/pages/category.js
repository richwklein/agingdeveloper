import React from "react";
import {graphql} from "gatsby";

import {Helmet} from "react-helmet";
import {Folder} from "@material-ui/icons";
import ButtonGrid from "../components/ButtonGrid";
import IconBanner from "../components/IconBanner";
import Layout from "../components/Layout";

const CategoryHelmet = ({siteTitle}) => {
  return (<Helmet title={`Categories | ${siteTitle}`} />);
};

const CategoryPage = ({data}) => {
  const {group: categories} = data.allMdx;
  const banner = <IconBanner icon={<Folder />} title="Categories" />;

  return (
    <Layout showLogoImage={true} banner={banner}>
      <CategoryHelmet siteTitle={data.site.siteMetadata.title} />
      <ButtonGrid group={categories} pathPrefix="/category" />
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
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default CategoryPage;
