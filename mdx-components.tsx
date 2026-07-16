import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-hero text-fg mb-6" {...props} />,
    h2: (props) => (
      <h2 className="text-subsection-title text-fg mt-12 mb-4" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-lg font-semibold text-fg mt-8 mb-3" {...props} />
    ),
    p: (props) => (
      <p className="text-body text-muted mb-5 leading-relaxed" {...props} />
    ),
    ul: (props) => (
      <ul className="list-disc pl-6 mb-5 text-body text-muted space-y-2" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 mb-5 text-body text-muted space-y-2" {...props} />
    ),
    a: (props) => <a className="text-accent underline hover:no-underline" {...props} />,
    strong: (props) => <strong className="text-fg font-semibold" {...props} />,
    ...components,
  };
}
