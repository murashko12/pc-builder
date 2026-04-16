import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  key: string;
  name: string;
  price: number;
  onClick?: () => void;
}

export function ComponentCard({
  name,
  price,
  onClick
}:Props) {
  return (
    <Card>
      <CardHeader className="min-h-0 flex-1 pb-2">
        <CardTitle className="text-base font-medium leading-tight">{name}</CardTitle>
        <CardDescription className="text-sm font-medium tabular-nums">
          { new Intl.NumberFormat('ru-RU').format(price) }
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button
          variant={"secondary"}
          size={"sm"}
          className="w-full gap-1.5"
          onClick={onClick}
        >
          Добавить
        </Button>
      </CardFooter>
    </Card>
  )
}