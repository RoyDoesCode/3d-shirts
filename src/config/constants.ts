import { swatch, fileIcon, logoShirt, stylishShirt } from "../assets";

export type EditorTab = "colorPicker" | "filePicker" | "noTab";
export type FilterTab = "logoShirt" | "fullShirt" | "noTab";
export type DecalType = "logoDecal" | "fullDecal";

export const editorTabs: { name: EditorTab; icon: string }[] = [
    {
        name: "colorPicker",
        icon: swatch,
    },
    {
        name: "filePicker",
        icon: fileIcon,
    },
];

export const filterTabs: { name: FilterTab; icon: string }[] = [
    {
        name: "logoShirt",
        icon: logoShirt,
    },
    {
        name: "fullShirt",
        icon: stylishShirt,
    },
];

export const decalTypes: Partial<
    Record<
        DecalType,
        {
            stateProperty: DecalType;
            filterTab: FilterTab;
        }
    >
> = {
    logoDecal: {
        stateProperty: "logoDecal",
        filterTab: "logoShirt",
    },
    fullDecal: {
        stateProperty: "fullDecal",
        filterTab: "fullShirt",
    },
};
