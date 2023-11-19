import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {About, Contact, Loader, Technology,} from '../../components';
import {getAbout} from "../../services";


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
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {dataLoaded && (
                    <>
                        <div className="col-span-1 lg:col-span-8">
                            <About data={aboutData}/>
                            {/* To know that what is the post that these comments belong to */}
                        </div>
                        <div className="col-span-1 lg:col-span-4">
                            <div className="relative lg:sticky-top">
                                <Contact contact={aboutData.contact}/>
                            </div>
                            <div className="relative top-4 lg:sticky-bottom">
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
