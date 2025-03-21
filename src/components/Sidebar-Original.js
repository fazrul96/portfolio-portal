import React, { useState } from 'react';

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarSubMenu,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
  CDBBadge,
  CDBIcon,
} from 'cdbreact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faFileAlt,
  faChartLine,
  faGraduationCap,
  faCertificate,
  faTools,
  faEnvelope,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

import { Image } from 'react-bootstrap';

import profileImage from '../../../portfolio-portal/src/assets/img/profile-img.jpg';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true); // Change this state to control visibility

  if (!isVisible) {
    return null; // Return null when the sidebar should be hidden
  }

  const circularImageStyle = {
    width: '150px', // Adjust this to your desired size
    height: '150px', // Same value as width to maintain circular shape
    objectFit: 'cover', // To ensure the image covers the entire circle
    borderRadius: '50%', // To make it a circle
  };

  const menuItems = [
    { to: '#portfolio', icon: "th-large", text: "Dashboard", hasBadge: true, badgeValue: 6, type: "menu"},
    { to: '#projects', icon: faBriefcase, text: "Project", iconType: "solid", type: "submenu" },
    { to: '#experiences', icon: faFileAlt, text: "Experience", iconType: "solid", type: "submenu" },
    { to: '#educations', icon: faGraduationCap, text: "Education", iconType: "solid", type: "submenu" },
    { to: '#certifications', icon: faCertificate, text: "Certification", iconType: "solid", type: "submenu" },
    { to: '#skills', icon: faTools, text: "Skill & Tools", iconType: "solid", type: "submenu" },
    { to: '#contacts', icon: faEnvelope, text: "Contact", iconType: "solid", type: "submenu" },
    {
      href: 'https://spring-boot-app.mfzrl.cyou/swagger-ui/index.html',
      icon: "th-large",
      text: 'OpenAPI',
      target: '_blank',
      type: "menu"
    },
    {
      href: 'https://mfbr.medium.com/kali-linux-beginner-guide-installation-window-bf12d6ced470',
      icon: "th-large",
      text: 'Medium',
      target: '_blank',
      hasBadge: true,
      badgeValue: 1,
      type: "menu"
    },
    { to: '#kalilinux', icon: faTools, text: "KALI Linux", iconType: "solid", type: "submenu" },
  ];

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<CDBIcon icon="bars" size="lg" />}>
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
          src="https://seeklogo.com/images/B/butterfly-logo-0A00378822-seeklogo.com.png"
          alt="logo"
          style={{ width: '30px' }} />
          <h6 className="ms-2">Fazrul Romli ™</h6>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image src={profileImage} roundedCircle style={circularImageStyle} />
        </div>
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu>
          {menuItems.map((menuItem, index) => (
            <CDBSidebarMenuItem
              key={index}
              to={menuItem.to}
              target={menuItem.target || '_self'}
              icon={menuItem.icon}
              iconType={menuItem.iconType || "regular"}
              suffix={menuItem.hasBadge ? <CDBBadge color="danger" size="medium" borderType="pill">{menuItem.badgeValue}</CDBBadge> : null}
            >
              {menuItem.type === 'submenu' && (
                <FontAwesomeIcon icon={menuItem.icon} className="mr-2" />
              )}

              {menuItem.text}
            </CDBSidebarMenuItem>
          ))}
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <div className="social-media text-center mt-4">
        <a href="https://www.linkedin.com/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-2x mr-3"></i>
        </a>
        <a href="https://www.twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
      </div>
      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{ padding: '20px 5px'}}
        >
          Copyright Fazrul Romli @ 2023. All rights reserved.
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
