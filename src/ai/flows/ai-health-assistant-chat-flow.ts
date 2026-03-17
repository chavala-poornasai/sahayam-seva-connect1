'use server';
/**
 * @fileOverview An AI Health Assistant that provides explanations, guidance, and specialist suggestions.
 *
 * - aiHealthAssistantChat - A function that handles user queries for health assistance.
 * - AiHealthAssistantChatInput - The input type for the aiHealthAssistantChat function.
 * - AiHealthAssistantChatOutput - The return type for the aiHealthAssistantChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiHealthAssistantChatInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The user\u0027s symptoms or medical question. The assistant should provide easy-to-understand explanations of possible conditions, general guidance, and suggestions for appropriate specialists.'
    ),
});
export type AiHealthAssistantChatInput = z.infer<
  typeof AiHealthAssistantChatInputSchema
>;

const AiHealthAssistantChatOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'Easy-to-understand explanations of possible conditions based on the query.'
    ),
  guidance: z
    .string()
    .describe('General health guidance related to the query.'),
  specialistSuggestions: z
    .array(z.string())
    .describe('Suggestions for appropriate medical specialists to consult.'),
  disclaimer: z
    .string()
    .describe(
      'A clear disclaimer stating that this is not medical advice and should not replace professional medical consultation.'
    ),
});
export type AiHealthAssistantChatOutput = z.infer<
  typeof AiHealthAssistantChatOutputSchema
>;

export async function aiHealthAssistantChat(
  input: AiHealthAssistantChatInput
): Promise<AiHealthAssistantChatOutput> {
  return aiHealthAssistantChatFlow(input);
}

const aiHealthAssistantChatPrompt = ai.definePrompt({
  name: 'aiHealthAssistantChatPrompt',
  input: {schema: AiHealthAssistantChatInputSchema},
  output: {schema: AiHealthAssistantChatOutputSchema},
  prompt: `You are an AI Health Assistant designed to provide general health information, explanations of potential conditions based on symptoms, and suggestions for appropriate medical specialists. You MUST NOT provide medical advice, diagnose, or prescribe medications. Always emphasize that users should consult with a qualified healthcare professional for any health concerns. Your responses should be easy to understand.

User Query: {{{query}}}

Based on the user's query, please provide:
1. An easy-to-understand explanation of possible conditions.
2. General guidance.
3. Suggestions for appropriate medical specialists.
4. A clear disclaimer that your response is not medical advice.

Format your response as a JSON object with the following fields: explanation (string), guidance (string), specialistSuggestions (array of strings), and disclaimer (string).`,
});

const aiHealthAssistantChatFlow = ai.defineFlow(
  {
    name: 'aiHealthAssistantChatFlow',
    inputSchema: AiHealthAssistantChatInputSchema,
    outputSchema: AiHealthAssistantChatOutputSchema,
  },
  async input => {
    const {output} = await aiHealthAssistantChatPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI assistant.');
    }
    return output;
  }
);
