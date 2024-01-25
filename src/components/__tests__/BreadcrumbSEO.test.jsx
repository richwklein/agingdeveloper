import {cleanup} from "@testing-library/react";
import * as Gatsby from "gatsby";

describe("BreadcrumbSEO", () => {
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  const mockUseStaticQuery = {
    allSiteJson: {
      nodes: [
        {
          "title": "The test title",
          "tagline": "The test tagline",
          "category": "Test",
          "lang": "en-US",
          "url": "https://example.com",
          "repository": "https://github.com/richwklein/agingdeveloper",
          "twitterUsername": "@richwklein",
          "image": {
            "publicURL": "/path/to/image",
          },
        },
      ],
    },
    site: {
      siteMetadata: {
        siteUrl: "https://example.com",
      },
    },
  };

  beforeEach(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });


  test.todo("Implement tests.");
});
