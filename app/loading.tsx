import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        alt="Kavishka Dinajara logo"
        className="animate-pulse bg-blend-overlay mx-auto my-auto"
        height={150}
        src="/logo.png"
        width={150}
      />
    </div>
  );
};

export default Loading;
