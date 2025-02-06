import { NavLink } from "react-router";

const links = [
  { text: "Главная", link: "/" },
  { text: "Добавить семинар", link: "create" },
];

export const Header = () => {
  return (
    <header className="p-5">
      <nav>
        <ul className=" flex gap-5 justify-center ">
          {links.map((link) => {
            return (
              <NavLink
                className="hover:text-gray-500 transition-colors ease-in text-2xl "
                key={link.link}
                to={link.link}>
                {link.text}
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
