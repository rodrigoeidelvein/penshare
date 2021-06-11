import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    icon: IconProp,
}

const Button: React.FC<ButtonProps> = ({ icon, text, ...buttonProps }) => {
    return (<button type="button" {...buttonProps}>
        <span className="ml-1">{text}</span>
    </button>);
}

export default Button;