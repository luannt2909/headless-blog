import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {getCategories, getMyStatus} from '../services';
import CategoriesMenu from "./CategoriesMenu";
import MyStatus from "./MyStatus";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [me, setMe] = useState({});

  // Just call this once when start
  useEffect(() => {
    getCategories().then((newCate) => setCategories(newCate));
    getMyStatus().then((me) => setMe(me))

    const handleScroll = () => {
      const element = document.getElementById('header');
      if (element && window.scrollY > 0) {
        element.classList.add('bg-scroll');
      } else {
        element.classList.remove('bg-scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  return (
    <div className="container mx-auto mb-2 px-10 md:z-10 md:sticky top-0">
      <div id="header" className="inline-block w-full border-b border-blue-400 py-4 bg-cover bg-center">
        <div className="flex md:float-left">
          <a className="pr-4" href="/">
            <img src={'/header_logo.svg'}
                 alt="Lucian Blog"
                 height="42px" width="42px"
                 className="rounded-full align-middle text-white" />
          </a>
          <Link href="/">
            <span className="cursor-pointer text-4xl font-semibold text-white">
              Lucian Blog
            </span>
          </Link>
        </div>

        {(me && me.status && me.status !== '') && <MyStatus myStatus={me.status}/>}
        <div className="flex md:float-left md:contents">
          <Link href="/about">
            <span className="mt-2 mr-2 cursor-pointer align-middle font-semibold text-white md:float-right">
              About Me
            </span>
          </Link>

          <Link href="https://reminderbot.me" passHref target="_blank" rel="noreferrer">
            <a className="mt-2 mr-2 cursor-pointer align-middle font-semibold text-white md:float-right" target="_blank" rel="noreferrer">
              <span className="flex items-center">
                Reminder Bot
                <span className="text-gray-100 text-xs py-0 px-1 rounded-full animate-bounce">Free</span>
              </span>
            </a>
          </Link>
          <div className="cursor-pointer align-middle font-semibold text-white md:float-right">
            <CategoriesMenu categories={categories}/>
          </div>

        </div>

        {/*<div className="hidden md:float-left md:contents">*/}
        {/*  <CategoriesMenu categories={categories}/>*/}
        {/*</div>*/}

      </div>
    </div>
  );
};

export default Header;
