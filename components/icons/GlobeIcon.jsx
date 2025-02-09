import Svg, {Circle, Path} from "react-native-svg";

const GlobeIcon = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="10"/>
            <Path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            <Path d="M2 12h20"/>
        </Svg>
    );
};

export default GlobeIcon;