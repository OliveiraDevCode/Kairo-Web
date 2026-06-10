import { HeaderProps } from "./header.types";

export default function Header({ title }: HeaderProps) {
    return (
        <header>
            {title}
        </header>
    );
}