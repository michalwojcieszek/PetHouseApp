"use client";

import Image from "next/image";

type PropertyImgProps = {
  src: string;
  alt: string;
  id: string;
};

const PropertyImg = ({ src, alt }: PropertyImgProps) => {
  return (
    <div className="overflow-hidden">
      <Image
        src={src}
        alt={`Picture of ${alt}`}
        width={500}
        height={500}
        sizes="100vw"
        className="w-full hover:scale-110 transition"
        // loading="lazy"
        priority
        // fetchPriority="high"
        // // loading="lazy"
        // placeholder="blur"
        // blurDataURL={src}
      />
    </div>
  );
};
export default PropertyImg;
