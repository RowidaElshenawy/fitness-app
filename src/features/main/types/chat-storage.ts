export type TMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type TConversation = {
  id: string;
  title: string;
  messages: TMessage[];
};

type TStoredChats = {
  conversations: TConversation[];
  activeId: string | null;
};

const STORAGE_KEY = 'smart-coach-chats';
const MAX_TITLE_LENGTH = 28;

export const makeTitle = (text: string): string =>
  text.length > MAX_TITLE_LENGTH ? `${text.slice(0, MAX_TITLE_LENGTH)}…` : text;

// ---------- التحقق من شكل البيانات المخزّنة ----------
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isMessage = (value: unknown): value is TMessage =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  (value.role === 'user' || value.role === 'assistant') &&
  typeof value.content === 'string';

const isConversation = (value: unknown): value is TConversation =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.title === 'string' &&
  Array.isArray(value.messages) &&
  value.messages.every(isMessage);

const isStoredChats = (value: unknown): value is TStoredChats =>
  isRecord(value) &&
  Array.isArray(value.conversations) &&
  value.conversations.every(isConversation) &&
  (value.activeId === null || typeof value.activeId === 'string');

// ---------- تحميل وحفظ ----------
export const loadChats = (): TStoredChats => {
  const empty: TStoredChats = { conversations: [], activeId: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;

    const parsed: unknown = JSON.parse(raw);
    if (!isStoredChats(parsed)) return empty;

    // لو المحادثة المفتوحة اتمسحت لأي سبب، نرجع لمحادثة جديدة
    const activeExists = parsed.conversations.some((c) => c.id === parsed.activeId);
    return { ...parsed, activeId: activeExists ? parsed.activeId : null };
  } catch {
    return empty;
  }
};

export const saveChats = (chats: TStoredChats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch {
    // التخزين ممتلئ أو ممنوع: نتجاهل ومنكسرش الشات
  }
};
