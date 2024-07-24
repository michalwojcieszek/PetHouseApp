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
        alt={alt}
        width={100}
        height={100}
        sizes="100vw"
        className="w-full hover:scale-110 transition"
        loading="eager"
        // priority
        // placeholder="blur"
      />
    </div>
  );
};

export default PropertyImg;
