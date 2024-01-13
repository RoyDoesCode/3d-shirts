import clsx from "clsx";
import { CSSProperties } from "react";
import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";

type ButtonType = "filled" | "outline";

interface CustomButtonProps {
    type: ButtonType;
    title: string;
    onClick: () => void;
    className?: string;
}

const CustomButton = ({
    type,
    title,
    onClick,
    className,
}: CustomButtonProps) => {
    const snapshot = useSnapshot(state);

    const generateStyle = (type: ButtonType): CSSProperties | undefined => {
        switch (type) {
            case "filled":
                return {
                    backgroundColor: snapshot.color,
                    color: getContrastingColor(snapshot.color),
                };
            case "outline":
                return {
                    borderWidth: "1px",
                    borderColor: snapshot.color,
                    color: snapshot.color,
                };
        }
    };

    return (
        <button
            className={clsx("px-2 py-1.5 flex-1 rounded-md", className)}
            style={generateStyle(type)}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default CustomButton;
