type RemoveButtonProps = {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const RemoveButton = ({ children, onClick }: RemoveButtonProps) => {
  return (
    <button
      className="font-semibold bg-red-600 rounded-md py-1 px-4 text-white hover:opacity-80 tracking-wid mt-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default RemoveButton;
