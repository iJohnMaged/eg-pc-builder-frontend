interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const GlowingButton = (props: GlowingButtonProps) => {
  return (
    <div className="grid items-start justify-center gap-8 w-max">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-yellow-600 to-purple-600 rounded-lg filter blur-lg opacity-75 group-hover:opacity-100 transition duration-200"></div>
        <button
          className="relative flex items-center py-4 leading-none bg-black divide-x divide-gray-600 rounded-lg px-7"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      </div>
    </div>
  );
};
export default GlowingButton;
