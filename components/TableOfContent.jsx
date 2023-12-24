import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import slugify from 'slugify';
import classNames from "classnames";

const TableOfContent = ({content}) => {
    const [headings, setHeadings] = useState([]);
    const [activeHeading, setActiveHeading] = useState('');
    useEffect(() => {
        const parseHeadings = (markdown) => {

            const regex = /^(#{1,6})\s(.+)/gm;
            const matches = [];
            let match;

            while ((match = regex.exec(markdown)) !== null) {
                const level = match[1].length;
                const text = match[2];
                const slug = slugify(text, {lower: true, strict: true});
                const heading = {level, text, slug, children: []}
                matches.push(heading);
            }

            setHeadings(matches);
        };
        parseHeadings(content);
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Find the active heading based on the scroll position
            const activeHeading = headings.find((heading) => {
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
    }, [headings]);
    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Table of Contents</h3>
            <div className="table-of-contents">
                <ul>
                    {headings.map((heading) => (
                        <li key={heading.slug} className="active">
                            <Link key={heading.slug} href={`#${heading.slug}`}>
                                <span
                                    className={classNames('mb-3 block cursor-pointer pb-3 hover:text-blue-500', {
                                        'font-bold': activeHeading === heading.slug,
                                    })}
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
