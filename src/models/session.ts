export type WorkflowType = "cute" | "aiPhoto" | "To3d";

export interface GetSessionIdRes {
  expireTime: string;
  sessionId: string;
  workflowType: WorkflowType;
}
