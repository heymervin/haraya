interface KasaContext {
  checklist?: string;
  budget?: string;
  guestList?: string;
  ceremonyType?: string;
}

export function gatherKasaContext(): KasaContext {
  const context: KasaContext = {};

  // Checklist summary
  try {
    const raw = localStorage.getItem('haraya-checklist');
    if (raw) {
      const items = JSON.parse(raw);
      if (Array.isArray(items) && items.length > 0) {
        const total = items.length;
        const completed = items.filter((i: { completed?: boolean }) => i.completed).length;
        const pending = items
          .filter((i: { completed?: boolean; name?: string; title?: string }) => !i.completed)
          .slice(0, 5)
          .map((i: { name?: string; title?: string }) => i.name || i.title || 'Untitled')
          .join(', ');
        context.checklist = `${completed}/${total} tasks completed. Next up: ${pending}`;
      }
    }
  } catch { /* missing data is fine */ }

  // Budget summary
  try {
    const raw = localStorage.getItem('haraya-budget');
    if (raw) {
      const data = JSON.parse(raw);
      const totalBudget = data.totalBudget || data.total || 0;
      if (totalBudget > 0) {
        const spent = data.categories
          ? data.categories.reduce((sum: number, c: { actual?: number; spent?: number }) => sum + (c.actual || c.spent || 0), 0)
          : 0;
        const remaining = totalBudget - spent;
        context.budget = `Total budget: ₱${totalBudget.toLocaleString('en-PH')}. Spent: ₱${spent.toLocaleString('en-PH')}. Remaining: ₱${remaining.toLocaleString('en-PH')}`;
      }
    }
  } catch { /* missing data is fine */ }

  // Guest list summary
  try {
    const raw = localStorage.getItem('haraya-guestlist');
    if (raw) {
      const guests = JSON.parse(raw);
      if (Array.isArray(guests) && guests.length > 0) {
        const total = guests.length;
        const confirmed = guests.filter((g: { rsvp?: string; status?: string }) => g.rsvp === 'confirmed' || g.status === 'confirmed').length;
        const declined = guests.filter((g: { rsvp?: string; status?: string }) => g.rsvp === 'declined' || g.status === 'declined').length;
        const pending = total - confirmed - declined;
        context.guestList = `${total} guests total. ${confirmed} confirmed, ${declined} declined, ${pending} pending.`;
      }
    }
  } catch { /* missing data is fine */ }

  // Ceremony type
  try {
    const ceremonyType = localStorage.getItem('haraya-ceremony-type');
    if (ceremonyType && ceremonyType !== 'all') {
      context.ceremonyType = ceremonyType;
    }
  } catch { /* missing data is fine */ }

  return context;
}
