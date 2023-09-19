import { JSX } from "preact";
import { useState } from "preact/hooks";
import { classSet } from "@fathym/atomic";

interface UploadsProps {
  onUpload: (file: File) => void;
}

export function Uploads(props: UploadsProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDragOver = (event: JSX.TargetedEvent<HTMLDivElement, DragEvent>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (event: JSX.TargetedEvent<HTMLDivElement, DragEvent>) => {
    event.preventDefault();
    setIsDragActive(false);

    const files = event.dataTransfer.files;
    if (files.length) {
      props.onUpload(files[0]);
    }
  };

  const onFileChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const files = event.currentTarget.files;
    if (files?.length) {
      props.onUpload(files[0]);
    }
  };

  return (
    <div
      class={classSet({
        "border-2 border-dashed border-gray-200 rounded p-6 mt-6": true,
        "bg-blue-100 border-blue-500": isDragActive,
      })}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input type="file" onChange={onFileChange} class="hidden" id="file-upload" />
      <label for="file-upload" class="cursor-pointer">
        <div class="text-center">
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </label>
    </div>
  );
}