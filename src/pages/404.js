import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import SiteLayout from "../components/siteLayout";
import Card from "../components/card";
import Footer from "../components/footer";

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "lost-place-beelitz.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1100, maxHeight: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <SiteLayout title="Content Not Found (404)">
      <Card>
        <main className="card">
          <section className="card-header">
            <OutboundLink
              href="https://www.flickr.com/photos/wendelinjacober/24320279512/in/photolist-2d5ZCpk-D46MN1-29Aa58e-MdEMxT-NBKM7b-28EmheM-28dcoN1-cbSXFd-EATgKu-fQ8tp6-NYhLGa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                className="card-image"
                fluid={data.file.childImageSharp.fluid}
              />
            </OutboundLink>
          </section>
          <section className="card-content">
            <h1 className="card-lead">
              The content you were looking for has been removed or relocated.
            </h1>
          </section>
        </main>
      </Card>
      <Footer>
        <Link className="button button-primary" href="/">
          ← Return to Home
        </Link>
      </Footer>
    </SiteLayout>
  );
};

export default Index;
