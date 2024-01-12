import { useRef } from "react";
import { Group, Object3DEventMap, Vector3 } from "three";
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
        const isTablet = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // set the initial position of the model
        let targetPosition: Vector3 = new Vector3(-0.4, 0, 2);

        if (snapshot.intro) {
            if (isMobile) targetPosition = new Vector3(0, 2.5, 2.5);
            else if (isTablet) targetPosition = new Vector3(0, 0, 2);
        } else {
            targetPosition = new Vector3(
                ...(isMobile ? [0, 0, 2.5] : [0, 0, 2])
            );
        }

        // set model camrea positiin
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        // set the model rotation smoothly
        easing.dampE(
            groupRef.current?.rotation!,
            [state.pointer.y / 5, -state.pointer.x / 2.5, 0],
            0.25,
            delta
        );
    });

    return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
