interface TabProps {
    tab: { name: string; icon: string };
    onClick: () => void;
    isFilterTab?: boolean;
    isActiveTab?: string;
}

const Tab = ({}: TabProps) => {
    return <div>Tab</div>;
};

export default Tab;
