import Image from "next/image";

export type CredentialSymbolType = "certificate" | "degree" | "course";

interface CredentialSymbolProps {
    type: CredentialSymbolType;
    className?: string;
}

export default function CredentialSymbol({
    type,
    className = "size-8 [image-rendering:pixelated]",
}: CredentialSymbolProps) {
    const iconPaths: Record<CredentialSymbolType, string> = {
        certificate: "/images/certificate.svg",
        degree: "/images/degree.svg",
        course: "/images/course.svg",
    };

    return (
        <Image
            src={iconPaths[type]}
            alt=""
            width={32}
            height={32}
            className={className}
            aria-hidden="true"
        />
    );
}
