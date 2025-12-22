import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-slate-900 prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="rounded-xl overflow-hidden my-8 shadow-2xl border border-gray-800">
                {/* Mac Terminal Header */}
                <div className="flex items-center px-4 py-2 bg-[#1a1b26] border-b border-gray-700/50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-4 text-xs text-gray-400 font-mono">
                    {match[1]}
                  </div>
                </div>
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    background: "#1a1b26",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: ({ src, alt }) => (
            <figure className="my-10">
              <img
                src={src}
                alt={alt}
                className="w-full h-auto rounded-xl shadow-md"
                loading="lazy"
              />
              {alt && (
                <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 rounded-r-lg">
              {children}
            </blockquote>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-900 group flex items-center">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-6 leading-8 text-gray-600/90 text-[1.125rem]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-600">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-8 space-y-2 text-gray-600">
              {children}
            </ol>
          ),
          hr: () => (
             <hr className="my-12 border-gray-200" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
