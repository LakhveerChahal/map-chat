import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
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
    
    const { publicURL, error } = this.supabase.storage.from('map-chat-bucket').getPublicUrl(`public/${userId}`);
    if(error) { console.error(error); }

    return publicURL || '';
  }

  uploadAvatarFile(avatarFile: File, userId: string): Promise<{ data: { Key: string; } | null; error: Error | null; }> {
    return this.supabase.storage.from('map-chat-bucket').upload(`public/${userId}`, avatarFile, {
      cacheControl: '3600',
      upsert: true
    });
  }

}
