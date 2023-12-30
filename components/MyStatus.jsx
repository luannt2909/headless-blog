import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Typical from 'react-typical';
import classNames from "classnames";
import { useRouter } from 'next/router';

const MyStatus = ({myStatus}) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handlePageLoad = () => {
      const countdownTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 12000);
      setIsVisible(true);
      return () => clearTimeout(countdownTimeout);
    }
    router.events.on('routeChangeComplete', handlePageLoad);

    return () => {
      router.events.off('routeChangeComplete', handlePageLoad);
    };
  }, []);
  const welcome = ["👋 Hi, I'm Lucian", 1000, "👋 I'm a Software Engineer", 1000, '👋 Welcome to my Blog!', 1000, myStatus];
  return  (
      <div>
        <div className="block md:float-left">
          {(isVisible) ? (
              <Typical className={classNames('ml-4 text-sm font-bold text-white hidden md:contents',
                  `typing-animation ${isVisible ? 'visible' : ''}`)} loop={1} steps={welcome}/>
          ) : (<span className='ml-4 text-sm font-bold text-white hidden md:contents'>{myStatus}</span>)}
        </div>
      </div>)
}
export default MyStatus;
