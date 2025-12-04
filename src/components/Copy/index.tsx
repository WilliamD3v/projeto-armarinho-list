import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { CopyButton } from "./styled";

interface CopyCodProps {
  text: string;
}

export const CopyCod = ({ text }: CopyCodProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <CopyButton copied={copied} onClick={handleCopy}>
      <FiCopy size={18} />
    </CopyButton>
  );
};
