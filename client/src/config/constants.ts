import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export type EditorTab = "colorPicker" | "filePicker" | "aiPicker" | "noTab";
export type FilterTab = "logoShirt" | "stylishShirt" | "noTab";
export type DecalType = "logoDecal" | "fullDecal";

export const EditorTabs: { name: EditorTab; icon: string }[] = [
    {
        name: "colorPicker",
        icon: swatch,
    },
    {
        name: "filePicker",
        icon: fileIcon,
    },
    {
        name: "aiPicker",
        icon: ai,
    },
];

export const FilterTabs: { name: FilterTab; icon: string }[] = [
    {
        name: "logoShirt",
        icon: logoShirt,
    },
    {
        name: "stylishShirt",
        icon: stylishShirt,
    },
];

export const DecalTypes: Partial<
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
        filterTab: "stylishShirt",
    },
};
