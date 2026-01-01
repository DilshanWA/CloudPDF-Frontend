import React, { useState } from "react";
import { Files, Plus } from "lucide-react";

interface OperationDetails {
  description: string;
  buttonLabel: string;
}

export const operationDetails: Record<
  "convert" | "merge" | "compress" | "split",
  OperationDetails
> = {
  convert: {
    description:
      "Convert your files quickly and easily. Supported formats include PDF, Word, Excel, and more.",
    buttonLabel: "Convert PDF",
  },
  merge: {
    description: "Merge multiple PDF files into a single document seamlessly.",
    buttonLabel: "Merge PDF",
  },
  compress: {
    description:
      "Compress your PDF files to reduce their size without compromising quality.",
    buttonLabel: "Compress PDF",
  },
  split: {
    description: "Split your PDF files into smaller, manageable documents.",
    buttonLabel: "Split PDF",
  },
};

interface OperationPanelProps {
  files: File[];
  operationtype: "convert" | "merge" | "compress" | "split";
  title: string;
  accept: string;
  isProcessing: boolean;
  onAddMoreFilesClick: (files: FileList) => void;
  onOperationClick: () => void;
  qualityOption: "low" | "medium" | "high";
  setQualityOption: (v: "low" | "medium" | "high") => void;
  SelectType?: string;
}

export function Sidebar({
  files,
  operationtype,
  title,
  isProcessing,
  onAddMoreFilesClick,
  onOperationClick,
  accept,
  qualityOption,
  setQualityOption,
  SelectType,
}: OperationPanelProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [mergeImages, setMergeImages] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onAddMoreFilesClick(e.target.files);
    e.target.value = "";
  };

  return (
    <aside className="w-full md:w-[420px] p-6 flex flex-col bg-white shadow-lg py-30">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      <p className="text-gray-700 mb-6">
        {operationDetails[operationtype].description}
      </p>

      {SelectType === "Image" && (
        <label
          htmlFor="separateImagePDF"
          className="mb-4 flex items-center gap-2 text-sm font-medium italic text-gray-600"
        >
          <input
            type="checkbox"
            id="separateImagePDF"
            checked={mergeImages}
            onChange={(e) => setMergeImages(e.target.checked)}
          />
          Merge images into a single PDF file
        </label>
      )}

      {operationtype === "compress" ? (
        <div className="mb-6">
          <label htmlFor="compressionLevel" className="block font-medium mb-1">
            Compression Level:
          </label>
          <select
            id="compressionLevel"
            value={qualityOption}
            onChange={(e) => setQualityOption(e.target.value as any)}
            className="border z-50 w-full mt-3 border-gray-300 rounded py-3 px-3"
          >
            <option value="low">Low (smaller size, lower quality)</option>
            <option value="medium">Medium (Recommended)</option>
            <option value="high">High (better quality, larger size)</option>
          </select>
        </div>
      ) : (operationtype === "split" && files.length > 0) ? 
        <>
        <div className="mb-6">
          <label htmlFor="splitOption" className="block font-medium mb-1">
            Split Option:
          </label>
          <select
            id="splitOption"
            className="border z-50 w-full mt-3 border-gray-300 rounded py-3 px-3"
          >
            <option value="everyPage">Split every page into a separate PDF</option>
            <option value="customRange">Split by custom page ranges</option>
          </select>
          
        </div>
        </>
      : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex justify-center items-center gap-2 py-4 bg-gray-200 rounded font-semibold cursor-pointer text-black transition-colors focus:outline-none"
        >
          Add More Files
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={onOperationClick}
        disabled={
          isProcessing || (operationtype === "merge" && (files?.length ?? 0) <= 1)
        }
        className={`w-full mt-6 py-4 rounded font-semibold cursor-pointer text-white transition-colors focus:outline-none ${
          isProcessing || (operationtype === "merge" && (!files || files.length <= 1))
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
        aria-busy={isProcessing}
      >
        {isProcessing
          ? `${operationDetails[operationtype].buttonLabel}...`
          : operationDetails[operationtype].buttonLabel}
      </button>
    </aside>
  );
}
