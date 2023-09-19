import { JSX } from "preact";
import { useState, useRef } from "preact/hooks";

interface UploadsProps {
  onFileUpload: (file: File) => void;
}

export function Uploads(props: UploadsProps) {
  const [dragging, setDragging] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDragIn = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragOut = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.onFileUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }

  const handleFileUpload = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    if(e.currentTarget.files) {
      props.onFileUpload(e.currentTarget.files[0]);
    }
  }

  return (
    <div
      ref={dropRef}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      class={`p-6 border-2 ${dragging ? 'border-blue-600 bg-blue-100' : 'border-gray-600'} rounded-md`}
    >
      <input type="file" class="hidden" onChange={handleFileUpload} />
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => document.querySelector('input[type="file"]')?.click()}
      >
        Select File
      </button>
      <p class="mt-2">or drag and drop files here...</p>
    </div>
  );
}