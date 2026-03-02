import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysis, IssueCategory, TicketPriority } from './types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function analyzeTicket(title: string, description: string): Promise<AIAnalysis> {
  try {
    const prompt = `You are an IT support expert. Analyze this support ticket and provide:
1. Appropriate category (hardware/software/network/account/other)
2. Priority level (low/medium/high/critical)
3. Step-by-step solution to resolve the issue

Ticket Title: ${title}
Ticket Description: ${description}

Provide your response in this JSON format:
{
  "suggestedCategory": "category",
  "suggestedPriority": "priority",
  "reasoning": "Brief analysis and step-by-step solution to fix this issue"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      return {
        suggestedCategory: analysis.suggestedCategory as IssueCategory,
        suggestedPriority: analysis.suggestedPriority as TicketPriority,
        reasoning: analysis.reasoning,
      };
    }
    
    throw new Error('Invalid AI response format');
  } catch (error) {
    console.error('AI analysis error:', error);
    return {
      suggestedCategory: 'other',
      suggestedPriority: 'medium',
      reasoning: 'AI analysis unavailable. Please provide more details about your issue.',
    };
  }
}
