'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { NextPage } from "next"

const VideoPlayer: NextPage = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate)
            video.addEventListener('loadedmetadata', handleLoadedMetadata)
            document.addEventListener('fullscreenchange', handleFullscreenChange)

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate)
                video.removeEventListener('loadedmetadata', handleLoadedMetadata)
                document.removeEventListener('fullscreenchange', handleFullscreenChange)
            }
        }
    }, [])

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }, [isPlaying])

    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }, [])

    const handleLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }, [])

    const handleSeek = useCallback((value: number[]) => {
        if (videoRef.current) {
            videoRef.current.currentTime = value[0]
            setCurrentTime(value[0])
        }
    }, [])

    const handleVolumeChange = useCallback((value: number[]) => {
        if (videoRef.current) {
            const newVolume = value[0]
            videoRef.current.volume = newVolume
            setVolume(newVolume)
            setIsMuted(newVolume === 0)
        }
    }, [])

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }, [isMuted])

    const handleRewind = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10
            setCurrentTime(videoRef.current.currentTime)
        }
    }, [])

    const handleFastForward = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10
            setCurrentTime(videoRef.current.currentTime)
        }
    }, [])

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }, [])

    const handleFullscreenChange = useCallback(() => {
        setIsFullscreen(!!document.fullscreenElement)
    }, [])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className={`mx-auto ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'max-w-4xl'}`}>
            <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-video'}`}>
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    src="https://e6fbb24c-5b00-45ed-9489-e10e17253514.selstorage.ru/Люди в чёрном (1997).mp4"
                    onClick={togglePlay}
                />
            </div>
            <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2">
                    <span>{formatTime(currentTime)}</span>
                    <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={(value) => setCurrentTime(value[0])}
                        onValueCommit={handleSeek}
                        className="flex-grow"
                    />
                    <span>{formatTime(duration)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={togglePlay}>
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleRewind}>
                            <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleFastForward}>
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={toggleMute}>
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                        <Slider
                            value={[volume]}
                            max={1}
                            step={0.01}
                            onValueChange={handleVolumeChange}
                            className="w-24"
                        />
                        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
