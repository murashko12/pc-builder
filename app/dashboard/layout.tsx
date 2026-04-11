import { ReactNode } from "react";

export default function DashboardLayout({
    children
}: { children: ReactNode }) {
    return (
        <div className="container mx-auto max-w-5xl mt-8">
            { children }
        </div>
    )
}