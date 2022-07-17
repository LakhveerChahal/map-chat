import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseApiService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getPublicImageUrl(userId: string): string {
    
    const { publicURL, error } = this.supabase.storage.from('map-chat-bucket').getPublicUrl(`public/${userId}.jpg`);
    if(error) { console.error(error); }

    return publicURL || '';
  }
}
