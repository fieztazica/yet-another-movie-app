/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-empty */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-imports */
// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-multi-assign */
/* eslint-disable import/no-named-as-default */

'use client'

import React from 'react'

import VideoJS from '@/components/VideoJS'

type Props = {
    item: Item
}

function Player({ item }: Props) {
    const playerRef = React.useRef(null)

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: item.m3u8,
                type: 'application/x-mpegURL',
            },
        ],
    }

    const handlePlayerReady = (player: unknown) => {
        playerRef.current = player

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting')
        })

        player.on('dispose', () => {
            videojs.log('player will dispose')
        })
    }

    return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
}

export default Player
