import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'

import { index_images } from "./components/ImagesSlider";

const IndexPage = () => {

  const listRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(true);
  const [animated, setAnimated] = useState('animate__fadeIn');

  // useEffect(() => {
  //   const listNode = listRef.current;
  //   const imgNode = listNode.querySelector("li > img")[currentIndex];
  //   if(imgNode){
  //     imgNode.scrollIntoView({
  //       behavior: 'smooth'
  //     });
  //   }

  // }, [currentIndex])

  const prevSlider = () => {
    if (currentIndex == 0) {
      setCurrentIndex(index_images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    setTimer(false);
  }

  const nextSlider = () => {
    if (currentIndex == (index_images.length - 1)) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    setTimer(false);
  }

  const autoSlider = () => {
    const timOut = setTimeout(() => {
      if (timer) {
        if (currentIndex == (index_images.length - 1)) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }, 5000);
    if (!timer) {
      clearTimeout(timOut);
    }
    return index_images.slice(currentIndex, (currentIndex + 2));
  }

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="page_index">
        <div className="page_index_slider">
          <div className="page_index_slider_main">
            <div className="slider_leftArrow" onClick={() => prevSlider()}>prev</div>
            <div className="slider_rightArrow" onClick={() => nextSlider()}>next</div>
            <div className="page_index_slider_container">
              <ul ref={listRef}>
                {autoSlider().map((item) => {
                  return (
                    <li key={item.id}>
                      <img src={item.image} alt="slider" width={500} height={200} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
