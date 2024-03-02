import React from "react";
import {Card, Typography} from "@mui/material";
import ExternalLink from "./ExternalLink";

/**
 * React component for showing the license for an article.
 *
 * @return {React.ReactElement} - The react component
 *
 * @example
 * <ArticleLicense
 *   minutes={License.minutes}
 *   words={License.words}
 *   lang={lang} />
 */
export const ArticleLicense = () => {
  return (
    <Card variant="outlined" sx={{p: .75, mt: 2}} xmlnsCC="http://creativecommons.org/ns#">
      <Typography variant="body2">
        {"This work is licensed under "}
      </Typography>
      <Typography variant="body2">
        <ExternalLink name="license" to={"http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"} rel="license">
          {"Attribution 4.0 International"}
          <img style={{
            height: "1.2rem",
            marginLeft: "4px",
            verticalAlign: "text-bottom",
          }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" />
          <img style={{
            height: "1.2rem",
            marginLeft: "4px",
            verticalAlign: "text-bottom",
          }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" />
        </ExternalLink>
      </Typography>
    </Card>
  );
};

export default ArticleLicense;
