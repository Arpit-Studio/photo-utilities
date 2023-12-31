import clsx from "clsx";
import { HiOutlineDocumentText, HiOutlineHome, HiViewGrid } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  const navlinks = [
    {
      label: "Dashboard",
      icon: HiOutlineHome,
      href: "/",
    },
    {
      label: "Photo Maker",
      icon: HiViewGrid,
      href: "photo-maker",
    },
    {
      label: "Passport/Citizenship Merge",
      icon: HiOutlineDocumentText,
      href: "image-merger",
    },
    
  ];
  return (
    <aside className="z-20 hidden w-64 overflow-y-auto  bg-gray-800 md:block flex-shrink-0">
      <div className="py-4  text-gray-400">
        <Link
          className="ml-6 text-lg font-bold  text-gray-200"
          to="">
          ArpitStudio
        </Link>
        <ul className="mt-6">
          {navlinks.map((nav,index) => (
            <li className="relative px-6 py-3" key={nav.href}>
              <NavLink
                className={({ isActive, isPending }) =>
                  clsx([
                    "realtive inline-flex items-center w-full text-sm font-semibold  transition-colors duration-150  hover:text-gray-200",
                    isActive ?"before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-purple-600 before:rounded-tr-lg before:rounded-br-lg":null,
                    isActive ? "text-gray-100" : null,
                  ])
                }
                to={nav.href} end>
                <nav.icon className="w-5 h-5" />
                <span className="ml-4">{nav.label}</span>
              </NavLink>
            </li>
          ))}
          
        </ul>
      </div>
    </aside>
  );
}
