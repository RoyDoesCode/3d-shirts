import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { useState } from "react";

import state from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
    DecalType,
    DecalTypes,
    EditorTabs,
    FilterTab,
    FilterTabs,
    EditorTab,
} from "../config/constants";
import {
    AIPicker,
    ColorPicker,
    CustomButton,
    FilePicker,
    Tab,
} from "../components";
import { reader } from "../config/helpers";

const Customizer = () => {
    const snapshot = useSnapshot(state);

    const [file, setFile] = useState<File>();
    const [promt, setPromt] = useState("");
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>("noTab");
    const [activeFilterTab, setActiveFilterTab] = useState<
        Partial<Record<FilterTab, boolean>>
    >({
        logoShirt: true,
        stylishShirt: false,
    });

    // show tab content based on the active tab
    const getTabContent = () => {
        switch (activeEditorTab) {
            case "colorPicker":
                return <ColorPicker />;
            case "filePicker":
                return (
                    <FilePicker
                        file={file}
                        setFile={(newFile) => setFile(newFile)}
                        readFile={readFile}
                    />
                );
            case "aiPicker":
                return <AIPicker />;
            default:
                return null;
        }
    };

    const handleDecals = (type: DecalType, result: string) => {
        const decalType = DecalTypes[type]!;

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };

    const handleActiveFilterTab = (filterTab: FilterTab) => {
        if (filterTab === "noTab") {
            state.isLogoTexture = true;
            state.isFullTexture = false;
        } else {
            state.isLogoTexture = !activeFilterTab[filterTab];
            state.isFullTexture = !activeFilterTab[filterTab];
        }
    };

    const readFile = (type: DecalType) => {
        if (!file) return;

        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("noTab");
        });
    };

    return (
        <AnimatePresence>
            {!snapshot.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation("left")}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        onClick={() =>
                                            setActiveEditorTab(tab.name)
                                        }
                                    />
                                ))}

                                {getTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute z-10 top-5 right-5"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            onClick={() => (state.intro = true)}
                            className="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>

                    <motion.div
                        className="filtertabs-container"
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                onClick={() => {}}
                                isFilterTab
                                isActiveTab=""
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
