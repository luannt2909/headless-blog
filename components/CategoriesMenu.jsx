import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SvgIcon = () => {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
        />
      </svg>
  );
};

const CategoriesMenu = ({categories}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleCategoryHover = () => {
    setIsHovered(true);
  };

  const handleCategoryLeave = () => {
    setIsHovered(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsHovered(false);
  };


  return (
      <nav className="relative py-2 mr-2 md:float-right"
           onMouseEnter={handleCategoryHover}
           onMouseLeave={handleCategoryLeave}
      >
        <button
            className="inline-flex font-bold w-full justify-center rounded-md mr-2 focus:outline-none text-white cursor-pointer"
        >
          Categories
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {isHovered && (
            <ul className="absolute left-0 right-0 w-max mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              {categories.map(category => (
                  <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={()=> handleItemClick(category.name)}>
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                      <span className="inline-flex text-md text-gray-700 font-medium hover:text-gray-900">
                        {/*<SvgIcon/>*/}
                       {category.name}
                      </span>
                    </Link>
                  </li>
              ))}

            </ul>
        )}
      </nav>
  );
}
export default CategoriesMenu;
