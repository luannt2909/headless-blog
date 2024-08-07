import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {About, Contact, CustomHead, Loader, Technology} from '../../components';
import {getAbout} from "../../services";

export const metadata = {
    title: 'Lucian About Me',
    description: 'Read more, know more, share more!',
    openGraph: {
        images: [
            {
                url: 'https://i.imgur.com/nl3N786.jpg', // Must be an absolute URL
                width: 800,
                height: 600,
            }
        ],
    },
}
const AboutPage = () => {
    const router = useRouter();
    const [aboutData, setAboutData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    // Just call this once when start
    useEffect(() => {
        getAbout().then((data) => {
            setAboutData(data)
            setDataLoaded(true);
        });
    }, []);

    if (router.isFallback) {
        return <Loader/>;
    }

    return (
        <div className="container mx-auto mb-8 px-10">
            <CustomHead title="About Me - Lucian Nguyen"/>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {dataLoaded && (
                    <>
                        <div className="col-span-1 lg:col-span-8">
                            <About data={aboutData}/>
                            {/* To know that what is the post that these comments belong to */}
                        </div>
                        <div className="col-span-1 lg:col-span-4">
                            <div className="relative top-8 lg:sticky">
                                <Contact contact={aboutData.contact}/>
                                <Technology technologies={aboutData.technologies}/>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AboutPage;
