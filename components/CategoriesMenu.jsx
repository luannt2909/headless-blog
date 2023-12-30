import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
      <nav className="relative py-2 md:float-right"
           onMouseEnter={handleCategoryHover}
           onMouseLeave={handleCategoryLeave}
      >
        <span
            className="font-bold rounded-md text-white cursor-pointer"
        >
          {selectedItem || 'Categories'}
        </span>
        {isHovered && (
            <ul className="absolute left-0 mt-1 rounded-md shadow bg-inherit">
              {categories.map(category => (
                  <li className="cursor-pointer" onClick={() => handleItemClick(category.name)}>
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                      <span className="py-2 cursor-pointer align-middle text-white font-semibold md:float-left bg-inherit">
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
