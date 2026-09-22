// Generado a partir de supabase/migrations. Regenerar con `pnpm db:types` tras cada migración.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      guests: {
        Row: {
          allergies: string | null
          created_at: string
          favorite_song: string | null
          first_name: string
          id: string
          is_primary: boolean | null
          last_name: string
          needs_bus: boolean | null
          position: number
          rsvp_id: string
        }
        Insert: {
          allergies?: string | null
          created_at?: string
          favorite_song?: string | null
          first_name: string
          id?: string
          last_name: string
          needs_bus?: boolean | null
          position: number
          rsvp_id: string
        }
        Update: {
          allergies?: string | null
          created_at?: string
          favorite_song?: string | null
          first_name?: string
          id?: string
          last_name?: string
          needs_bus?: boolean | null
          position?: number
          rsvp_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'guests_rsvp_id_fkey'
            columns: ['rsvp_id']
            isOneToOne: false
            referencedRelation: 'rsvps'
            referencedColumns: ['id']
          },
        ]
      }
      rsvps: {
        Row: {
          attending: boolean
          created_at: string
          id: string
          message: string | null
        }
        Insert: {
          attending: boolean
          created_at?: string
          id?: string
          message?: string | null
        }
        Update: {
          attending?: boolean
          created_at?: string
          id?: string
          message?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      submit_rsvp: { Args: { payload: Json }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database['public']

export type Tables<T extends keyof PublicSchema['Tables']> = PublicSchema['Tables'][T]['Row']
