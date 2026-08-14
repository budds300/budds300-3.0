import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export function RichText({
  data,
  className,
}: {
  data: SerializedEditorState;
  className?: string;
}) {
  return (
    <LexicalRichText
      data={data}
      className={`prose prose-invert max-w-none prose-headings:font-extrabold prose-a:text-accent ${className ?? ""}`}
    />
  );
}
