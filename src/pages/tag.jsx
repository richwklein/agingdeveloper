import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";
import PageSEO from "../components/PageSEO";
import TagBreadcrumb from "../components/TagBreadCrumb";
import TagGrid from "../components/TagGrid";
import {GroupsNodeProps} from "../props";

/**
 * React component that renders a page with all the article tags.
 *
 * @param {PageTagProps} props - The tag page props.
 * @return {React.ReactElement} - The react component.
 */
const PageTag = ({data}) => {
  const {group, totalCount} = data.allMdx;

  return (
    <>
      <TagBreadcrumb />
      <TagGrid tags={group} totalCount={totalCount} />
    </>
  );
};

/**
 * @typedef PageTagProps - The props for the category page.
 * @property {Object} data - The page data.
 * @property {GroupsNodeProps} data.allMdx - The grouped nodes in the mdx.
 */
PageTag.propTypes = {
  data: PropTypes.shape({
    allMdx: GroupsNodeProps.isRequired,
  }).isRequired,
};

export default PageTag;

export const Head = () => {
  return <PageSEO title="Tags" path="/tag" />;
};

export const pageQuery = graphql`
  query {
    allMdx {
      group(field: { frontmatter: { tags: SELECT } }) {
        name: fieldValue
        count: totalCount
      }
      totalCount
    }
  }
`;
