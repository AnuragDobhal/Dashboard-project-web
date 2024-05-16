"use client";
import { AiOutlineHome } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import SickTwoToneIcon from "@mui/icons-material/SickTwoTone";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import Diversity1SharpIcon from "@mui/icons-material/Diversity1Sharp";

const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Graphs",
    href: "/graphs",
    icon: GoGraph,
  },
  {
    name: "Symptoms",
    href: "/symptoms",
    icon: SickTwoToneIcon,
  },
  {
    name: "Vaccination",
    href: "/vaccination",
    icon: VaccinesOutlinedIcon,
  },
  {
    name: "Treatment",
    href: "/treatment",
    icon: LocalHospitalOutlinedIcon,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {/* {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />} */}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Diversity1SharpIcon className="sidebar__logo" />
          <p className="sidebar__logo-name">Wikitech.io</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    router.pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
