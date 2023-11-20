import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import {getCategories, getMyStatus} from '../services';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [me, setMe] = useState({});

  // Just call this once when start
  useEffect(() => {
    getCategories().then((newCate) => setCategories(newCate));
    getMyStatus().then((me) => setMe(me))
  }, []);

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-b border-blue-400 py-8">
        <div className="block md:float-left pr-4">
          <a href="/">
            <img src={'/header_logo.svg'}
                 alt="Lucian Blog"
                 height="42px" width="42px"
                 className="rounded-full align-middle" />
          </a>
        </div>
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold text-white">
              Lucian Blog
            </span>
          </Link>
        </div>
        {(me && me.status && me.status !== '') && (
            <div className="block md:float-left">
              <span className="ml-4 text-xl font-bold text-white">
                ({me.status})
              </span>
            </div>
        )
        }
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="block md:float-left md:contents">
          <Link href="/about">
            <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
              About
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
