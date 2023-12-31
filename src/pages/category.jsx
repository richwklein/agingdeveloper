import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";
import PageSEO from "../components/PageSEO";
import TagBreadcrumb from "../components/TagBreadCrumb";
import TagGrid from "../components/TagGrid";
import {GroupsNodeProps} from "../props";

/**
 * React component that renders a page with all the article categories.
 *
 * @param {PageCategoryProps} props - The category page props.
 * @return {React.ReactElement} - The react component.
 */
const PageCategory = ({data}) => {
  const {group, totalCount} = data.allMdx;

  return (
    <>
      <TagBreadcrumb isCategory={true} />
      <TagGrid tags={group} totalCount={totalCount} isCategory={true} />
    </>
  );
};

/**
 * @typedef PageCategoryProps - The props for the category page.
 * @property {Object} data - The page data.
 * @property {GroupsNodeProps} data.allMdx - The grouped nodes in the mdx.
 */
PageCategory.propTypes = {
  data: PropTypes.shape({
    allMdx: GroupsNodeProps.isRequired,
  }).isRequired,
};

export default PageCategory;

export const Head = () => {
  return <PageSEO title="Categories" path="/category" />;
};

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { category: SELECT } }) {
        name: fieldValue
        count: totalCount
      }
      totalCount
    }
  }
`;
