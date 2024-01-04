import React, {useEffect, useState} from 'react';
import Link from "next/link";
import classNames from "classnames"
import {getCategories} from "../services";

const CategoriesTab = ({slug}) => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then(categories => setCategories(categories))
    },[slug])
    return (
        <div
            className="my-8 flex text-center tracking-wider text-white text-sm sm:text-xs md:text-base xl:text-lg 2xl:text-xl">
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
              <span
                  className={classNames('flex-1 px-1 md:px-2 py-2 rounded shadow border',
                      {
                          'bg-white text-gray-900': category.slug === slug,
                          'text-white hover:bg-blue-900 transition duration-150 cursor-pointer hover:font-semibold': category.slug !== slug
                      })}
              >
            {category.name}
            </span>
                </Link>
            ))}
        </div>
    )
}
export default CategoriesTab;