import Image from "next/image";

const Logo = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.svg" height={100} width={100} alt="logo_svg" />
        <h3>Academix</h3>
      </div>
    </>
  );
};

export default Logo;
