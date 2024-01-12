import { easing } from "maath";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import state from "../store";

const Shirt = () => {
    const snapshot = useSnapshot(state);
    const { nodes, materials } = useGLTF("/shirt_baked.glb");

    const logoTexture = useTexture(snapshot.logoDecal);
    const fullTexture = useTexture(snapshot.fullDecal);

    useFrame((_, delta) =>
        // @ts-ignore
        easing.dampC(materials.lambert1.color, snapshot.color, 0.25, delta)
    );

    return (
        <group key={JSON.stringify(state)}>
            <mesh
                // @ts-ignore
                geometry={nodes.T_Shirt_male.geometry}
                castShadow
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {snapshot.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}

                {snapshot.isLogoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        // @ts-ignore
                        anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    );
};

export default Shirt;
