import React from "react";
import {
  X,
  FileText,
  Image as ImageIcon,
  File,
  Icon
} from "lucide-react";
import Preview from "./Preview";

export interface UploadedFile {
  id: string;
  file: File;
  SelectType: string;
  status: "Ready" | "Converting" | "completed" | "error";
  errorMessage?: string;
}

interface FileCardProps {
  selectedFileType: string;
  fileData: UploadedFile;
  onRemove?: (id: string) => void;
}

export function FileCard({
  fileData,
  onRemove,
}: FileCardProps) {
  const { id, file, SelectType } = fileData;

  return (
    <div
      className="
        group relative
        h-[220px] w-[160px]
        rounded-xl border border-gray-200
        bg-white
        shadow-sm hover:shadow-md
        transition-all duration-200
        flex flex-col
        p-3
      "
    >
      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={() => onRemove(id)}
          className="
            absolute top-2 right-2
            opacity-0 group-hover:opacity-100
            text-gray-400 hover:text-red-500
            transition
          "
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Preview Area (Fixed Height) */}
      <div className="flex-1 flex items-center justify-center">
        <Preview selectedFileType={SelectType} file={file} />
      </div>

      {/* File Name (Fixed Height + Truncate) */}
      <div className="h-[36px] w-full mt-2">
        <p
          className="
            text-sm text-gray-700 text-center
            truncate
            overflow-hidden
            whitespace-nowrap
          "
          title={file.name}   // shows full name on hover
        >
          {file.name}
        </p>
      </div>
    </div>
  );
}

