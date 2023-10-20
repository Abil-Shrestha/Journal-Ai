import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { analyse } from '@/utils/ai'

export const POST = async () => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
        data:{
            userId: user.id,
            content:'Write your journal',
        },
    })
    
    const analysis = await analyse(entry.content)
    await prisma.analysis.create({
        data:{
            userId: user.id,
            entryId: entry.id,
            ...analysis,
        },
    })

    revalidatePath('/journal')

    return NextResponse.json({data:entry})
}