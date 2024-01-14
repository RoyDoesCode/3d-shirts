interface AIPickerProps {
    prompt: string;
    setPrompt: (newPromt: string) => void;
    generatingImg: boolean;
    handleSubmit: () => void;
}

const AIPicker = ({
    prompt,
    setPrompt,
    generatingImg,
    handleSubmit,
}: AIPickerProps) => {
    return <div>AIPicker</div>;
};

export default AIPicker;
