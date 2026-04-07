import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { TypographyH3 } from "@/components/ui/typography-h3";

export default function Home() {
  return (
    <div>
      <main>
        <TypographyH1>TypographyH1</TypographyH1>
        <TypographyH3>TypographyH3</TypographyH3>
        <Button variant={"outline"}>Test BTN</Button>
      </main>
    </div>
  );
}
