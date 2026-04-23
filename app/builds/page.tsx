import { auth } from "@/auth";
import { TypographyH3 } from "@/components/ui/typography-h3";
import { getMyBuilds } from "@/lib/builds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/builds-card";
import { DeleteBuildButton } from "./components/delete-build-button";
import { deleteBuildAction, setBuildPublicAction } from "./actions";
import { TogglePublicButton } from "./components/toggle-public-button";

export default async function MyBuilds() {
    const session = await auth();

    if (!session?.user.id) {
        redirect('/login')
    }

    const currentUserId = session.user.id
    const builds = await getMyBuilds(session.user.id)

    return (
        <div className="py-6">
            <TypographyH3>Мои сборки</TypographyH3>
            <br />
            <div className="grid gap-4 lg:grid-cols-3">
                {
                    builds.length > 0 ? (
                        builds.map(b => (
                            <BuildCard
                                key={b.id}
                                build={b}
                                currentUserId={currentUserId}
                            >
                                <DeleteBuildButton
                                    buildId={b.id}
                                    deleteAction={deleteBuildAction} 
                                />
                                <TogglePublicButton
                                    buildId={b.id}
                                    isPublic={b.isPublic}
                                    toggleAction={setBuildPublicAction}
                                />
                            </BuildCard>
                        ))
                    ) : (
                        <p className="text-muted-foreground">Пока нет сохраненных сборок</p>
                    )
                }
            </div>
        </div>
    )
}