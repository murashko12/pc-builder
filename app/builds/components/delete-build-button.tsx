'use client'

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

type Props = {
    buildId: string;
    deleteAction: (formData: FormData) => void;
}

export function DeleteBuildButton({
    buildId,
    deleteAction
}: Props) {
    const [isPending, startTransition ] = useTransition()

    const handleClick = () => {
        if (!confirm('Удалить сборку?')) {
            return
        }

        const formData = new FormData()
        formData.set('buildId', buildId)

        startTransition(() => deleteAction(formData))
    }

    return (
        <Button
            type={"button"}
            variant={"destructive"}
            size={"sm"}
            disabled={isPending}
            onClick={handleClick}
        >
            Удалить
        </Button>
    )
}