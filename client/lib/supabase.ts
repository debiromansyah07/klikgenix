import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  plan: "PREMIUM" | "EXCLUSIVE" | "EDUCATION";
  plan_expiry: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  user_id: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  updated_at: string;
}

export interface NotificationSettings {
  user_id: string;
  email_notifications: any;
  push_notifications: any;
  sms_notifications: any;
  preferences: any;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: "PREMIUM" | "EXCLUSIVE" | "EDUCATION";
  status: "active" | "cancelled" | "expired";
  current_period_start: string;
  current_period_end: string;
  auto_renewal: boolean;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  payment_method: "card" | "bank" | "ewallet";
  payment_gateway: string;
  gateway_transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AppUsage {
  id: string;
  user_id: string;
  app_name: string;
  app_category: string;
  access_method: "extension" | "credentials";
  usage_count: number;
  last_accessed: string;
  created_at: string;
}

export const supabaseUtils = {
  // User Profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async updateUserProfile(userId: string, profileData: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    return { data, error };
  },

  // Notification Settings
  async getNotificationSettings(userId: string) {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>) {
    const { data, error } = await supabase
      .from('notification_settings')
      .upsert({
        user_id: userId,
        ...settings,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    return { data, error };
  },

  // Subscription
  async getUserSubscription(userId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    return { data, error };
  },

  // Payments
  async getPaymentHistory(userId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // App Usage
  async trackAppUsage(userId: string, appName: string, appCategory: string) {
    const { data, error } = await supabase
      .from('app_usage')
      .upsert({
        user_id: userId,
        app_name: appName,
        app_category: appCategory,
        access_method: 'extension',
        usage_count: 1,
        last_accessed: new Date().toISOString(),
        created_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,app_name'
      });
    return { data, error };
  },

  // Auth
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  },

  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) return { data: null, error: uploadError };

    // Dapatkan public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { data: urlData.publicUrl, error: null };
  }
};



// Environment variables needed:
// VITE_SUPABASE_URL=your_supabase_project_url
// VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

// Database tables to create in Supabase:
/*
-- Users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification settings
CREATE TABLE notification_settings (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email_notifications JSONB DEFAULT '{}'::jsonb,
  push_notifications JSONB DEFAULT '{}'::jsonb,
  sms_notifications JSONB DEFAULT '{}'::jsonb,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  plan TEXT NOT NULL CHECK (plan IN ('PREMIUM', 'EXCLUSIVE', 'EDUCATION')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  auto_renewal BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'IDR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT CHECK (payment_method IN ('card', 'bank', 'ewallet')),
  payment_gateway TEXT,
  gateway_transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App usage tracking
CREATE TABLE app_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  app_name TEXT NOT NULL,
  app_category TEXT,
  access_method TEXT CHECK (access_method IN ('extension', 'credentials')),
  usage_count INTEGER DEFAULT 1,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, app_name)
);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Similar policies for other tables
CREATE POLICY "Users can view own notifications" ON notification_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notification_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notifications" ON notification_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own app usage" ON app_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own app usage" ON app_usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own app usage" ON app_usage FOR UPDATE USING (auth.uid() = user_id);
*/
