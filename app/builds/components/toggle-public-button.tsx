'use client'

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Share2 } from "lucide-react";

type Props = {
    buildId: string;
    isPublic: boolean;
    toggleAction: (formData: FormData) => void;
}

export function TogglePublicButton({
    buildId,
    isPublic,
    toggleAction
}: Props) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        const formData = new FormData();
        formData.set('buildId', buildId);
        formData.set('isPublic', (!isPublic).toString());
        startTransition(() => toggleAction(formData));
    }

    return (
        <Button
            type="button"
            variant={isPublic ? "default" : "ghost"}
            size="sm"
            disabled={isPending}
            onClick={handleClick}
        >
            <Share2 className={`h-4 w-4 mr-1 ${isPublic ? 'fill-background' : ''}`} />
        </Button>
    );
}