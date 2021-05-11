import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    icon: IconProp,
}

const Button: React.FC<ButtonProps> = ({ icon, text, ...buttonProps }) => {
    return (<button type="button" className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg flex items-center" {...buttonProps}>
        <FontAwesomeIcon icon={icon} /> <span className="ml-1">{text}</span>
    </button>);
}

export default Button;