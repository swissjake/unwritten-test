type ComponentVisibilityProps = {
  children: React.ReactNode;
  isVisible: boolean;
};

const ComponentVisibility = ({
  children,
  isVisible,
}: ComponentVisibilityProps) => {
  return isVisible ? children : null;
};

export default ComponentVisibility;
