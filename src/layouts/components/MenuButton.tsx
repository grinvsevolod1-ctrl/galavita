import { IoMenu } from "react-icons/io5";
import type { FC } from "react";

interface Props {
  onClick: () => void;
}

const MenuButton: FC<Props> = ({ onClick }) => (
  <button
    className="lg:hidden p-2 text-xl text-text-dark dark:text-white"
    onClick={onClick}
    aria-label="Открыть меню"
  >
    <IoMenu />
  </button>
);

export default MenuButton;
