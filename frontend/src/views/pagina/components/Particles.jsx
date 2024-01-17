import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import logo from '../../../images/icon.png'

const Particulas = () => {

    const particlesInit = async (main) => {
        await loadFull(main);
    };
    
    return (
        <>
            <Particles
                className="particles_wrapper"
                id="tsparticles"
                init={particlesInit}
                width="100%"
                height="200px"
                options={{
                    fullScreen: {
                        enable: false,
                        zIndex: -1,
                    },
                    
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            // onHover: {
                            //     enable: true,
                            //     mode: "repulse",
                            // },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 1,
                            },
                            // repulse: {
                            //     distance: 50,
                            //     duration: 0.4,
                            // },
                        },
                    },
                    particles: {
                        background:{
                            color: '#fff',
                        },
                        color: {
                            value: "#000",
                        },
                        links: {
                            color: "#000",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: true,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1500,
                            },
                            value: 200,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: false,
                }}
            />
        </>
    )
}

export default Particulas
