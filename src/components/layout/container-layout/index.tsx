import { ReactNode } from "react";

const ContainerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1440px]  mx-auto xl:pl-[57px] xl:pr-[61px] px-5">
      {children}
    </div>
  );
};

export default ContainerLayout;
