import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import classNames from "classnames";

const TableOfContent = ({toc}) => {
    const [activeHeading, setActiveHeading] = useState('');
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Find the active heading based on the scroll position
            const activeHeading = toc.find((heading) => {
                const headingElement = document.getElementById(heading.slug);
                if (headingElement) {
                    const headingOffset = headingElement.offsetTop;
                    const headingHeight = headingElement.offsetHeight;
                    return scrollPosition >= headingOffset && scrollPosition < headingOffset + headingHeight;
                }

                return false;
            });

            if (activeHeading) {
                setActiveHeading(activeHeading.slug);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [toc]);
    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg hidden md:block lg:block">
            <h3 className="mb-8 border-b py-4 text-xl font-semibold">Table of Contents</h3>
            <div className="table-of-contents">
                <ul>
                    {toc.map((heading) => (
                        <li key={heading.slug} className="active">
                            <Link key={heading.slug} href={`#${heading.slug}`}>
                                <span
                                    className={classNames('mb-3 block cursor-pointer pb-3 hover:text-blue-500', {
                                        'font-bold': activeHeading === heading.slug,
                                        'text-lg': heading.level === 1,
                                        'text-md': heading.level === 2,
                                        'text-sm': heading.level >= 3,
                                    }, `ml-${Math.pow(2, heading.level-1)}`)}
                                >{heading.text}</span>
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default TableOfContent;
