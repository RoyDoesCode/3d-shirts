import { useSnapshot } from "valtio";
import { SketchPicker } from "react-color";

import state from "../store";

const COLOR_PRESETS = [
    "#6c757d",
    "#5e72e4",
    "#718093",
    "#9b59b6",
    "#546e7a",
    "#bdc3c7",
    "#95a5a6",
    "#27ae60",
    "#34495e",
    "#d35400",
    "#734f3f",
    "#3498db",
];

const ColorPicker = () => {
    const snapshot = useSnapshot(state);
    return (
        <div className="absolute left-full ml-3">
            <SketchPicker
                color={snapshot.color}
                onChange={(color) => (state.color = color.hex)}
                disableAlpha
                presetColors={COLOR_PRESETS}
            />
        </div>
    );
};

export default ColorPicker;
