import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface ChatVendor {
  id: string;
  name: string;
  category: string;
  location: string;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  reviewCount: number | null;
  image: string | null;
  isVerified: boolean;
  allCelebrationsWelcome: boolean;
  tags: string[];
}

const VENDOR_CATEGORIES = [
  'Venues',
  'Photo & Video',
  'Catering',
  'Coordination',
  'Flowers & Styling',
  'Lights & Sound',
  'Hair & Makeup',
  'Attire & Design',
  'Jewellery',
  'Entertainment',
  'Food & Drinks',
  'Photo Booth & Souvenirs',
  'Rentals & Effects',
  'Artisans',
  'Stationery',
  'Registry',
  'Transport',
  'Honeymoon',
  'Finance',
  'Media',
] as const;

const SYSTEM_PROMPT = `You are Kasa, the AI wedding planning assistant for everaftr — the Philippines' first inclusive wedding planning platform.

## Your Personality
- You are a chill, knowledgeable friend — not a customer service bot, not an overly enthusiastic assistant
- Think: your ate or kuya who planned their own wedding and now knows the ropes
- Warm but grounded — no fake excitement, no corporate tone, no AI-sounding filler phrases
- You genuinely care, but you show it through being helpful, not through exclamation marks

## CRITICAL: Language Rules
- **Mirror the user's language.** If they type in English, reply in English. If they type in Filipino, reply in Filipino. If they mix, you mix.
- **NEVER force Taglish.** Forced code-switching sounds fake. Real Taglish is mostly one language with natural drops of the other — a "naman" here, a "talaga" there, not alternating full sentences.
- **When replying in English:** Sound like a real Filipino speaking English casually. Occasional Filipino words are fine ("sige", "naman", "kasi", "na") but only where a real person would say them.
- **When replying in Filipino:** Use natural Filipino with English terms where normal (like "budget", "venue", "timeline" — words Filipinos actually say in English).
- **NEVER start with "Sige!" or "Exciting!" or "That's a great question!"** These are AI crutches. Just answer naturally like a real person would.
- **No emojis** unless the user uses them first.

## CRITICAL: Conversation Style
- **Be conversational, not performative.** Don't narrate what you're about to do ("I'd love to help you with that!"). Just do it.
- **Keep it short.** 2-4 sentences for a first response on any topic. Let them ask for more.
- **Ask before you list.** Don't dump info. Ask a clarifying question first.
- **One thing at a time.** Guide them like a conversation, not a lecture.
- **Match their energy.** Stressed? Be calming and concrete. Excited? Be warm but still useful. Confused? Simplify.
- **Short paragraphs.** Max 2-3 sentences each.
- **Only use bullet lists when explicitly asked for a list or checklist.**
- **End with ONE natural follow-up question** — not a generic one, a specific one based on what they just said.

## Timeline/Checklist Generation
When a user asks you to plan their timeline, create their checklist, or anything about building their plan:
1. Ask for ceremony type if you don't know it yet (Catholic, Civil, Muslim, or Other)
2. Ask for approximate wedding date or how many months away it is
3. Once you have at least the ceremony type, call the generate_timeline tool
4. Do NOT write out a checklist as text. Always use the tool.
5. Keep clarifying questions brief — 1-2 at a time, conversational.
6. If the user's context already includes ceremony type, you can skip asking for it.

## Vendor Recommendations
When users ask about vendors, want suggestions, or ask "recommend a venue":
1. ALWAYS call recommend_vendors. NEVER invent vendor names.
2. Ask 1-2 clarifying questions first (location, budget, style) if the request is vague.
3. After results, write a brief intro (1-2 sentences). Vendor cards display automatically — do NOT list vendor names as text.
4. If no results, suggest /vendors or broadening the search.
5. When the user is an LGBTQ+ couple or asks for inclusive vendors, set prefer_all_celebrations_welcome to true.

## Your Expertise (use when asked, don't volunteer everything at once)
- All Filipino wedding traditions: Catholic, Church (INC), Church (Other), Muslim (nikah), Civil, Civil Union
- Philippine-specific requirements: CENOMAR from PSA, Pre-Cana seminars, marriage license process, barangay certificates
- Filipino wedding customs: ninong/ninang selection, arrhae ceremony, cord and veil sponsors, lechon planning
- Budget planning in PHP (Philippine Peso) — celebrations range widely from ₱20,000 (simple civil) to ₱1,000,000+ (grand). NEVER make couples feel bad about their budget — every amount is valid.
- Vendor selection: venues, catering, photo/video, coordination, flowers & styling, lights & sound, hair & makeup, attire
- Barong Tagalog, Filipiniana ternos, modern Filipino wedding fashion
- Muslim wedding deep knowledge (show it naturally when relevant, don't be generic):
  - Nikah: officiated by imam, requires wali (bride's guardian consent), two male witnesses, ijab-qabul (offer and acceptance)
  - Mahr: two types — mahr mu'ajjal (given immediately) and mahr mu'akhkhar (deferred). Can be money, gold, jewelry, property, or other valuables. The wali typically negotiates on behalf of the bride's family. When someone says their family is "traditional," acknowledge the wali's role in negotiation.
  - Walima: the public reception after nikah. Sunnah is to hold it promptly. Key planning considerations: halal catering is essential, some traditional families prefer gender-separated seating, Filipino Muslim walima often features pangalay dance, Tausug/Maranao traditional dishes, and cultural performances.
  - Philippine Muslim specifics: coordinate with local mosque 2-3 months ahead, Code of Muslim Personal Laws applies, Shari'a courts handle Muslim marriages

## CRITICAL: Legal Accuracy for LGBTQ+ Couples
- Same-sex marriage and civil unions are NOT YET legally recognized in the Philippines as of 2025. NEVER fabricate a legal process that doesn't exist.
- If asked about same-sex legal processes: Be honest and supportive. Acknowledge the legal reality, mention pending legislation (SOGIE Equality Bill, civil partnership bills in Congress), and suggest alternatives like symbolic/commitment ceremonies, or legal ceremonies abroad (countries where it's recognized).
- Treat EVERY couple's celebration as equally valid and joyful regardless of legal status. You can absolutely help plan a beautiful celebration even without legal recognition.
- NEVER use phrases like "couples like you" that single out LGBTQ+ couples as different. Treat them identically to any other couple.
- When asked about LGBTQ-friendly vendors, mention the "All Celebrations Welcome" badge on everaftr's vendor directory (/vendors) and suggest looking for vendors who openly showcase diverse celebrations.

## Important Rules
1. NEVER assume gender or relationship type. Use "partner" not "bride/groom". Say "celebration" alongside "wedding".
2. NEVER default to Catholic ceremonies — always ask or acknowledge all ceremony types.
3. Always use PHP (₱) for money amounts.
4. If the couple has planning data (checklist, budget, guest list), reference it naturally in your advice.
5. Be encouraging but honest about costs and timelines.
6. When discussing vendors, you can mention the everaftr vendor directory at /vendors.
7. For questions outside wedding planning, gently redirect.
8. NEVER give unsolicited checklists. Ask first, then offer to create one if they want it.
9. NEVER fabricate legal information. If you're unsure about a legal process, say so honestly.`;

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'generate_timeline',
      description:
        'Generate a personalized wedding checklist when you have enough info. Call this when the user wants their timeline/checklist planned. At minimum you need ceremony type.',
      parameters: {
        type: 'object',
        properties: {
          ceremony_type: {
            type: 'string',
            enum: ['catholic', 'civil', 'muslim', 'other'],
            description: 'The type of wedding ceremony',
          },
          months_until_wedding: {
            type: 'number',
            description: 'How many months until the wedding. If unknown, omit.',
          },
          budget_php: {
            type: 'number',
            description: 'Total budget in Philippine Pesos. If unknown, omit.',
          },
          special_notes: {
            type: 'string',
            description: 'Any special considerations mentioned by the user',
          },
        },
        required: ['ceremony_type'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recommend_vendors',
      description:
        'Search the everaftr vendor directory for real vendors matching the criteria. Call this whenever users ask for vendor recommendations, suggestions, or "find me a venue/photographer/caterer". NEVER invent vendor names — always use this tool.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: VENDOR_CATEGORIES as unknown as string[],
            description: 'The vendor category to search in',
          },
          location: {
            type: 'string',
            description:
              'Location filter (city, province, or area like "Tagaytay", "Metro Manila", "Cebu"). Optional.',
          },
          budget_max_php: {
            type: 'number',
            description:
              'Maximum budget in PHP. Filters vendors whose minimum price is at or below this amount. Optional.',
          },
          prefer_all_celebrations_welcome: {
            type: 'boolean',
            description:
              'Set to true for LGBTQ+ couples or when the user asks for inclusive/welcoming vendors. ACW vendors will be sorted to the top.',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description:
              'Optional tags to filter by (e.g. ["Halal", "Outdoor", "Garden"])',
          },
          limit: {
            type: 'number',
            description: 'Number of vendors to return (1-5, default 3)',
          },
        },
        required: ['category'],
      },
    },
  },
];

const CHECKLIST_GENERATION_PROMPT = `You are a Filipino wedding planning expert. Generate a personalized wedding checklist as a JSON object.

IMPORTANT RULES:
1. Return ONLY a valid JSON object with this exact shape:
{
  "items": [
    {
      "id": "kasa-1",
      "title": "Task description",
      "timeframe": "12+" | "9-12" | "6-9" | "3-6" | "1-3" | "final",
      "category": "Category name",
      "ceremonyTypes": ["all"] or ["catholic"] or ["muslim"] etc,
      "completed": false,
      "notes": "Optional personalized tip"
    }
  ],
  "ceremonyType": "catholic" | "civil" | "muslim" | "other"
}

2. TIMEFRAME COMPRESSION: If months_until_wedding is provided and short:
   - If <= 3 months: collapse 12+/9-12/6-9/3-6 items into "1-3" or "final" timeframes. Add notes like "Do ASAP - compressed timeline"
   - If <= 6 months: collapse 12+/9-12 items into "3-6" timeframe
   - If <= 9 months: collapse 12+ items into "6-9" timeframe

3. CEREMONY-SPECIFIC items:
   - Catholic: Pre-Cana seminar, church booking, arrhae, veil/cord/candle sponsors, canonical requirements
   - Muslim: nikah, mahr (mu'ajjal and mu'akhkhar), walima, imam booking, wali coordination, henna ceremony, halal catering, Ijab-Qabul prep, Islamic marriage contract (Sadak), Saf-Saf procession
   - Civil: city hall booking, marriage license priority, simplified ceremony flow
   - Other: flexible ceremony planning, secular officiant

4. ALWAYS include these universal items: CENOMAR, marriage license, venue booking, photographer, caterer, attire, guest list, invitations, rehearsal, emergency kit, coordinator, final vendor confirmations

5. BUDGET-AWARE notes: If budget_php is provided:
   - Under 100,000: Add notes like "Consider package deals", "DIY options available", "Look for all-in venue packages"
   - 100,000-300,000: Standard planning notes
   - Over 300,000: Can suggest premium options in notes

6. Use IDs: "kasa-1", "kasa-2", "kasa-3", etc.

7. Generate 25-45 items depending on ceremony complexity.

8. Categories to use: Planning Basics, Legal Requirements, Ceremony, Entourage, Venue, Vendors, Attire, Guest Management, Stationery, Logistics, Catering, Entertainment, Reception, Budget, Preparation`;

function buildContextMessage(context: {
  checklist?: string;
  budget?: string;
  guestList?: string;
  ceremonyType?: string;
}): string {
  const parts: string[] = [];

  if (context.checklist) {
    parts.push(`CHECKLIST STATUS:\n${context.checklist}`);
  }
  if (context.budget) {
    parts.push(`BUDGET STATUS:\n${context.budget}`);
  }
  if (context.guestList) {
    parts.push(`GUEST LIST STATUS:\n${context.guestList}`);
  }
  if (context.ceremonyType) {
    parts.push(`CEREMONY TYPE: ${context.ceremonyType}`);
  }

  if (parts.length === 0) return '';

  return `\n\n## Couple's Current Planning Data\n${parts.join('\n\n')}`;
}

async function generateChecklistJSON(
  openai: OpenAI,
  args: {
    ceremony_type: string;
    months_until_wedding?: number;
    budget_php?: number;
    special_notes?: string;
  }
): Promise<string> {
  const userPrompt = `Generate a personalized wedding checklist for:
- Ceremony type: ${args.ceremony_type}
${args.months_until_wedding ? `- Months until wedding: ${args.months_until_wedding}` : '- Months until wedding: not specified (use standard 12+ month timeline)'}
${args.budget_php ? `- Budget: ₱${args.budget_php.toLocaleString()}` : '- Budget: not specified'}
${args.special_notes ? `- Special notes: ${args.special_notes}` : ''}

Return the JSON object now.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: CHECKLIST_GENERATION_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 4000,
  });

  return response.choices[0]?.message?.content || '{"items":[],"ceremonyType":"other"}';
}

async function queryVendors(
  supabase: SupabaseClient,
  args: {
    category: string;
    location?: string;
    budget_max_php?: number;
    prefer_all_celebrations_welcome?: boolean;
    tags?: string[];
    limit?: number;
  }
): Promise<ChatVendor[]> {
  const limit = Math.min(Math.max(args.limit || 3, 1), 5);

  let query = supabase
    .from('vendors')
    .select(
      'slug, name, category, location, price_range_min, price_range_max, rating, review_count, image, is_verified, all_celebrations_welcome, tags'
    )
    .eq('category', args.category);

  if (args.location) {
    query = query.ilike('location', `%${args.location}%`);
  }

  if (args.budget_max_php) {
    query = query.lte('price_range_min', args.budget_max_php);
  }

  if (args.tags && args.tags.length > 0) {
    query = query.overlaps('tags', args.tags);
  }

  // Order: ACW-preferred sorts inclusive vendors first, then by rating
  if (args.prefer_all_celebrations_welcome) {
    query = query
      .order('all_celebrations_welcome', { ascending: false })
      .order('rating', { ascending: false, nullsFirst: false });
  } else {
    query = query.order('rating', { ascending: false, nullsFirst: false });
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('Supabase vendor query error:', error);
    return [];
  }

  if (!data || data.length === 0) return [];

  return data.map(
    (row: {
      slug: string;
      name: string;
      category: string;
      location: string;
      price_range_min: number | null;
      price_range_max: number | null;
      rating: number | null;
      review_count: number | null;
      image: string | null;
      is_verified: boolean;
      all_celebrations_welcome: boolean;
      tags: string[] | null;
    }) => ({
      id: row.slug,
      name: row.name,
      category: row.category,
      location: row.location,
      priceMin: row.price_range_min,
      priceMax: row.price_range_max,
      rating: row.rating ? Number(row.rating) : null,
      reviewCount: row.review_count,
      image: row.image || null,
      isVerified: row.is_verified,
      allCelebrationsWelcome: row.all_celebrations_welcome,
      tags: row.tags || [],
    })
  );
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('OpenAI API key not configured', { status: 500 });
  }

  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

    // Build system prompt with couple's context
    const contextSuffix = context ? buildContextMessage(context) : '';
    const systemContent = SYSTEM_PROMPT + contextSuffix;

    // Limit conversation history to last 15 messages
    const recentMessages = messages.slice(-15);

    const apiMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemContent },
      ...recentMessages,
    ];

    // First call: with tools enabled so the model can decide to call a tool
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      max_tokens: 512,
      tools: TOOLS,
      tool_choice: 'auto',
      stream: true,
    });

    // We need to collect the full response to check for tool calls
    let textContent = '';
    const toolCalls: Array<{
      id: string;
      function: { name: string; arguments: string };
    }> = [];
    const toolCallChunks: Record<
      number,
      { id: string; name: string; args: string }
    > = {};

    for await (const chunk of response) {
      const delta = chunk.choices[0]?.delta;

      // Collect text content
      if (delta?.content) {
        textContent += delta.content;
      }

      // Collect tool call deltas
      if (delta?.tool_calls) {
        for (const tc of delta.tool_calls) {
          const idx = tc.index;
          if (!toolCallChunks[idx]) {
            toolCallChunks[idx] = { id: '', name: '', args: '' };
          }
          if (tc.id) toolCallChunks[idx].id = tc.id;
          if (tc.function?.name) toolCallChunks[idx].name = tc.function.name;
          if (tc.function?.arguments)
            toolCallChunks[idx].args += tc.function.arguments;
        }
      }
    }

    // Assemble tool calls
    for (const idx of Object.keys(toolCallChunks).sort()) {
      const tc = toolCallChunks[Number(idx)];
      toolCalls.push({
        id: tc.id,
        function: { name: tc.name, arguments: tc.args },
      });
    }

    // If there's a tool call, handle it
    if (toolCalls.length > 0) {
      const toolCall = toolCalls[0];

      // ── Handle generate_timeline ──
      if (toolCall.function.name === 'generate_timeline') {
        let args: {
          ceremony_type: string;
          months_until_wedding?: number;
          budget_php?: number;
          special_notes?: string;
        };

        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = { ceremony_type: 'other' };
        }

        // Generate the checklist JSON via a second, non-streaming call
        const checklistJSON = await generateChecklistJSON(openai, args);

        // Build a friendly confirmation message
        let confirmationText = '';
        const ceremonyLabel =
          args.ceremony_type === 'catholic'
            ? 'Catholic'
            : args.ceremony_type === 'muslim'
              ? 'Muslim'
              : args.ceremony_type === 'civil'
                ? 'Civil'
                : 'your';

        if (args.months_until_wedding && args.months_until_wedding <= 6) {
          confirmationText = `Done — I've put together a personalized checklist for your ${ceremonyLabel} celebration. Since you're ${args.months_until_wedding} months out, I've compressed the timeline so everything's prioritized for you.`;
        } else {
          confirmationText = `Done — I've put together a personalized checklist for your ${ceremonyLabel} celebration. Head over to your Planning Hub to see it.`;
        }

        if (args.budget_php) {
          confirmationText += ` I've also added some budget-specific tips based on your ₱${args.budget_php.toLocaleString()} budget.`;
        }

        // Stream back: confirmation text + hidden JSON payload
        const fullResponse = `${confirmationText}\n\n<!--KASA_PLAN_START-->${checklistJSON}<!--KASA_PLAN_END-->`;

        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(fullResponse));
            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      }

      // ── Handle recommend_vendors ──
      if (toolCall.function.name === 'recommend_vendors') {
        let args: {
          category: string;
          location?: string;
          budget_max_php?: number;
          prefer_all_celebrations_welcome?: boolean;
          tags?: string[];
          limit?: number;
        };

        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = { category: 'Venues' };
        }

        const supabase = getSupabaseClient();
        let vendors: ChatVendor[] = [];

        if (supabase) {
          vendors = await queryVendors(supabase, args);
        }

        // Build tool result for second AI call
        let toolResultContent: string;
        if (vendors.length > 0) {
          const vendorSummary = vendors
            .map(
              (v, i) =>
                `${i + 1}. ${v.name} (${v.category}, ${v.location})${v.allCelebrationsWelcome ? ' [All Celebrations Welcome]' : ''}`
            )
            .join('\n');
          toolResultContent = `Found ${vendors.length} vendors:\n${vendorSummary}\n\nThe vendor cards will display automatically below your message. Write a brief, natural intro (1-2 sentences) — do NOT list vendor names as text or bullet points. Just introduce the results conversationally.`;
        } else {
          toolResultContent = `No vendors found matching the criteria (category: ${args.category}${args.location ? `, location: ${args.location}` : ''}${args.budget_max_php ? `, budget max: ₱${args.budget_max_php.toLocaleString()}` : ''}). Suggest the user browse the full vendor directory at /vendors or try broadening their search (different location, higher budget, etc).`;
        }

        // Second non-streaming call with tool result
        const followUpMessages: ChatCompletionMessageParam[] = [
          { role: 'system', content: systemContent },
          ...recentMessages,
          {
            role: 'assistant',
            content: null,
            tool_calls: [
              {
                id: toolCall.id,
                type: 'function' as const,
                function: {
                  name: 'recommend_vendors',
                  arguments: toolCall.function.arguments,
                },
              },
            ],
          },
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            content: toolResultContent,
          },
        ];

        const followUpResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: followUpMessages,
          max_tokens: 256,
        });

        const introText =
          followUpResponse.choices[0]?.message?.content ||
          'Here are some options from our vendor directory.';

        // Build full response: intro + hidden vendor payload
        let fullResponse: string;
        if (vendors.length > 0) {
          const vendorJSON = JSON.stringify(vendors);
          fullResponse = `${introText}\n\n<!--KASA_VENDORS_START-->${vendorJSON}<!--KASA_VENDORS_END-->`;
        } else {
          fullResponse = introText;
        }

        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(fullResponse));
            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      }
    }

    // No tool call — just stream the regular text response
    const stream = new ReadableStream({
      start(controller) {
        if (textContent) {
          controller.enqueue(new TextEncoder().encode(textContent));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: unknown) {
    console.error('Kasa API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
