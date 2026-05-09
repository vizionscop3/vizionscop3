export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          organization: string | null;
          organization_type: string;
          project_types: string[];
          budget_range: string;
          timeline: string;
          description: string;
          status: string;
          ip_address: string | null;
          user_agent: string | null;
          referrer: string | null;
          responded_at: string | null;
          internal_notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email: string;
          organization?: string | null;
          organization_type: string;
          project_types: string[];
          budget_range: string;
          timeline: string;
          description: string;
          status?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          responded_at?: string | null;
          internal_notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Insert"]>;
        Relationships: [];
      };
      build_status: {
        Row: {
          id: string;
          updated_at: string;
          current_focus: string;
          messages: Json;
          last_commit: Json | null;
          is_live: boolean;
        };
        Insert: {
          id?: string;
          updated_at?: string;
          current_focus: string;
          messages?: Json;
          last_commit?: Json | null;
          is_live?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["build_status"]["Insert"]>;
        Relationships: [];
      };
      rate_limits: {
        Row: {
          id: string;
          identifier: string;
          action: string;
          count: number;
          window_start: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          identifier: string;
          action: string;
          count?: number;
          window_start?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rate_limits"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
