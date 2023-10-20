import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import HistoryChart from '@/components/Recharts'

const getData = async() => {
    const user = await getUserByClerkID()
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id
        },
    })
    const sum = analyses.reduce((a,c) => a+c.sentimentScore ,0)
    const avg = Math.round(sum/analyses.length)
    return { analyses , avg }
}

const History = async () => {
    const { avg, analyses } = await getData()
    return (
    <div className="h-full w-full"> 
        <div>
            {`Avg Sentime ${avg}`}
        </div>
        <div className="h-full">
            <HistoryChart data={analyses} />
        </div>
    </div>
        )
}

export default History