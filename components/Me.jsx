import React from 'react';
import Image from 'next/image';
const Me = ({ me }) => {
    return (
        <div className="relative mt-20 mb-8 rounded-lg bg-black bg-opacity-80 p-12 text-center">
            <div className="absolute left-0 right-0 -top-14">
                <Image
                    src={me.profileImage}
                    unoptimized
                    alt={me.name}
                    height="100px"
                    width="100px"
                    className="rounded-full align-middle"
                />
            </div>
            <h3 className="my-4 text-xl font-bold text-white">{me.name}</h3>
            <p className="text-lg text-white">{me.bio}</p>
        </div>
    );
};

export default Me;
