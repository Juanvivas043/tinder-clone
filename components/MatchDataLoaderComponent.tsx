import getPotentialMatches from "@/lib/actions/matches"
import MatchClientComponet from "./MatchClientComponet"

export default async function MatchDataLoaderComponent() {
    const potentialMatches = await getPotentialMatches()
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return (
        <MatchClientComponet potentialMatches={potentialMatches}/>
    )
}