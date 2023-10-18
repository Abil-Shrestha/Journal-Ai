import { OpenAI } from 'langchain/llms/openai'
import { z } from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'


const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood:z.string().describe('The mood of the person who wrote this journal.'),
        subject:z.string().describe('The subject of this Journal Entry.'),
        color:z.string().describe('The hexadecimal code for color matching the mood of the entry. Green for happy, Red for unhappy and somewhere in between for neutral. For negative summaries always return Red.'),
        negative:z.boolean().describe('Is the journal negative ? ( does it contain negative emotions or experiences ?)'),
        summary: z.string().describe('quick summary of the entire entry.'),
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
    })
)

const getPrompt = async(content:any) => {
    const format_instructions  = parser.getFormatInstructions()

    const prompt = new PromptTemplate ({
        template:
        'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions  },
    })

    const input = await prompt.format({
        entry: content,
    })

    return input
}


export const analyse = async(prompt:any) => {
    const input = await getPrompt(prompt)
    const model = new OpenAI({temperature:0, modelName:'gpt-3.5-turbo'})
    const result = await model.call(input)
    try{
        return parser.parse(result)
    } catch (e) {
        console.error(e)
    }
}

const qa = async (question, entries) => {
    const docs = entries.map (entry => {
        return new Document({
            pageContent: entry.content,
            metadata: {id: entry.id, createdAt: entry.createdAt}
        })
    })
    const model = new OpenAI({temperature: 0, modelName:'gpt-3.5-turbo'})
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs,embeddings)
    const relevantDocs = await store.similaritySearch(question)
    const res = await chain.call({
        input_documnets:relevantDocs,
        question,
    })

    return res.output_text
}