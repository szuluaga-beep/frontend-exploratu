import Image from "next/image";

export const Logo = ({
  width = 100,
  height = 40,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <Image
      src="/Logo.svg"
      alt="ExploraTu Logo"
      width={width}
      height={height}
      className={`inline-block mr-2 ${className}`}
      priority={true}
    />
  );
};
