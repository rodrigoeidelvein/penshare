import {IconProp} from "@fortawesome/fontawesome-svg-core";

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