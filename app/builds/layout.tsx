import { ReactNode } from "react";

export default function BuildsLayout({
    children
}: { children: ReactNode }) {
    return (
        <div className="container mx-auto max-w-5xl">
            { children }
        </div>
    )
}