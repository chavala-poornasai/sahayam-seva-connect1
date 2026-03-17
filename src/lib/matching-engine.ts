
/**
 * @fileOverview Core logic for AI-powered volunteer matching.
 */

export interface VolunteerMatch {
  userId: string;
  name: string;
  score: number;
  explanation: string;
  reasons: string[];
}

export function calculateMatchScore(user: any, mission: any): VolunteerMatch {
  let score = 0;
  const reasons: string[] = [];

  // 1. Skill Match (+5 points per skill)
  const matchingSkills = user.skills?.filter((skill: string) => 
    mission.requiredSkills?.some((req: string) => req.toLowerCase() === skill.toLowerCase())
  ) || [];
  
  if (matchingSkills.length > 0) {
    score += matchingSkills.length * 5;
    reasons.push(`${matchingSkills.length} key skills matched`);
  }

  // 2. Location Match (+3 points)
  if (user.location?.toLowerCase() === mission.location?.toLowerCase()) {
    score += 3;
    reasons.push("Direct geographic proximity");
  }

  // 3. Urgency Boost (+2 points for high/critical)
  if (mission.urgency === 'high' || mission.urgency === 'critical') {
    score += 2;
    reasons.push("High-priority mission alignment");
  }

  // 4. Trust Bonus (Base 10% of trust score)
  const trustBonus = Math.floor((user.trustScore || 0) / 10);
  if (trustBonus > 0) {
    score += trustBonus;
    reasons.push(`High reputation bonus (+${trustBonus})`);
  }

  // Generate explanation
  const explanation = `Matched due to ${reasons.join(', ')}.`;

  return {
    userId: user.id,
    name: user.name || user.username,
    score,
    explanation,
    reasons
  };
}
