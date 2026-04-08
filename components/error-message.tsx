type Props = {
    message: string
}

export function ErrorMessage({
    message
}: Props) {
    return (
        <p className="text-sm text-destructive" role="alert">
            { message }
        </p>
    )
}