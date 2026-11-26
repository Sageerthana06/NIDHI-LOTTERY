export type WinnerRole = 'ADMIN' | 'CEO' | 'STAFF' | 'AUDITOR';
export type WinnerVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type WinnerApprovalStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'ARCHIVED';

export interface WinnerApiSession {
  subject: string;
  role: WinnerRole;
}

export interface WinnerApiRecord {
  id: string;
  drawName: string;
  drawDate: string;
  prizeCategory: string;
  prizeAmount: string;
  ticketNumber: string;
  verificationStatus: WinnerVerificationStatus;
  approvalStatus: WinnerApprovalStatus;
  approvalReason: string | null;
  rejectionReason: string | null;
  isPublished: boolean;
  submittedAt: string | null;
  verifiedAt: string | null;
  approvedAt: string | null;
  publishedAt: string | null;
  unpublishedAt: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  proof: {
    id: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    uploadedAt: string;
  } | null;
}

export interface WinnerAuditEvent {
  id: string;
  winnerId: string;
  winnerLabel: string;
  actorSubject: string;
  actorRole: WinnerRole;
  action: string;
  details: string | null;
  timestamp: string;
}

export interface PublicWinner {
  id: string;
  drawName: string;
  drawDate: string;
  prizeCategory: string;
  prizeAmount: string;
}

export interface WinnerDraftInput {
  drawName: string;
  drawDate: string;
  prizeCategory: string;
  prizeAmount: string;
  ticketNumber: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1').replace(
  /\/+$/,
  '',
);

interface ApiEnvelope<T> {
  data: T;
  error?: { code?: string; message?: string };
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
    credentials: 'omit',
  });

  if (response.status === 204) return undefined as T;
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok) {
    throw new Error(payload?.error?.message || `API request failed (${response.status})`);
  }
  return payload?.data as T;
}

const jsonBody = (value: unknown): string => JSON.stringify(value);
const winnerPath = (id: string): string => `/admin/winners/${encodeURIComponent(id)}`;
const ceoWinnerPath = (id: string): string => `/ceo/winners/${encodeURIComponent(id)}`;

export const validateAccessToken = (token: string): Promise<WinnerApiSession> =>
  request('/auth/session', {}, token);

export const listAdminWinners = (token: string): Promise<WinnerApiRecord[]> =>
  request('/admin/winners', {}, token);

export const listCeoWinners = (token: string): Promise<WinnerApiRecord[]> =>
  request('/ceo/winners', {}, token);

export const createWinnerDraft = (
  token: string,
  input: WinnerDraftInput,
): Promise<WinnerApiRecord> =>
  request('/admin/winners', { method: 'POST', body: jsonBody(input) }, token);

export const updateWinnerDraft = (
  token: string,
  id: string,
  input: WinnerDraftInput,
): Promise<WinnerApiRecord> =>
  request(winnerPath(id), { method: 'PATCH', body: jsonBody(input) }, token);

export const deleteWinnerDraft = (token: string, id: string): Promise<void> =>
  request(winnerPath(id), { method: 'DELETE' }, token);

export const uploadWinnerProof = (token: string, id: string, file: File): Promise<WinnerApiRecord> => {
  const formData = new FormData();
  formData.append('proof', file);
  return request(`${winnerPath(id)}/proof`, { method: 'POST', body: formData }, token);
};

export const submitWinnerForApproval = (token: string, id: string): Promise<WinnerApiRecord> =>
  request(`${winnerPath(id)}/submit`, { method: 'POST' }, token);

export const verifyWinner = (token: string, id: string): Promise<WinnerApiRecord> =>
  request(`${ceoWinnerPath(id)}/verify`, { method: 'POST' }, token);

export const rejectWinner = (
  token: string,
  id: string,
  reason: string,
): Promise<WinnerApiRecord> =>
  request(`${ceoWinnerPath(id)}/reject`, { method: 'POST', body: jsonBody({ reason }) }, token);

export const approveWinner = (
  token: string,
  id: string,
  reason: string,
): Promise<WinnerApiRecord> =>
  request(`${ceoWinnerPath(id)}/approve`, { method: 'POST', body: jsonBody({ reason }) }, token);

export const publishWinner = (token: string, id: string): Promise<WinnerApiRecord> =>
  request(`${ceoWinnerPath(id)}/publish`, { method: 'POST' }, token);

export const unpublishWinner = (token: string, id: string): Promise<WinnerApiRecord> =>
  request(`${ceoWinnerPath(id)}/unpublish`, { method: 'POST' }, token);

export const archiveWinner = (token: string, id: string): Promise<WinnerApiRecord> =>
  request(`${ceoWinnerPath(id)}/archive`, { method: 'POST' }, token);

export const getWinnerAuditEvents = (token: string): Promise<WinnerAuditEvent[]> =>
  request('/audit/winners?limit=200', {}, token);

export const getWinnerProof = async (token: string, id: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/winners/${encodeURIComponent(id)}/proof`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    credentials: 'omit',
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiEnvelope<never> | null;
    throw new Error(payload?.error?.message || `Proof request failed (${response.status})`);
  }
  return response.blob();
};

export const listPublicWinners = (): Promise<PublicWinner[]> => request('/public/winners');
