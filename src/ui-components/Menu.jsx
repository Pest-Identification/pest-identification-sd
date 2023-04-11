import React, { useRef, useState, useEffect, createRef } from 'react';
import { gsap } from "gsap";
import './Menu.scss';
import {default as ReportViewCollectionCustom} from './ReportViewCollectionCustom';
import { NewIdentification, ReferencePage, Post1, PostCollection} from '.';
import FReference from './FReference.jsx';

const items = [
  {
    name: "Home",
    color: "#f44336",
    component: FReference
  },
  {
    name: "Post",
    color: "#e91e63",
    component: Post1
  },
  {
    name: "Identify",
    color: "#9c27b0",
    component: NewIdentification
  },
  {
    name: "Discussion",
    color: "#673ab7",
    component: PostCollection
  },
  {
    name: "Reports",
    color: "#3f51b5",
    component: ReportViewCollectionCustom
  }
];

const Menu = () => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [active, setActive] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ComponentToRender = items[active].component;

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect();
    const activeItem = $items.current[active].current;
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: 'elastic.out(.7, .7)',
      duration: .8
    };

    gsap.to($indicator1.current, {
      ...settings,
    });

    gsap.to($indicator2.current, {
      ...settings,
      duration: 1
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    return (() => {
      window.removeEventListener('resize', animate);
    });
  }, [active, animate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (index) => {
    setActive(index);
    setIsMenuOpen(false);
  };

  return (
    <div className="menu-wrapper" >
      <div className={`menu ${isMenuOpen ? 'open' : 'closed'}`} ref={$root}>
        <div className="menu-header">
          <div className="menu-title">Menu</div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="menu-items">
          {items.map((item, index) => (
            <div
              key={item.name}
              ref={$items.current[index]}
              className={`item ${active === index ? 'active' : ''}`}
              onClick={() => {
                handleItemClick(index);
              }}
            >
              {item.name}
            </div>
          ))}
          <div
            ref={$indicator1}
            className="indicator"
          />
          <div
            ref={$indicator2}
            className="indicator"
          />
        </div>
      </div>
      <div className="component-wrapper">
      {<ComponentToRender />}
      </div>
    </div>
  );
};
//{<ComponentToRender />}

export default Menu;
