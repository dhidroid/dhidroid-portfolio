import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="rounded-sm overflow-hidden my-8 border border-border">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1b26] border-b border-gray-700/50">
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {language}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 text-xs text-slate-400 hover:text-[#5235F6] hover:bg-[#5235F6]/10 rounded-sm transition-all duration-200"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "#1a1b26",
          fontSize: "0.9rem",
          lineHeight: "1.6",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-slate-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-a:text-[#5235F6] prose-a:no-underline hover:prose-a:underline prose-img:rounded-sm prose-strong:text-foreground prose-code:text-[#5235F6] prose-code:bg-[#5235F6]/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            return !inline && match ? (
              <CodeBlock code={codeString} language={match[1]} />
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
                className="w-full h-auto rounded-sm border border-border"
                loading="lazy"
              />
              {alt && (
                <figcaption className="text-center text-sm text-slate-500 dark:text-zinc-500 mt-3 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#5235F6] pl-6 py-2 my-8 italic text-xl text-foreground bg-slate-50/50 dark:bg-zinc-900/50 rounded-sm">
              {children}
            </blockquote>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground group flex items-center">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-6 leading-8 text-slate-600 dark:text-zinc-300 text-[1.125rem]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-8 space-y-2 text-slate-600 dark:text-zinc-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-8 space-y-2 text-slate-600 dark:text-zinc-400">
              {children}
            </ol>
          ),
          hr: () => (
             <hr className="my-12 border-border" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
