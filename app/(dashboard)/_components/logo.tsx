import Image from "next/image";
import React from "react";

const logo = () => {
  return (
    <div className=" flex items-center gap-3">
     <Image src="/logo.svg" alt="logo" width={50} height={50} />
     <p className=" max-sm:hidden font-bold text-xl">MaiLms</p>
    </div>
  )
}

export default logo
