export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      budget_items: {
        Row: {
          actual_cost: number | null
          category: string
          couple_id: string
          created_at: string
          description: string | null
          estimated_cost: number | null
          id: string
          is_paid: boolean | null
          notes: string | null
          sort_order: number
          suggested_percentage: number | null
          vendor_name: string | null
        }
        Insert: {
          actual_cost?: number | null
          category: string
          couple_id: string
          created_at?: string
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          sort_order?: number
          suggested_percentage?: number | null
          vendor_name?: string | null
        }
        Update: {
          actual_cost?: number | null
          category?: string
          couple_id?: string
          created_at?: string
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_paid?: boolean | null
          notes?: string | null
          sort_order?: number
          suggested_percentage?: number | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_items_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      celebration_websites: {
        Row: {
          accepting_uploads: boolean
          bank_account_name: string | null
          bank_account_number: string | null
          bank_name: string | null
          celebration_date: string | null
          ceremony_type: Database["public"]["Enums"]["ceremony_type"] | null
          color_theme: string
          couple_id: string
          cover_photo_url: string | null
          created_at: string
          dress_code: string | null
          gcash_number: string | null
          gcash_qr_url: string | null
          gift_intro_text: string | null
          gift_section_enabled: boolean
          guest_album_public: boolean
          guest_photos_auto_approve: boolean
          guest_photos_enabled: boolean
          hashtag: string | null
          id: string
          is_published: boolean
          max_gallery_photos: number
          max_guest_photos: number
          maya_number: string | null
          maya_qr_url: string | null
          our_story: string | null
          partner1_name: string | null
          partner2_name: string | null
          rsvp_enabled: boolean
          slug: string
          updated_at: string
          venue_location: string | null
          venue_map_url: string | null
          venue_name: string | null
          view_count: number
        }
        Insert: {
          accepting_uploads?: boolean
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          celebration_date?: string | null
          ceremony_type?: Database["public"]["Enums"]["ceremony_type"] | null
          color_theme?: string
          couple_id: string
          cover_photo_url?: string | null
          created_at?: string
          dress_code?: string | null
          gcash_number?: string | null
          gcash_qr_url?: string | null
          gift_intro_text?: string | null
          gift_section_enabled?: boolean
          guest_album_public?: boolean
          guest_photos_auto_approve?: boolean
          guest_photos_enabled?: boolean
          hashtag?: string | null
          id?: string
          is_published?: boolean
          max_gallery_photos?: number
          max_guest_photos?: number
          maya_number?: string | null
          maya_qr_url?: string | null
          our_story?: string | null
          partner1_name?: string | null
          partner2_name?: string | null
          rsvp_enabled?: boolean
          slug: string
          updated_at?: string
          venue_location?: string | null
          venue_map_url?: string | null
          venue_name?: string | null
          view_count?: number
        }
        Update: {
          accepting_uploads?: boolean
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          celebration_date?: string | null
          ceremony_type?: Database["public"]["Enums"]["ceremony_type"] | null
          color_theme?: string
          couple_id?: string
          cover_photo_url?: string | null
          created_at?: string
          dress_code?: string | null
          gcash_number?: string | null
          gcash_qr_url?: string | null
          gift_intro_text?: string | null
          gift_section_enabled?: boolean
          guest_album_public?: boolean
          guest_photos_auto_approve?: boolean
          guest_photos_enabled?: boolean
          hashtag?: string | null
          id?: string
          is_published?: boolean
          max_gallery_photos?: number
          max_guest_photos?: number
          maya_number?: string | null
          maya_qr_url?: string | null
          our_story?: string | null
          partner1_name?: string | null
          partner2_name?: string | null
          rsvp_enabled?: boolean
          slug?: string
          updated_at?: string
          venue_location?: string | null
          venue_map_url?: string | null
          venue_name?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "celebration_websites_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      celebrations: {
        Row: {
          celebration_date: string | null
          ceremony_type: Database["public"]["Enums"]["ceremony_type"] | null
          couple_id: string
          created_at: string
          id: string
          is_published: boolean | null
          location: string | null
          photos: string[] | null
          story: string | null
          title: string
          updated_at: string
          vendor_mentions: string[] | null
        }
        Insert: {
          celebration_date?: string | null
          ceremony_type?: Database["public"]["Enums"]["ceremony_type"] | null
          couple_id: string
          created_at?: string
          id?: string
          is_published?: boolean | null
          location?: string | null
          photos?: string[] | null
          story?: string | null
          title: string
          updated_at?: string
          vendor_mentions?: string[] | null
        }
        Update: {
          celebration_date?: string | null
          ceremony_type?: Database["public"]["Enums"]["ceremony_type"] | null
          couple_id?: string
          created_at?: string
          id?: string
          is_published?: boolean | null
          location?: string | null
          photos?: string[] | null
          story?: string | null
          title?: string
          updated_at?: string
          vendor_mentions?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "celebrations_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          category: string | null
          ceremony_types: string[] | null
          completed: boolean
          couple_id: string
          created_at: string
          due_date: string | null
          id: string
          notes: string | null
          sort_order: number
          timeframe: string | null
          title: string
        }
        Insert: {
          category?: string | null
          ceremony_types?: string[] | null
          completed?: boolean
          couple_id: string
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          sort_order?: number
          timeframe?: string | null
          title: string
        }
        Update: {
          category?: string | null
          ceremony_types?: string[] | null
          completed?: boolean
          couple_id?: string
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          sort_order?: number
          timeframe?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          couple_id: string
          created_at: string
          id: string
          notes: string | null
          vendor_id: string
        }
        Insert: {
          couple_id: string
          created_at?: string
          id?: string
          notes?: string | null
          vendor_id: string
        }
        Update: {
          couple_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_list: {
        Row: {
          couple_id: string
          created_at: string
          dietary_notes: string | null
          email: string | null
          guest_group: string | null
          id: string
          name: string
          phone: string | null
          plus_one: boolean | null
          rsvp_status: Database["public"]["Enums"]["rsvp_status"]
          table_number: number | null
        }
        Insert: {
          couple_id: string
          created_at?: string
          dietary_notes?: string | null
          email?: string | null
          guest_group?: string | null
          id?: string
          name: string
          phone?: string | null
          plus_one?: boolean | null
          rsvp_status?: Database["public"]["Enums"]["rsvp_status"]
          table_number?: number | null
        }
        Update: {
          couple_id?: string
          created_at?: string
          dietary_notes?: string | null
          email?: string | null
          guest_group?: string | null
          id?: string
          name?: string
          phone?: string | null
          plus_one?: boolean | null
          rsvp_status?: Database["public"]["Enums"]["rsvp_status"]
          table_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "guest_list_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          celebration_date: string | null
          couple_id: string | null
          created_at: string
          email: string
          guest_count: number | null
          id: string
          message: string
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
          updated_at: string
          vendor_id: string
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          celebration_date?: string | null
          couple_id?: string | null
          created_at?: string
          email: string
          guest_count?: number | null
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
          vendor_id: string
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          celebration_date?: string | null
          couple_id?: string | null
          created_at?: string
          email?: string
          guest_count?: number | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inquiries_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          budget_max: number | null
          budget_min: number | null
          celebration_date: string | null
          ceremony_type: Database["public"]["Enums"]["ceremony_type"] | null
          created_at: string
          custom_labels: Json | null
          guest_count: number | null
          id: string
          location: string | null
          partner1_name: string | null
          partner2_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          budget_max?: number | null
          budget_min?: number | null
          celebration_date?: string | null
          ceremony_type?: Database["public"]["Enums"]["ceremony_type"] | null
          created_at?: string
          custom_labels?: Json | null
          guest_count?: number | null
          id: string
          location?: string | null
          partner1_name?: string | null
          partner2_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          budget_max?: number | null
          budget_min?: number | null
          celebration_date?: string | null
          ceremony_type?: Database["public"]["Enums"]["ceremony_type"] | null
          created_at?: string
          custom_labels?: Json | null
          guest_count?: number | null
          id?: string
          location?: string | null
          partner1_name?: string | null
          partner2_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          reviewer_id: string | null
          reviewer_name: string
          vendor_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          reviewer_id?: string | null
          reviewer_name: string
          vendor_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          reviewer_id?: string | null
          reviewer_name?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: Database["public"]["Enums"]["vendor_category"]
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: Database["public"]["Enums"]["vendor_category"]
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: Database["public"]["Enums"]["vendor_category"]
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      vendors: {
        Row: {
          all_celebrations_welcome: boolean | null
          availability: string[] | null
          category: Database["public"]["Enums"]["vendor_category"]
          contact_info: Json | null
          created_at: string
          currency: string
          description: string | null
          featured: boolean | null
          gallery: string[] | null
          id: string
          image: string | null
          is_verified: boolean | null
          location: string
          name: string
          owner_id: string | null
          price_range_max: number | null
          price_range_min: number | null
          rating: number | null
          review_count: number | null
          slug: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          all_celebrations_welcome?: boolean | null
          availability?: string[] | null
          category: Database["public"]["Enums"]["vendor_category"]
          contact_info?: Json | null
          created_at?: string
          currency?: string
          description?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: string
          image?: string | null
          is_verified?: boolean | null
          location: string
          name: string
          owner_id?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          review_count?: number | null
          slug: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          all_celebrations_welcome?: boolean | null
          availability?: string[] | null
          category?: Database["public"]["Enums"]["vendor_category"]
          contact_info?: Json | null
          created_at?: string
          currency?: string
          description?: string | null
          featured?: boolean | null
          gallery?: string[] | null
          id?: string
          image?: string | null
          is_verified?: boolean | null
          location?: string
          name?: string
          owner_id?: string | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          review_count?: number | null
          slug?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      website_entourage: {
        Row: {
          created_at: string
          id: string
          member_name: string
          role: string
          role_category: string | null
          sort_order: number
          website_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          member_name: string
          role: string
          role_category?: string | null
          sort_order?: number
          website_id: string
        }
        Update: {
          created_at?: string
          id?: string
          member_name?: string
          role?: string
          role_category?: string | null
          sort_order?: number
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_entourage_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "celebration_websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_entourage_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_photo_stats"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_entourage_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_rsvp_summary"
            referencedColumns: ["website_id"]
          },
        ]
      }
      website_gallery: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          photo_url: string
          sort_order: number
          website_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          photo_url: string
          sort_order?: number
          website_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          photo_url?: string
          sort_order?: number
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_gallery_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "celebration_websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_gallery_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_photo_stats"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_gallery_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_rsvp_summary"
            referencedColumns: ["website_id"]
          },
        ]
      }
      website_guest_photos: {
        Row: {
          caption: string | null
          file_size_bytes: number | null
          height: number | null
          id: string
          is_album_cover: boolean
          original_url: string
          status: Database["public"]["Enums"]["photo_status"]
          thumbnail_url: string | null
          uploaded_at: string
          uploader_name: string | null
          website_id: string
          width: number | null
        }
        Insert: {
          caption?: string | null
          file_size_bytes?: number | null
          height?: number | null
          id?: string
          is_album_cover?: boolean
          original_url: string
          status?: Database["public"]["Enums"]["photo_status"]
          thumbnail_url?: string | null
          uploaded_at?: string
          uploader_name?: string | null
          website_id: string
          width?: number | null
        }
        Update: {
          caption?: string | null
          file_size_bytes?: number | null
          height?: number | null
          id?: string
          is_album_cover?: boolean
          original_url?: string
          status?: Database["public"]["Enums"]["photo_status"]
          thumbnail_url?: string | null
          uploaded_at?: string
          uploader_name?: string | null
          website_id?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "website_guest_photos_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "celebration_websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_guest_photos_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_photo_stats"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_guest_photos_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_rsvp_summary"
            referencedColumns: ["website_id"]
          },
        ]
      }
      website_rsvps: {
        Row: {
          dietary_restrictions: string[] | null
          guest_count: number
          guest_name: string
          guest_phone: string | null
          id: string
          ip_address: unknown
          message: string | null
          response: Database["public"]["Enums"]["rsvp_response"]
          submitted_at: string
          updated_at: string
          user_agent: string | null
          website_id: string
        }
        Insert: {
          dietary_restrictions?: string[] | null
          guest_count?: number
          guest_name: string
          guest_phone?: string | null
          id?: string
          ip_address?: unknown
          message?: string | null
          response: Database["public"]["Enums"]["rsvp_response"]
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
          website_id: string
        }
        Update: {
          dietary_restrictions?: string[] | null
          guest_count?: number
          guest_name?: string
          guest_phone?: string | null
          id?: string
          ip_address?: unknown
          message?: string | null
          response?: Database["public"]["Enums"]["rsvp_response"]
          submitted_at?: string
          updated_at?: string
          user_agent?: string | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_rsvps_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "celebration_websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_rsvps_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_photo_stats"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_rsvps_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_rsvp_summary"
            referencedColumns: ["website_id"]
          },
        ]
      }
      website_schedule_events: {
        Row: {
          created_at: string
          event_location: string | null
          event_name: string
          event_time: string | null
          id: string
          sort_order: number
          website_id: string
        }
        Insert: {
          created_at?: string
          event_location?: string | null
          event_name: string
          event_time?: string | null
          id?: string
          sort_order?: number
          website_id: string
        }
        Update: {
          created_at?: string
          event_location?: string | null
          event_name?: string
          event_time?: string | null
          id?: string
          sort_order?: number
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_schedule_events_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "celebration_websites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_schedule_events_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_photo_stats"
            referencedColumns: ["website_id"]
          },
          {
            foreignKeyName: "website_schedule_events_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "website_rsvp_summary"
            referencedColumns: ["website_id"]
          },
        ]
      }
      vendor_claims: {
        Row: {
          id: string
          vendor_id: string
          vendor_slug: string
          claimant_name: string
          claimant_email: string
          claimant_phone: string | null
          claimant_role: string | null
          message: string | null
          status: string
          reviewed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          vendor_id: string
          vendor_slug: string
          claimant_name: string
          claimant_email: string
          claimant_phone?: string | null
          claimant_role?: string | null
          message?: string | null
          status?: string
          reviewed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string
          vendor_slug?: string
          claimant_name?: string
          claimant_email?: string
          claimant_phone?: string | null
          claimant_role?: string | null
          message?: string | null
          status?: string
          reviewed_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_claims_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      website_photo_stats: {
        Row: {
          approved_count: number | null
          contributor_count: number | null
          couple_id: string | null
          hidden_count: number | null
          pending_count: number | null
          total_photos: number | null
          website_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "celebration_websites_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      website_rsvp_summary: {
        Row: {
          attending_count: number | null
          couple_id: string | null
          declined_count: number | null
          guests_with_dietary: number | null
          total_guests_attending: number | null
          total_responses: number | null
          website_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "celebration_websites_couple_id_fkey"
            columns: ["couple_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      generate_website_slug: {
        Args: { p1: string; p2: string }
        Returns: string
      }
    }
    Enums: {
      ceremony_type:
        | "Catholic"
        | "Church (INC)"
        | "Church (Other)"
        | "Muslim"
        | "Civil"
        | "Civil Union"
        | "Other"
      inquiry_status: "pending" | "read" | "replied" | "closed"
      photo_status: "pending" | "approved" | "hidden" | "deleted"
      rsvp_response: "attending" | "declined"
      rsvp_status: "pending" | "attending" | "declined" | "maybe"
      user_role: "couple" | "vendor" | "admin"
      vendor_category:
        | "Venues"
        | "Photo & Video"
        | "Catering"
        | "Coordination"
        | "Flowers & Styling"
        | "Lights & Sound"
        | "Hair & Makeup"
        | "Attire & Design"
        | "Jewellery"
        | "Entertainment"
        | "Food & Drinks"
        | "Photo Booth & Souvenirs"
        | "Rentals & Effects"
        | "Artisans"
        | "Stationery"
        | "Registry"
        | "Transport"
        | "Honeymoon"
        | "Finance"
        | "Media"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ceremony_type: [
        "Catholic",
        "Church (INC)",
        "Church (Other)",
        "Muslim",
        "Civil",
        "Civil Union",
        "Other",
      ],
      inquiry_status: ["pending", "read", "replied", "closed"],
      photo_status: ["pending", "approved", "hidden", "deleted"],
      rsvp_response: ["attending", "declined"],
      rsvp_status: ["pending", "attending", "declined", "maybe"],
      user_role: ["couple", "vendor", "admin"],
      vendor_category: [
        "Venues",
        "Photo & Video",
        "Catering",
        "Coordination",
        "Flowers & Styling",
        "Lights & Sound",
        "Hair & Makeup",
        "Attire & Design",
        "Jewellery",
        "Entertainment",
        "Food & Drinks",
        "Photo Booth & Souvenirs",
        "Rentals & Effects",
        "Artisans",
        "Stationery",
        "Registry",
        "Transport",
        "Honeymoon",
        "Finance",
        "Media",
      ],
    },
  },
} as const
