import { useRef } from "react";
import { Group, Object3DEventMap } from "three";
import { useSnapshot } from "valtio";

import state from "../store";

interface CameraRigProps {
    children?: React.ReactNode;
}

const CameraRig = ({ children }: CameraRigProps) => {
    const groupRef = useRef<Group<Object3DEventMap>>(null);
    const snapshot = useSnapshot(state);

    return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
