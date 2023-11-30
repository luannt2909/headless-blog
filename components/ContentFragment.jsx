import React from 'react';
import Link from "next/link";
import {BlocksRenderer} from '@strapi/blocks-react-renderer';
import {Typography} from "@mui/material";
import CodeBlock from "./CodeBlock";


const Code = ({children}) => {
    if (children.length === 1){
        const {text} = children[0].props
        return <CodeBlock text={text}/>
    }
    return (
        <pre>
            <code className="language-go">
                <Typography className="pl-2 rounded bg-gray-700 text-gray-100 dark:text-white">{children}</Typography>
            </code>
        </pre>
    )
}

const List = ({children, format}) => {
    return (
        <div className="pl-8 p-2 my-4 bg-gray-50 border-gray-300 rounded">
            {format === 'ordered' ? (
                <ol className="list-decimal">
                    {children}
                </ol>
            ) : (
                <ul className="list-disc">
                    {children}
                </ul>
            )}
        </div>
    )
}
const ListItem = ({children}) => {
    return (
        <li>
            <Typography>{children}</Typography>
        </li>
    )
}
const Heading = ({children, level, className}) => {
    switch (level) {
        case 1:
            return <Typography className={className} variant="h1">{children}</Typography>
        case 2:
            return <Typography className={className} variant="h2">{children}</Typography>
        case 3:
            return <Typography className={className} variant="h3">{children}</Typography>
        case 4:
            return <Typography className={className} variant="h4">{children}</Typography>
        case 5:
            return <Typography className={className} variant="h5">{children}</Typography>
        case 6:
            return <Typography className={className} variant="h6">{children}</Typography>
        default:
            return <Typography className={className} variant="h1">{children}</Typography>
    }
}

const Quote = ({children}) => {
    return (
        <blockquote
            className="p-4 my-4 rounded border-s-4 border-gray-300 bg-gray-200 dark:border-gray-500 dark:bg-gray-800">
                <Typography  className="text-md italic font-medium leading-relaxed text-gray-900 dark:text-white">{children}</Typography>
        </blockquote>
    )
}
const LinkItem = ({children, url}) => {
    return (
        <Link href={url}>
            <span className="cursor-pointer text-md font-semibold text-blue-500">{children}</span>
        </Link>
    )
}
const Image = ({title, height, width, src}) => {
    return (
        <img
            alt={title}
            height={height}
            width={width}
            src={src}
        />
    );
}
const ContentFragment = ({contents}) => {
    return (
        <BlocksRenderer content={contents}
                        blocks={{
                            // You can use the default components to set class names...
                            paragraph: ({children}) => <p className="text-lg mb-4">{children}</p>,
                            // ...or point to a design system
                            heading: ({children, level}) => <Heading className="mb-4 mt-4 font-semibold" children={children} level={level}/>,
                            // For links, you may want to use the component from your router or framework
                            link: ({children, url}) => <LinkItem children={children} url={url}/>,
                            // code: ({children}) => <CodeBlock children={children}/>,
                            code: ({children}) => <Code>{children}</Code>,
                            quote: ({children}) => <Quote children={children}/>,
                            list: ({children, format}) => <List children={children} format={format}/>,
                            'list-item': ({children}) => <ListItem children={children}/>,
                        }}
                        modifiers={{
                            bold: ({children}) => <strong>{children}</strong>,
                            italic: ({children}) => <span className="italic">{children}</span>,
                            code: ({children}) => <code
                                className="block bg-gray-800 text-white dark:text-white">{children}</code>
                        }}
        />
    )
};

export default ContentFragment;