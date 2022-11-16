import styles from './Navbar.module.scss';

//ICONS FROM REACT-ICONS PACKAGE
import {
  MdOutlineDashboard,
  MdOutlineLogout,
} from 'react-icons/md';

import {
  FaUserAlt,
  FaPencilAlt,
} from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import { IoMdLogIn } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { VscDashboard } from 'react-icons/vsc';
import { useState } from 'react';
import Link from 'next/link';

interface NavPropsInterface {
  setCurrScreen: (url: any) => void;
  currScreen: string;
}

const Navbar = ({setCurrScreen, currScreen}: NavPropsInterface) => {
  const [nav, setnav] = useState(false);

  const NavUrl = ({ url, icon, description }: any) => {
    const checkWindowSize = () => {
      if (window.innerWidth < 730) setnav(!nav);
    };
    return (
      <li className={styles.li_navlink}>
        <Link
          style={{
            backgroundColor: currScreen === url ? 'black' : 'none'
          }}
          href={'/dashboard'}
          onClick={() => {
            setCurrScreen(url);
            checkWindowSize();
          }}
        >
          {icon}
          <span className={styles.description}>{description}</span>
        </Link>
      </li>
    );
  };

  return (
    <div
      className={`${styles.navbar_container} ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav className={nav ? styles.nav_great : styles.nav_small}>
        <div className={styles.logo}>
          <VscDashboard className={styles.logo_icon} />
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => setnav(!nav)}
          />
        </div>

        <ul className={styles.menu_container}>
          <span className={styles.categories}>
            {nav ? 'Pages' : <BsThreeDots />}
          </span>

          <NavUrl
            url="Modules"
            icon={<MdOutlineDashboard />}
            description="Modules"
          />

          <NavUrl
            url="SubModules"
            icon={<FiLayout />}
            description="SubModules"
          />

          <NavUrl
            url="Classrooms"
            icon={<FaPencilAlt />}
            description="Classrooms"
          />

          <NavUrl
            url="Users"
            icon={<FaUserAlt />}
            description="Users"
          />

          <span
            className={`${styles.categories} 
          ${styles.second_category}`}
          >
            {nav ? 'More' : <BsThreeDots />}
          </span>

          <NavUrl url="/other1" icon={<IoMdLogIn />} description="Auth" />

        </ul>

        <div
          className={styles.btn_logout}
          onClick={() => {
            setnav(!nav);
          }}
        >
          <MdOutlineLogout />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
