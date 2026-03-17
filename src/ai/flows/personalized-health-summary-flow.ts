'use server';
/**
 * @fileOverview A Genkit flow for generating a personalized health summary.
 *
 * - personalizedHealthSummary - A function that generates a natural-language summary of health risks and findings.
 * - PersonalizedHealthSummaryInput - The input type for the personalizedHealthSummary function.
 * - PersonalizedHealthSummaryOutput - The return type for the personalizedHealthSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const DiseasePredictionSchema = z.object({
  name: z.string().describe('The name of the disease prediction (e.g., "Heart Disease", "Diabetes").'),
  riskLevel: z.enum(['Low', 'Moderate', 'High']).describe('The calculated risk level for the disease.'),
  findings: z.string().describe('Key findings or details related to this specific disease prediction.'),
  recommendations: z.string().describe('Specific recommendations for this disease prediction.'),
});

const ImageAnalysisResultSchema = z.object({
  type: z.string().describe('The type of medical image analyzed (e.g., "Chest X-ray").'),
  detection: z.string().describe('The detection result from the image analysis (e.g., "Pneumonia Detected", "No Pneumonia Detected").'),
  findings: z.string().describe('Detailed findings from the medical image analysis.'),
  recommendations: z.string().describe('Specific recommendations based on the image analysis.'),
});

const PersonalizedHealthSummaryInputSchema = z.object({
  diseasePredictions: z.array(DiseasePredictionSchema).describe('An array of various disease risk prediction results.').optional(),
  imageAnalysisResults: z.array(ImageAnalysisResultSchema).describe('An array of medical image analysis results.').optional(),
  aiAssistantSummary: z.string().describe('A summary of key takeaways from the AI Health Assistant interactions.').optional(),
});
export type PersonalizedHealthSummaryInput = z.infer<typeof PersonalizedHealthSummaryInputSchema>;

// Output Schema
const PersonalizedHealthSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, natural-language summary of the overall health risk and key findings.'),
});
export type PersonalizedHealthSummaryOutput = z.infer<typeof PersonalizedHealthSummaryOutputSchema>;

// Wrapper function
export async function personalizedHealthSummary(input: PersonalizedHealthSummaryInput): Promise<PersonalizedHealthSummaryOutput> {
  return personalizedHealthSummaryFlow(input);
}

// Prompt definition
const prompt = ai.definePrompt({
  name: 'personalizedHealthSummaryPrompt',
  input: { schema: PersonalizedHealthSummaryInputSchema },
  output: { schema: PersonalizedHealthSummaryOutputSchema },
  prompt: `You are an AI assistant tasked with generating a concise, natural-language summary of a patient's overall health risk and key findings.
The summary should be easy to understand, focus on the most important aspects, and provide general guidance without offering medical diagnoses or prescribing treatments.

Based on the following patient data, create a summary:

{{#if diseasePredictions}}
Disease Risk Predictions:
{{#each diseasePredictions}}
- {{this.name}}: Risk Level: {{this.riskLevel}}. Findings: {{this.findings}}. Recommendations: {{this.recommendations}}
{{/each}}
{{/if}}

{{#if imageAnalysisResults}}
Medical Image Analysis:
{{#each imageAnalysisResults}}
- {{this.type}} Analysis: Detection: {{this.detection}}. Findings: {{this.findings}}. Recommendations: {{this.recommendations}}
{{/each}}
{{/if}}

{{#if aiAssistantSummary}}
AI Health Assistant Interactions Summary:
{{aiAssistantSummary}}
{{/if}}

Please provide a summary that includes:
1. An overall assessment of potential health risks.
2. Key findings from disease predictions and image analyses.
3. General guidance on next steps, such as consulting specialists, based on the provided recommendations.
4. Maintain a helpful, supportive, and non-prescriptive tone.
5. Emphasize that this is for informational purposes and not a substitute for professional medical advice.
6. Keep the summary concise and to the point.`,
});

// Flow definition
const personalizedHealthSummaryFlow = ai.defineFlow(
  {
    name: 'personalizedHealthSummaryFlow',
    inputSchema: PersonalizedHealthSummaryInputSchema,
    outputSchema: PersonalizedHealthSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
