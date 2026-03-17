'use server';
/**
 * @fileOverview A clinical AI agent for medical image and document analysis.
 *
 * - analyzeMedicalImage - A function that handles X-ray and Prescription analysis.
 * - MedicalImageAnalysisInput - The input type for the analysis function.
 * - MedicalImageAnalysisOutput - The return type for the analysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalImageAnalysisInputSchema = z.object({
  imageUri: z
    .string()
    .describe(
      "A medical image (X-ray or Prescription) as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  type: z.enum(['xray', 'prescription']).describe('The type of medical document to analyze.'),
});
export type MedicalImageAnalysisInput = z.infer<typeof MedicalImageAnalysisInputSchema>;

const MedicalImageAnalysisOutputSchema = z.object({
  detection: z.string().describe('Short summary of what was detected (e.g., "Normal", "Pneumonia", "Verified Prescription").'),
  findings: z.string().describe('Detailed clinical findings from the image.'),
  recommendations: z.string().describe('Actionable medical recommendations or next steps.'),
});
export type MedicalImageAnalysisOutput = z.infer<typeof MedicalImageAnalysisOutputSchema>;

// Internal schema for the prompt to handle Handlebars logic
const InternalPromptInputSchema = MedicalImageAnalysisInputSchema.extend({
  isXray: z.boolean(),
  isPrescription: z.boolean(),
});

export async function analyzeMedicalImage(input: MedicalImageAnalysisInput): Promise<MedicalImageAnalysisOutput> {
  return analyzeMedicalImageFlow(input);
}

const analyzeMedicalImagePrompt = ai.definePrompt({
  name: 'analyzeMedicalImagePrompt',
  input: {schema: InternalPromptInputSchema},
  output: {schema: MedicalImageAnalysisOutputSchema},
  prompt: `You are a highly skilled clinical AI specialist. Your task is to analyze medical imagery or documents provided by the user.

{{#if isXray}}
Analyze this Chest X-ray. Look for signs of pneumonia, consolidation, pleural effusion, cardiomegaly, or other pulmonary abnormalities. 
Examine the lung fields, cardiac silhouette, and pleural spaces.
{{/if}}

{{#if isPrescription}}
Analyze this Doctor's Prescription. Identify the medications, dosages, frequencies, and any recorded diagnosis or patient instructions. Use OCR to handle difficult handwriting.
List the medications clearly in the findings.
{{/if}}

Photo: {{media url=imageUri}}

Provide your response in a structured JSON format including detection, findings, and recommendations. 

DISCLAIMER: Always emphasize this is for clinical support and not a final diagnosis. Ensure the tone is professional and clinical.`,
});

const analyzeMedicalImageFlow = ai.defineFlow(
  {
    name: 'analyzeMedicalImageFlow',
    inputSchema: MedicalImageAnalysisInputSchema,
    outputSchema: MedicalImageAnalysisOutputSchema,
  },
  async input => {
    // Prepare input with boolean flags for standard Handlebars logic
    const promptInput = {
      ...input,
      isXray: input.type === 'xray',
      isPrescription: input.type === 'prescription',
    };

    const {output} = await analyzeMedicalImagePrompt(promptInput);
    if (!output) {
      throw new Error('Failed to analyze the medical image.');
    }
    return output;
  }
);
