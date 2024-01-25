import React from "react";
import {Highlight, themes} from "prism-react-renderer";
import {ChildrenProps} from "../props";

/**
 * React component used by the {@link MDXProvider} when rendering code in mdx.
 *
 * @param {MDXCodeProps} props - The code tag props.
 * @return {React.ReactElement} - The react component
 */
export const MDXCode = ({children}) => {
  if (children.type != "code") {
    return (
      <pre>{children}</pre>
    );
  }

  const {props: {className, children: code}} = children;
  const language = className?.replace(/language-/, "").trim() || "";

  return (
    <Highlight
      theme={themes.vsDark}
      code={code.trim()}
      language={language}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style}}>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({line, key: index});
            return (
              <div key={index} {...lineProps}>
                {line.map((token, key) => (
                  <span key={key}{...getTokenProps({token, key})} />
                ))}
              </div>
            );
          },
          )}

        </pre>
      )}
    </Highlight>
  );
};

/**
 * @typedef MDXCodeProps - The code tag props
 * @property {ChildrenProps} children - The children of the tag.
 */
MDXCode.propTypes = {
  children: ChildrenProps,
};

export default MDXCode;
