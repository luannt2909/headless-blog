import React from 'react';
import Link from 'next/link';

const TechnologyLabel = ({row}) => {
    return (
        <div key={row.id} className="mb-2 mr-4 inline-block">
            <span className="inline-block transform cursor-pointer rounded-full bg-black px-2 py-2 text-md font-small text-white transition duration-500 hover:-translate-y-1">
                {row.name}
            </span>
        </div>
    )
}
const Technology = ({technologies}) => {
    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Tech Stacks</h3>
            {technologies.map((c)=>(
                <TechnologyLabel row={c}/>
            ))}
        </div>
    );
};

export default Technology;
