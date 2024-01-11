import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
    const snapshot = useSnapshot(state);
    const { nodes, materials } = useGLTF("/shirt_baked.glb");

    const logoTexture = useTexture(snapshot.logoDecal);
    const fullTexture = useTexture(snapshot.fullDecal);

    return (
        <group>
            <mesh
                // @ts-expect-error
                geometry={nodes.T_Shirt_male.geometry}
                castShadow
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            ></mesh>
        </group>
    );
};

export default Shirt;
