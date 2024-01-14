import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";

import state from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
    DecalType,
    decalTypes,
    editorTabs,
    FilterTab,
    filterTabs,
    EditorTab,
} from "../config/constants";
import { ColorPicker, CustomButton, FilePicker, Tab } from "../components";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { download } from "../assets";

const Customizer = () => {
    const snapshot = useSnapshot(state);

    const [file, setFile] = useState<File>();
    const [activeEditorTab, setActiveEditorTab] = useState<EditorTab>("noTab");
    const [activeFilterTab, setActiveFilterTab] = useState<
        Partial<Record<FilterTab, boolean>>
    >({
        logoShirt: true,
        fullShirt: false,
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
            default:
                return null;
        }
    };

    const setDecal = (type: DecalType, result: string) => {
        const decalType = decalTypes[type]!;

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    };

    const handleActiveFilterTab = (filterTab: FilterTab) => {
        if (filterTab === "logoShirt") {
            state.isLogoTexture = !activeFilterTab.logoShirt;
            setActiveFilterTab((prevState) => {
                return {
                    ...prevState,
                    [filterTab]: !activeFilterTab.logoShirt,
                };
            });
        } else if (filterTab === "fullShirt") {
            state.isFullTexture = !activeFilterTab.fullShirt;
            setActiveFilterTab((prevState) => {
                return {
                    ...prevState,
                    [filterTab]: !activeFilterTab.fullShirt,
                };
            });
        }
    };

    const readFile = (type: DecalType) => {
        if (!file) return;

        reader(file).then((result) => {
            setDecal(type, result);
            setActiveEditorTab("noTab");
        });
    };

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            const clicked = event.target as HTMLElement;
            if (
                !clicked.closest(".colorpicker-container") &&
                !clicked.closest(".filepicker-container") &&
                !clicked.closest(".editortabs-container")
            ) {
                setActiveEditorTab("noTab");
            }
        };
        document.body.addEventListener("click", closeMenu, false);

        return () =>
            document.body.removeEventListener("click", closeMenu, false);
    }, []);

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
                                {editorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        onClick={() =>
                                            setActiveEditorTab(
                                                activeEditorTab === tab.name
                                                    ? "noTab"
                                                    : tab.name
                                            )
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
                        {filterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                onClick={() => handleActiveFilterTab(tab.name)}
                                isActiveTab={activeFilterTab[tab.name]}
                                isFilterTab
                            />
                        ))}

                        <Tab
                            tab={{ name: "save", icon: download }}
                            onClick={downloadCanvasToImage}
                            isFilterTab
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
