import React from 'react'
import '../css/videos.css'
import CardVIdeo from './CardVIdeo'

const Videos = ({ videos }) => {

    return (
        <>
            <div className='videos_main'>
                <div className='Videos_content'>
                    <div className='videos_text'>
                        <h1>INFORMATE</h1>
                    </div>
                    <div className='videos_cards'>
                        {videos.map((video) => {
                            return (
                                <div key={video.id}>
                                    <CardVIdeo video={video} />
                                </div>
                            )
                        })

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Videos
