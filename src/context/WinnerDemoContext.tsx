import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type WinnerDemoRole = 'ADMIN' | 'CEO';
export type WinnerVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';
export type WinnerApprovalStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'ARCHIVED';

export interface WinnerDemoInput {
  drawName: string;
  drawDate: string;
  prizeCategory: string;
  prizeAmount: string;
  ticketNumber: string;
  proofFileName: string;
  proofMimeType: string;
  proofDataUrl: string;
}

export interface WinnerDemoRecord extends WinnerDemoInput {
  id: string;
  verificationStatus: WinnerVerificationStatus;
  approvalStatus: WinnerApprovalStatus;
  rejectionReason: string;
  isDemoPublished: boolean;
}

export interface WinnerDemoAuditEvent {
  id: string;
  actorRole: WinnerDemoRole;
  action: string;
  winnerId: string;
  drawName: string;
  timestamp: string;
  details?: string;
}

interface WinnerDemoContextValue {
  records: WinnerDemoRecord[];
  auditEvents: WinnerDemoAuditEvent[];
  addDraft: (input: WinnerDemoInput, actor: WinnerDemoRole) => boolean;
  updateDraft: (id: string, input: WinnerDemoInput, actor: WinnerDemoRole) => boolean;
  deleteDraft: (id: string, actor: WinnerDemoRole) => boolean;
  submitForApproval: (id: string, actor: WinnerDemoRole) => boolean;
  verifySubmission: (id: string, actor: WinnerDemoRole) => boolean;
  rejectSubmission: (id: string, reason: string, actor: WinnerDemoRole) => boolean;
  approve: (id: string, actor: WinnerDemoRole) => boolean;
  publishDemo: (id: string, actor: WinnerDemoRole) => boolean;
  unpublishDemo: (id: string, actor: WinnerDemoRole) => boolean;
  archiveDemo: (id: string, actor: WinnerDemoRole) => boolean;
}

const WinnerDemoContext = createContext<WinnerDemoContextValue | null>(null);
let nextDemoWinnerId = 0;
let nextAuditId = 0;

export function isWinnerEligibleForDemoPublication(record: WinnerDemoRecord): boolean {
  return (
    record.verificationStatus === 'VERIFIED' &&
    record.approvalStatus === 'APPROVED' &&
    Boolean(record.proofDataUrl)
  );
}

export function WinnerDemoProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<WinnerDemoRecord[]>([]);
  const [auditEvents, setAuditEvents] = useState<WinnerDemoAuditEvent[]>([]);

  const value = useMemo<WinnerDemoContextValue>(
    () => {
      const logAction = (
        actorRole: WinnerDemoRole,
        action: string,
        record: Pick<WinnerDemoRecord, 'id' | 'drawName'>,
        details?: string,
      ) => {
        nextAuditId += 1;
        setAuditEvents((current) => [
          {
            id: `session-audit-${Date.now()}-${nextAuditId}`,
            actorRole,
            action,
            winnerId: record.id,
            drawName: record.drawName,
            timestamp: new Date().toISOString(),
            ...(details ? { details } : {}),
          },
          ...current,
        ]);
      };

      const changeRecord = (
        id: string,
        actor: WinnerDemoRole,
        permittedRole: WinnerDemoRole,
        action: string,
        canChange: (record: WinnerDemoRecord) => boolean,
        transform: (record: WinnerDemoRecord) => WinnerDemoRecord,
        details?: string,
      ): boolean => {
        if (actor !== permittedRole) return false;
        const record = records.find((item) => item.id === id);
        if (!record || !canChange(record)) return false;

        setRecords((current) => current.map((item) => (item.id === id ? transform(item) : item)));
        logAction(actor, action, record, details);
        return true;
      };

      return {
        records,
        auditEvents,
        addDraft: (input, actor) => {
          if (actor !== 'ADMIN') return false;
          nextDemoWinnerId += 1;
          const record: WinnerDemoRecord = {
            ...input,
            id: `session-winner-${Date.now()}-${nextDemoWinnerId}`,
            verificationStatus: 'PENDING',
            approvalStatus: 'DRAFT',
            rejectionReason: '',
            isDemoPublished: false,
          };
          setRecords((current) => [record, ...current]);
          logAction(actor, 'DRAFT_CREATED', record);
          return true;
        },
        updateDraft: (id, input, actor) => {
          const record = records.find((item) => item.id === id);
          const updated = changeRecord(
            id,
            actor,
            'ADMIN',
            'DRAFT_UPDATED',
            (item) => item.approvalStatus === 'DRAFT' || item.approvalStatus === 'REJECTED',
            (item) => ({
              ...item,
              ...input,
              verificationStatus: 'PENDING',
              approvalStatus: 'DRAFT',
              rejectionReason: '',
              isDemoPublished: false,
            }),
          );
          if (updated && record?.approvalStatus === 'REJECTED') {
            logAction(actor, 'REJECTED_RECORD_RETURNED_TO_DRAFT', {
              id,
              drawName: input.drawName,
            });
          }
          return updated;
        },
        deleteDraft: (id, actor) => {
          if (actor !== 'ADMIN') return false;
          const record = records.find(
            (item) =>
              item.id === id &&
              (item.approvalStatus === 'DRAFT' || item.approvalStatus === 'REJECTED') &&
              !item.isDemoPublished,
          );
          if (!record) return false;
          setRecords((current) => current.filter((item) => item.id !== id));
          logAction(actor, 'DRAFT_DELETED', record);
          return true;
        },
        submitForApproval: (id, actor) =>
          changeRecord(
            id,
            actor,
            'ADMIN',
            'SUBMITTED_FOR_CEO_REVIEW',
            (record) =>
              record.approvalStatus === 'DRAFT' &&
              Boolean(record.proofDataUrl) &&
              Boolean(record.drawName.trim()) &&
              Boolean(record.drawDate) &&
              Boolean(record.ticketNumber.trim()) &&
              Boolean(record.prizeCategory.trim()) &&
              Boolean(record.prizeAmount.trim()),
            (record) => ({
              ...record,
              verificationStatus: 'PENDING',
              approvalStatus: 'PENDING_APPROVAL',
              rejectionReason: '',
            }),
          ),
        verifySubmission: (id, actor) =>
          changeRecord(
            id,
            actor,
            'CEO',
            'OFFICIAL_PROOF_VERIFIED',
            (record) => record.approvalStatus === 'PENDING_APPROVAL' && Boolean(record.proofDataUrl),
            (record) => ({ ...record, verificationStatus: 'VERIFIED' }),
          ),
        rejectSubmission: (id, reason, actor) => {
          const normalizedReason = reason.trim();
          if (!normalizedReason) return false;
          return changeRecord(
            id,
            actor,
            'CEO',
            'SUBMISSION_REJECTED',
            (record) => record.approvalStatus === 'PENDING_APPROVAL',
            (record) => ({
              ...record,
              verificationStatus: 'REJECTED',
              approvalStatus: 'REJECTED',
              rejectionReason: normalizedReason,
              isDemoPublished: false,
            }),
            normalizedReason,
          );
        },
        approve: (id, actor) =>
          changeRecord(
            id,
            actor,
            'CEO',
            'WINNER_APPROVED',
            (record) =>
              record.approvalStatus === 'PENDING_APPROVAL' &&
              record.verificationStatus === 'VERIFIED' &&
              Boolean(record.proofDataUrl),
            (record) => ({ ...record, approvalStatus: 'APPROVED' }),
          ),
        publishDemo: (id, actor) =>
          changeRecord(
            id,
            actor,
            'CEO',
            'WINNER_PUBLISHED',
            (record) => isWinnerEligibleForDemoPublication(record) && !record.isDemoPublished,
            (record) => ({ ...record, isDemoPublished: true }),
          ),
        unpublishDemo: (id, actor) =>
          changeRecord(
            id,
            actor,
            'CEO',
            'WINNER_UNPUBLISHED',
            (record) => record.approvalStatus === 'APPROVED' && record.isDemoPublished,
            (record) => ({ ...record, isDemoPublished: false }),
          ),
        archiveDemo: (id, actor) =>
          changeRecord(
            id,
            actor,
            'CEO',
            'WINNER_ARCHIVED',
            (record) => record.approvalStatus === 'APPROVED',
            (record) => ({ ...record, approvalStatus: 'ARCHIVED', isDemoPublished: false }),
          ),
      };
    },
    [records, auditEvents],
  );

  return <WinnerDemoContext.Provider value={value}>{children}</WinnerDemoContext.Provider>;
}

export function useWinnerDemo(): WinnerDemoContextValue {
  const context = useContext(WinnerDemoContext);
  if (!context) {
    throw new Error('useWinnerDemo must be used within WinnerDemoProvider');
  }
  return context;
}
