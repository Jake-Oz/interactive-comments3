const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col space-y-4 sm:ml-8 my-2 border-l-2 border-neutral-lightGray">
      {children}
    </div>
  );
};

export default CardContainer;
