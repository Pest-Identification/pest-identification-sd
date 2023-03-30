import React, { useRef, useState, useEffect, createRef } from 'react';
import { gsap } from "gsap";
import './Menu.scss';
import {default as ReportViewCollectionCustom} from './ReportViewCollectionCustom';
import { NewIdentification, ReferencePage, Post1, PostCollection} from '.';

const items = [
  {
    name: "Discussion",
    color: "#f44336",
    component: PostCollection
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
    name: "Reference",
    color: "#673ab7",
    component: ReferencePage
  },
  {
    name: "Reports",
    color: "#3f51b5",
    component: ReportViewCollectionCustom
  }
];

const Menu = (renderPage) => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [active, setActive] = useState(0);
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

  return (
    <div
      ref={$root}
      className="menu"
    >
      {items.map((item, index) => (
        <div
          key={item.name}
          ref={$items.current[index]}
          className={`item ${active === index ? 'active' : ''}`}
          onClick={() => {
            setActive(index);
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
      <div className="component-wrapper">
        {ComponentToRender && <ComponentToRender />}
      </div>
    </div>
  );
};

export default Menu;
