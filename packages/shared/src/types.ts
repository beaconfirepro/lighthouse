export interface AHJ {
  ahj_id: number;
  name: string;
  jurisdiction?: string | null;
  code_sets_used?: string | null;
  inspection_process_notes?: string | null;
  portal_url?: string | null;
  contact_list_json?: unknown | null;
  inspection_lead_time_days?: number | null;
  fee_schedule_url?: string | null;
  email_pattern?: string | null;
  active?: boolean | null;
}

export interface ProjectPhase {
  phase_id: number;
  phase_name: string;
  status?: string | null;
}

export interface ProjectDetail {
  phases?: ProjectPhase[] | null;
}
