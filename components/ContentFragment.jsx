import React from 'react';
import Link from "next/link";

const ContentFragment = ({contents}) => {
    return (
        <div>
            {contents.map((typeObj, index) => buildContentFragment(index, typeObj, typeObj.type))}
        </div>
    )
};

function buildContentFragment(index, obj, type) {
    const text = obj.text
    let modifiedText = text
    if (obj.children) {
        modifiedText = obj.children.map((item, i) => buildContentFragment(i, item, item.type))
    }
    if (obj) {
        if (obj.bold) {
            modifiedText = <b key={index}>{text}</b>;
        }

        if (obj.italic) {
            modifiedText = <em key={index}>{text}</em>;
        }

        if (obj.underline) {
            modifiedText = <u key={index}>{text}</u>;
        }

        if (obj.code) {
            modifiedText = <code key={index} className=" p-4 block bg-gray-300 text-gray-900 dark:text-white">{text}</code>
        }
    }
    if (type === 'heading') {
        const {level} = obj;
        type = `${type}-${level}`
    }

    switch (type) {
        case 'heading-1':
            return (
                <h1 key={index} className="mb-4 text-3xl font-semibold">
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                </h1>
            );
        case 'heading-2':
            return (
                <h2 key={index} className="mb-4 text-2xl font-semibold">
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                </h2>
            );
        case 'heading-3':
            return (
                <h3 key={index} className="mb-4 text-xl font-semibold">
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                </h3>
            );
        case 'paragraph':
            return (
                <p key={index} className="mb-8">
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                </p>
            );
        case 'heading-4':
            return (
                <h4 key={index} className="text-md mb-4 font-semibold">
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                </h4>
            );
        case 'image':
            return (
                <img
                    key={index}
                    alt={obj.title}
                    height={obj.height}
                    width={obj.width}
                    src={obj.src}
                />
            );

        case 'quote':
            return (
                <blockquote key={index}
                            className="p-4 my-4 border-s-4 border-gray-300 bg-gray-300 dark:border-gray-500 dark:bg-gray-800">
                    <p key={index} className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                        "{modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}"
                    </p>
                </blockquote>
            );
        case 'list':
            return (
                <div key={index} className="pl-8 p-2 my-4 bg-gray-50 border-gray-300">
                    {obj.format === 'ordered' ? (
                        <ol className="list-decimal">
                            {modifiedText}
                        </ol>
                    ) : (
                        <ul className="list-disc">
                            {modifiedText}
                        </ul>
                    )}
                </div>
            )
        case 'list-item':
            return (
                <li key={index}>
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                </li>
            )
        case 'link':
            return (
                <Link key={index} href={obj.url}>
                    <span key={index} className="block cursor-pointer text-md font-i text-blue-500">
                    {modifiedText.map((item, i) => (
                        <React.Fragment key={i}>{item}</React.Fragment>
                    ))}
                    </span>

                </Link>
            )
        default:
            return modifiedText;
    }
}

export default ContentFragment;