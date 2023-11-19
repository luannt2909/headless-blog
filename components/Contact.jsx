import React from 'react';
import Link from 'next/link';

const iconMap = {
    mail: "/mail.png",
    github: "/github.png",
    linkedin: "/linkedin.png",
}
const ContactRow = ({row}) => {
    return (
        <div key={row.id} className="mt-2 mb-4 mr-4 row w-full items-center lg:mb-0 lg:w-auto">
            <img className="block md:float-left mr-2" src={iconMap[row.type]} width="24px" height="24px"/>
            <span className="text-md font-bold">{row.name}:</span>
            {row && row.is_link && row.link ? (
                <Link href={`${row.link}`}>
                    <span className="block cursor-pointer text-md text-right font-i text-blue-500 md:float-right">{row.value}</span>
                </Link>
            ) : (
                <span className="text-md font-bold md:float-right">{row.value}</span>
            )}
        </div>
    )
}
const Contact = ({contact}) => {
    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Contact</h3>
            {contact.map((c)=>(
                <ContactRow row={c}/>
            ))}

        </div>
    );
};

export default Contact;
