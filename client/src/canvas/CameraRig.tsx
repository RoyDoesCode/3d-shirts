import { useRef } from "react";
import { Group, Object3DEventMap } from "three";
import { useSnapshot } from "valtio";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

import state from "../store";

interface CameraRigProps {
    children?: React.ReactNode;
}

const CameraRig = ({ children }: CameraRigProps) => {
    const groupRef = useRef<Group<Object3DEventMap>>(null);
    const snapshot = useSnapshot(state);

    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // set the initial position of the model

        // set the model rotation smoothly
        easing.dampE(
            groupRef.current?.rotation!,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        );
    });

    return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
