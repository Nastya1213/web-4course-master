import Link from 'next/link';
import React from 'react';

interface BackLinkProps {
  href: string;
  text?: string;
}

const BackLink: React.FC<BackLinkProps> = ({ href, text = '<< назад' }) => {
  return (
    <Link href={href} className="text-blue-500 hover:underline">
      {text}
    </Link>
  );
};

export default BackLink;
