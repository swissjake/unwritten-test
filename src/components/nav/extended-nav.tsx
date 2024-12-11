import ContainerLayout from "../layout/container-layout";

const ExtendedNav = () => {
  return (
    <div className="h-[80px] fixed top-0 z-50 shadow-sm  w-full bg-white flex items-center">
      <ContainerLayout>
        <span className="text-[24px] font-bold">Where in the world?</span>
      </ContainerLayout>
    </div>
  );
};

export default ExtendedNav;
