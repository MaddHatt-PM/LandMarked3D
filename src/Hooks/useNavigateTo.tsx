import { useNavigate } from "react-router";
import windowEvents from "../WindowEvents/window-events";

export const PAGES = {
    initLoad: "/",
    "location-viewer": "location-viewer",
} as const;

export type PageTypes = keyof typeof PAGES;


interface navigateToProps {
    page: PageTypes;
    id?: any;
}


export function useNavigateTo() {
    const navigate = useNavigate();

    const navigateTo = (props: navigateToProps): void => {
        window.dispatchEvent(new CustomEvent(windowEvents.onPreNavigate));

        const destination = props.page + (props.id ? `/${props.id}` : '');
        navigate(destination);
    };

    return navigateTo;
}