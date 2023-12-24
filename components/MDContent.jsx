import React  from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './MDContent.module.css'
import CodeBlockMD from "./CodeBlockMD";
import Link from "next/link";
import {Typography} from "@mui/material";
import remarkSlug from 'remark-slug';

const LinkItem = ({children, href}) => {
    return (
        <Link href={href}>
            <span
                className="cursor-pointer text-md font-semibold text-blue-500 hover:underline hover:text-blue-600">{children}</span>
        </Link>
    )
}

const CustomImage = ({alt, src, title}) => (
    <>
        <img
            className="max-w-full h-auto mx-auto rounded-lg shadow-md border-2 border-gray-300"
            src={src}
            alt={alt}
            title={title}
        />
        {title && <p className="text-center text-sm mt-2 text-gray-600">{title}</p>}
    </>
);
const CustomBlockQuote = ({children}) => (
    <blockquote>
        <Typography className="bg-gray-200 border-l-4 border-blue-600 px-4 py-4 my-6 text-md italic font-medium leading-relaxed">{children}</Typography>
    </blockquote>
);
const CustomTable = ({children}) => (
    <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300">
            {children}
        </table>
    </div>
);

const CustomTableRow = ({children}) => (
    <tr className="bg-gray-100 border-b border-gray-300">{children}</tr>
);

const CustomTableCell = ({children}) => (
    <td className="p-4 border border-gray-300">{children}</td>
);
const CustomTableHeader = ({children}) => (
    <th className="p-4 border border-gray-300 bg-gray-200 font-semibold">
        {children}
    </th>
);

const Li = ({children}) => {
    return (
        <li className="bg-gray-50 border-gray-300 rounded">
            {children}
        </li>
    )
}
const CustomP = ({children}) => {
    return (
     <p className="text-lg"> {children}</p>
    )
}
const MDContent = ({content}) => {
    return (
        <article className="content">
            <ReactMarkdown className={styles.markdown}
                      remarkPlugins={[remarkGfm, remarkSlug]}
                      children={content}
                      components={{
                          p: CustomP,
                          code: CodeBlockMD,
                          a: LinkItem,
                          img: CustomImage,
                          blockquote: CustomBlockQuote,
                          table: CustomTable,
                          tr: CustomTableRow,
                          td: CustomTableCell,
                          th: CustomTableHeader,
                          li: Li,
                      }}
            />
        </article>
    )
}
export default MDContent;
