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
        width={0}
        height={0}
        sizes="100vw"
        className="w-full hover:scale-110 transition"
        loading="lazy"
        placeholder="blur"
        blurDataURL={src}
      />
    </div>
  );
};
export default PropertyImg;
