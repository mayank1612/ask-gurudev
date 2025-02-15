import Image from "next/image";

const Glogo = ({ size }: { size?: number }) => {
  return (
    <Image
      src="/gurudev.png"
      alt="AskGurudev Logo"
      width={size ?? 50}
      height={size ?? 50}
      className="rounded-full"
      priority
    />
  );
};

export default Glogo;
