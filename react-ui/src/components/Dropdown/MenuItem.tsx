import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AnchorHTMLAttributes} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string,
    icon: IconProp,
    iconClass?: string
}

const MenuItem: React.FC<AnchorProps> = ({ icon, text, iconClass, ...anchorProps }) => {
    return (
        <a
            className="bg-white text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
            role="menuitem"
            {...anchorProps}
        >
            <FontAwesomeIcon icon={icon} className={iconClass}/>
            <span>{text}</span>
        </a>)
}

export default MenuItem;