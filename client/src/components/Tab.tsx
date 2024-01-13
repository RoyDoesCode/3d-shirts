import { useSnapshot } from "valtio";
import clsx from "clsx";

import state from "../store";
import { useMemo } from "react";

interface TabProps {
    tab: { name: string; icon: string };
    onClick: () => void;
    isFilterTab?: boolean;
    isActiveTab?: string;
}

const Tab = ({ tab, onClick, isFilterTab, isActiveTab }: TabProps) => {
    const snapshot = useSnapshot(state);

    const activeStyles: React.CSSProperties = useMemo(() => {
        return isFilterTab && isActiveTab
            ? { backgroundColor: snapshot.color, opacity: 0.5 }
            : { backgroundClip: "transparent", opacity: 1 };
    }, [isFilterTab, isActiveTab]);

    return (
        <div
            key={tab.name}
            onClick={onClick}
            className={clsx(
                "tab-btn",
                isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
            )}
            style={activeStyles}
        >
            <img
                src={tab.icon}
                alt={tab.name}
                className={clsx(
                    isFilterTab
                        ? "w-2/3 h-2/3"
                        : "w-11/12 h-11/12 object-contain"
                )}
            />
        </div>
    );
};

export default Tab;
