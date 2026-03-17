
'use server';
/**
 * @fileOverview A Multilingual Civic AI Assistant for Sahayam Sewa Connect.
 * Provides guidance on volunteering, community impact, and mission matching in regional languages.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CivicAiAssistantInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The user\'s question about volunteering, civic engagement, or community help.'
    ),
  language: z
    .string()
    .describe('The language in which the response must be generated (e.g., Telugu, Hindi, Tamil).')
    .default('English'),
});
export type CivicAiAssistantInput = z.infer<typeof CivicAiAssistantInputSchema>;

const CivicAiAssistantOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A helpful, motivating response explaining how the user can contribute or clarifying civic concepts.'
    ),
  guidance: z
    .string()
    .describe('Specific actionable steps the user can take to increase their civic impact or score.'),
  suggestedMissionTypes: z
    .array(z.string())
    .describe('Types of missions that match the user\'s query.'),
  disclaimer: z
    .string()
    .describe(
      'A statement that this is an AI-powered assistant designed for community guidance.'
    ),
});
export type CivicAiAssistantOutput = z.infer<typeof CivicAiAssistantOutputSchema>;

export async function civicAiAssistantChat(
  input: CivicAiAssistantInput
): Promise<CivicAiAssistantOutput> {
  return civicAiAssistantFlow(input);
}

const civicAiAssistantPrompt = ai.definePrompt({
  name: 'civicAiAssistantPrompt',
  input: { schema: CivicAiAssistantInputSchema },
  output: { schema: CivicAiAssistantOutputSchema },
  prompt: `You are the Sahayam Sewa Connect Civic AI Assistant. Your goal is to help citizens find meaningful volunteer opportunities and provide information about civic engagement.

CRITICAL INSTRUCTION: You MUST respond in the following language: {{{language}}}. All fields in the JSON output (explanation, guidance, suggestedMissionTypes, disclaimer) MUST be in the native script of {{{language}}}.

You should offer suggestions on how to improve a user's 'Seva Score' and suggest specific types of missions based on their interests. Maintain a motivating, professional, and community-focused tone.

User Query: {{{query}}}

Based on the user's query, please provide:
1. A motivating explanation or answer in {{{language}}}.
2. Actionable guidance to improve civic impact in {{{language}}}.
3. Suggested mission types in {{{language}}}.
4. A disclaimer that this is an AI assistant in {{{language}}}.

Format your response as a JSON object with the following fields: explanation (string), guidance (string), suggestedMissionTypes (array of strings), and disclaimer (string).`,
});

const civicAiAssistantFlow = ai.defineFlow(
  {
    name: 'civicAiAssistantFlow',
    inputSchema: CivicAiAssistantInputSchema,
    outputSchema: CivicAiAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await civicAiAssistantPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the Civic AI assistant.');
    }
    return output;
  }
);
