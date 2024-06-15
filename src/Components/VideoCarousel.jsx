import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { highlightsSlides } from '../constants';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';

const VideoCarousel = () => {
    // Refs to keep track of what video is in focus
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    // state for video
    const [video, setVideo] = useState({
        // figure out which video is playing
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    // State for loaded data
    const [loadedData, setLoadedData] = useState([]);

    // destructure values
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    // Animations
    useGSAP(() => {
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    }, [isEnd,videoId]) //update whenever video changes

    // playing of the video itself
    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                // pause the video at the end
                videoRef.current[videoId].pause();
            } else {
                // Find specific video ref to play, and play it
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    // take previously loaded data
    const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e])

    // useeffect to play videos
    useEffect(() => {
        const currentProgress = 0;
        // get span of video currently playing
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animate the video's progress bar
            let anim = gsap.to(span[videoId], {
                // When animation updates
                onUpdate: () => {
                    
                },

                // When animation completes
                onComplete: () => {

                }
            })

        }
    }, [videoId, startPlay]) //recall video when videoid changes or when startPlay variable changes

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                // spread the previous video state, and set the end to true, then increment video ID
                setVideo((pre) => ({...pre, isEnd: true, videoId: i + 1}))
                break;

            case 'video-last':
                // spread the previous video, set isLastVideo to true
                setVideo((pre) => ({...pre, isLastVideo: true }))
                break;
                
            case 'video-reset':
                // spread previous video, set isLastVideo to false, set videoId to 0
                setVideo((pre) => ({...pre, isLastVideo: false, videoId: 0 }))
                break;

            case 'play':
                // spread previous video, set isPlaying to opposite of previous isPlaying
                setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying }))
                break;
        
            default:
                // return the video
                return video;
        }
    }

  return (
    <>
        <div className='flex items-center'>
            {/* map over highlights list */}
            {highlightsSlides.map((list, i) => (
                <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        {/* Black container for video */}
                        <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                            {/* Get each video */}
                            <video
                                id='video'
                                playsInline={true}
                                preload='auto'
                                muted
                                // Find the index in the array of videoRefs and set it to the current element
                                ref={(el) => {videoRef.current[i] = el}}
                                onPlay={() => {
                                    setVideo((prevVideo) => ({
                                        // spread all information about the video, set isPlaying to true
                                        ...prevVideo, isPlaying: true
                                    }))
                                }}
                                // get triggered with the event once metadata of video is loaded
                                onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                            >
                                <source src={list.video} type='video/mp4' />
                            </video>
                        </div>

                        {/* Div for the text that goes with the videos */}
                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text) => (
                                <p key={text} className='md:text-2xl text-xl font-medium'>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* div for play controls */}
        <div className='relative flex-center mt-10'>
            <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                {videoRef.current.map((_, i) => (
                    <span
                        key={i}
                        // Whenever there is a new video add it to the videoDivRef array
                        ref={(el) => (videoDivRef.current[i] = el)}
                        className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                    >
                        {/* use a similar ref to above but add to videoSpanRef */}
                        <span className='absolute h-full w-full rounded-full' ref={(el) => (videoSpanRef.current[i] = el)} />
                    </span>
                ))}
            </div>

            {/* button */}
            <button className='control-btn'>
                {/* render replay, play, and pause */}
                <img src={isLastVideo ? replayImg : !isPlaying ? playImg: pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause' } 
                
                // handleProcess function is used on click to handle the play or reset
                onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying
                    ? () => handleProcess('play')
                    : () => handleProcess('pause')
                } />
            </button>
        </div>
    </>
  );
};

export default VideoCarousel