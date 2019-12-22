import React from "react";
import SiteLayout from "../components/siteLayout";
import Card from "../components/card";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "lost-place-beelitz.jpg" }) {
        childImageSharp {
          fixed(width: 1100, height: 365) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <SiteLayout title="Content Not Found (404)">
      <Card>
        <div className="card">
          <div className="card-header">
            <OutboundLink href="https://www.flickr.com/photos/wendelinjacober/24320279512/in/photolist-2d5ZCpk-D46MN1-29Aa58e-MdEMxT-NBKM7b-28EmheM-28dcoN1-cbSXFd-EATgKu-fQ8tp6-NYhLGa">
              <Img
                className="card-image"
                fixed={data.file.childImageSharp.fixed}
              />
            </OutboundLink>
          </div>
          <div className="card-content">
            <p className="lead">
              The content you were looking for has been removed or relocated.
            </p>
            <Link className="button button-primary" href="/">
              Return to Home
            </Link>
          </div>
        </div>
      </Card>
    </SiteLayout>
  );
};

export default Index;
