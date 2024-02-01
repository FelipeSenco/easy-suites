import React, { FC, useEffect, useRef } from "react";

type IIntersectionObserverContainerProps = {
  handleIntersection: () => unknown;
};

const IntersectionObserverContainer: FC<IIntersectionObserverContainerProps> = ({ handleIntersection }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries[0].isIntersecting && handleIntersection();
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return <div ref={observerRef}></div>;
};

export default IntersectionObserverContainer;
