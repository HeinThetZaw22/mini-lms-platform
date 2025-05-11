"use client";

import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ value, onChange }, ref) => {
    const ReactQuill = useMemo(
      () => dynamic(() => import("react-quill-new"), { ssr: false }),
      []
    );

    return (
      <div ref={ref} className=" bg-white">
        <ReactQuill theme="snow" value={value} onChange={onChange} />
      </div>
    );
  }
);

Editor.displayName = "Editor";
export { Editor };
